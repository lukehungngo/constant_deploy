const YAML = require('yamljs')
const backend = require('./backend')
// Load yaml file using YAML.load
if (process.argv[2]=="server")
  var config = YAML.load(__dirname + '/../../Ansible/inventories/group_vars/deploy.yml')
else
  var config = YAML.load(__dirname + '/../../Ansible/inventories/group_vars/local.yml')

// console.log(JSON.stringify(config, null, 2))
let result = { key: "", beacon: [], shard: [] }
result.key = config.ansible_ssh_private_key_file

for (const [i, v] of Object.entries(config.beacon)) {
  setInterval(async () => {
    let rpcEndpoint = { host: v.IP, port: v.RPC_PORT }
    let beacon = await backend.GetBeaconBestState(rpcEndpoint) || {}
    let s2bpool = await backend.GetShardToBeaconPoolState(rpcEndpoint) || []
    let bpool = await backend.GetBeaconPoolState(rpcEndpoint) || []
    let blocks = await backend.GetBlocks(rpcEndpoint, 20, -1)

    let bblkCnt = bpool.length
    let s2bblkCnt = 0
    
    for (let s in s2bpool) {
      s2bblkCnt += s2bpool[s].length
    }

    let info = await backend.GetNetworkInfo(rpcEndpoint) || {commit: ""}
    beacon.Endpoint = `${v.IP}:${v.RPC_PORT}(${info.commit.substr(5,3)})`
    beacon.Pool = bblkCnt +  "-" + s2bblkCnt 

    if (!result.beacon[i]) result.beacon[i] = {}
    result.beacon[i] = beacon
    result.beacon[i].IP = v.IP
    result.beacon[i].name = "beacon" + i
    result.beacon[i].cspool = {}
    result.beacon[i].blocks = blocks
  }, 1000)
}

let shardNodeCnt = 0
for (let sid in config.shard) {
  for (const [i, v] of Object.entries(config.shard[sid])) {
    setInterval(async (shardNodeID) => {   
      let rpcEndpoint = { host: v.IP, port: v.RPC_PORT }
      if (!result.shard[shardNodeID]) {result.shard[shardNodeID] = {}}
      result.shard[shardNodeID].IP = v.IP
      result.shard[shardNodeID].name = "shard" + sid + "-" + i
      let info = await backend.GetNetworkInfo(rpcEndpoint) || {commit: ""}
      result.shard[shardNodeID].Endpoint = `${v.IP}:${v.RPC_PORT}(${info.commit.substr(5,3)})`
      
      let shard = await backend.GetShardBestState(rpcEndpoint, Number(sid)) || {}
      let beacon = await backend.GetBeaconBestState(rpcEndpoint) || {}
      
      let blocks = await backend.GetBlocks(rpcEndpoint, 20, shard.ShardID)
      let bpool = await backend.GetBeaconPoolState(rpcEndpoint) || []
      let spool = await backend.GetShardPoolState(rpcEndpoint, Number(shard.ShardID || 0)) || []
      let cspool = await backend.GetCrossShardShardPoolState(rpcEndpoint, Number(shard.ShardID || 0)) || []

      sBlkCnt = spool.length
      let csblkCnt = 0
      let cspoolStr = ""
      for (let s in cspool) {
        csblkCnt += cspool[s].length
        cspoolStr += s + ": " + JSON.stringify(cspool[s]) + "\n"
      }
      shard.BeaconBest = beacon.BeaconHeight
      shard.Pool = bpool.length + "-" + sBlkCnt +  "-" + csblkCnt

      Object.assign(result.shard[shardNodeID],shard)
      result.shard[shardNodeID].blocks = blocks
      result.shard[shardNodeID].cspool = cspoolStr
      
    }, 1000, shardNodeCnt)
    shardNodeCnt++
  }
}



exports = module.exports = result