const YAML = require('yamljs')
const backend = require('./backend')
// Load yaml file using YAML.load
var config = YAML.load('../inventories/group_vars/all.yml')

let beacon = config.IP.beacon
let result = { beacon: {}, shard: {} }

for (const [i, v] of Object.entries(beacon)) {
  setInterval(async () => {
    let beacon = await backend.GetBeaconBestState({ host: v, port: 9334 })
    beacon.Endpoint = `${v}:9334`
    result.beacon[i] = filterBeaconData(beacon)
    
  }, 1000)
}

for (let sid in config.IP.shard) {
  for (const [i, v] of Object.entries(config.IP.shard[sid])) {
    setInterval(async () => {   
      
      let shard = await backend.GetShardBestState({ host: v, port: 9334 }, Number(sid))
      if (!result.shard[sid]) {result.shard[sid] = {}; result.shard[sid][i] = {} }
      shard.Endpoint = `${v}:9334`
      result.shard[sid][i] = filterShardData(shard || {})
      
    }, 1000)
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