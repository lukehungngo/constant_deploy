let beaconData = require('../backend/aggregator').beacon

var beaconTableData = []
function filterBeaconTableData ({ Endpoint, BeaconHeight, BestShardHeight, BeaconProposerIdx, Epoch,Pool  } = {}) {
  return { Endpoint, BeaconHeight, Epoch, BeaconProposerIdx , Pool, BestShardHeight: JSON.stringify(BestShardHeight) }
}
setInterval(() => {
  tmp = []
  for (let data of beaconData) {
    let v = filterBeaconTableData(data)
    let item = Object.entries(v)
    item = item.map((x) => {
        if (typeof x[1] == "undefined") {
            x[1] = "N/A"
        }
        return x[1]
    })
    tmp.push(item)
  }
  beaconTableData = tmp
  // console.log(tmp)
}, 1000)

module.exports = {
  getBeaconTableData: function () {
    return {
        //Endpoint, BeaconHeight, Epoch, BeaconProposerIdx , BestShardHeight
      headers: ['Beacon Node', 'Height', 'Epoch', 'LeaderID', 'B/S2B Pool', 'ShardHeight'],
      data: beaconTableData
    }
  }
}
