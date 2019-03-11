const YAML = require('yamljs')
const backend = require('./backend')
// Load yaml file using YAML.load
var config = YAML.load(__dirname + '/../../inventories/group_vars/all.yml')
// console.log(JSON.stringify(config, null, 2))
let result = { key: "", beacon: [], shard: [] }
result.key = config.ansible_ssh_private_key_file

for (const [i, v] of Object.entries(config.beacon)) {
  setInterval(async () => {
    let beacon = await backend.GetBeaconBestState({ host: v.IP, port: 9334 }) || {}
    let s2bpool = await backend.GetShardToBeaconPoolState({ host: v.IP, port: 9334 }) || []
    let bpool = await backend.GetBeaconPoolState({ host: v.IP, port: 9334 }) || []
    // console.log(s2bpool)
    let bblkCnt = bpool.length
    let s2bblkCnt = 0
    
    for (let s in s2bpool) {
      s2bblkCnt += s2bpool[s].length
    }

    let info = await backend.GetNetworkInfo({ host: v.IP, port: 9334 }) || {commit: ""}
    beacon.Endpoint = `${v.IP}:9334(${info.commit.substr(5,3)})`
    beacon.Pool = bblkCnt +  "-" + s2bblkCnt 

    if (!result.beacon[i]) result.beacon[i] = {}
    result.beacon[i].data = filterBeaconData(beacon)
    result.beacon[i].IP = v.IP
    result.beacon[i].name = "beacon" + i
    result.beacon[i].cspool = {}
  }, 500)
}

let shardNodeCnt = 0
for (let sid in config.shard) {
  for (const [i, v] of Object.entries(config.shard[sid])) {
    setInterval(async (shardNodeID) => {   
      let shard = await backend.GetShardBestState({ host: v.IP, port: 9334 }, Number(sid)) || {}
      let beacon = await backend.GetBeaconBestState({ host: v.IP, port: 9334 }) || {}
      let info = await backend.GetNetworkInfo({ host: v.IP, port: 9334 }) || {commit: ""}
      shard.Endpoint = `${v.IP}:9334(${info.commit.substr(5,3)})`

      let bpool = await backend.GetBeaconPoolState({ host: v.IP, port: 9334 }) || []
      // console.log(bpool[0])
      let spool = await backend.GetShardPoolState({ host: v.IP, port: 9334 }, Number(shard.ShardID || 0)) || []
      let cspool = await backend.GetCrossShardShardPoolState({ host: v.IP, port: 9334 }, Number(shard.ShardID || 0)) || []
      sBlkCnt = spool.length
      let csblkCnt = 0

      let cspoolStr = ""
      for (let s in cspool) {
        csblkCnt += cspool[s].length
        cspoolStr += s + ": " + JSON.stringify(cspool[s]) + "\n"
      }
      shard.BeaconBest = beacon.BeaconHeight
      shard.Pool = bpool.length + "-" + sBlkCnt +  "-" + csblkCnt

      if (!result.shard[shardNodeID]) {result.shard[shardNodeID] = {}}
      result.shard[shardNodeID].data = filterShardData(shard)
      result.shard[shardNodeID].IP = v.IP
      result.shard[shardNodeID].name = "shard" + sid + "-" + i
      
      result.shard[shardNodeID].cspool = cspoolStr
      
    }, 500, shardNodeCnt)
    shardNodeCnt++
  }
}

//best shard height, proposer id, epoch
function filterBeaconData ({ Endpoint, BeaconHeight, BestShardHeight, BeaconProposerIdx, Epoch,Pool  } = {}) {
  return { Endpoint, BeaconHeight, Epoch, BeaconProposerIdx , Pool, BestShardHeight: JSON.stringify(BestShardHeight) }
}

//beacon, proposerif, bestcrossshard
function filterShardData( { Endpoint, ShardHeight, Epoch, ShardID, BeaconHeight, ShardProposerIdx, BestCrossShard ,Pool,BeaconBest}= {}){
    return { Endpoint, ShardID, ShardHeight, ShardProposerIdx, BeaconHeight, Epoch, Pool, BeaconBest, BestCrossShard: JSON.stringify(BestCrossShard)}
}

exports = module.exports = result