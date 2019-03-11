const YAML = require('yamljs')
const backend = require('./backend')
// Load yaml file using YAML.load
var config = YAML.load(__dirname + '/../../inventories/group_vars/all.yml')
// console.log(JSON.stringify(config, null, 2))
let result = { beacon: [], shard: [] }
result.key = config.ansible_ssh_private_key_file

for (const [i, v] of Object.entries(config.beacon)) {
  setInterval(async () => {
    let beacon = await backend.GetBeaconBestState({ host: v.IP, port: 9334 }) || {}
    let info = await backend.GetNetworkInfo({ host: v.IP, port: 9334 }) || {commit: ""}
    beacon.Endpoint = `${v.IP}:9334(${info.commit.substr(5,3)})`
    if (!result.beacon[i]) result.beacon[i] = {}

    result.beacon[i].data = filterBeaconData(beacon)
    result.beacon[i].IP = v.IP
  }, 500)
}

for (let sid in config.shard) {
  for (const [i, v] of Object.entries(config.shard[sid])) {
    setInterval(async () => {   
      
      let shard = await backend.GetShardBestState({ host: v.IP, port: 9334 }, Number(sid)) || {}
      if (!result.shard[sid]) {result.shard[sid] = {}; result.shard[sid][i] = {} }
      let info = await backend.GetNetworkInfo({ host: v.IP, port: 9334 }) || {commit: ""}
      shard.Endpoint = `${v.IP}:9334(${info.commit.substr(5,3)})`

      if (!result.shard[sid][i]) result.shard[sid][i] = {}
      result.shard[sid][i].data = filterShardData(shard)
      result.shard[sid][i].IP = v.IP

    }, 500)
  }
}

//best shard height, proposer id, epoch
function filterBeaconData ({ Endpoint, BeaconHeight, BestShardHeight, BeaconProposerIdx, Epoch } = {}) {
  return { Endpoint, BeaconHeight, Epoch, BeaconProposerIdx , BestShardHeight: JSON.stringify(BestShardHeight)}
}

//beacon, proposerif, bestcrossshard
function filterShardData( { Endpoint, ShardHeight, Epoch, ShardID, BeaconHeight, ShardProposerIdx, BestCrossShard }= {}){
    return { Endpoint, ShardID, ShardHeight, ShardProposerIdx, BeaconHeight, Epoch, BestCrossShard: JSON.stringify(BestCrossShard)}
}

exports = module.exports = result