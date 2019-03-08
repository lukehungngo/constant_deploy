let beaconData = require('../backend/aggregator').beacon

var data = []
setInterval(() => {
  // console.log(beaconData)
  tmp = []
  for (const [k, v] of Object.entries(beaconData)) {
    let item = Object.entries(v)
    item = item.map((x) => {
        if (typeof x[1] == "undefined") {
            x[1] = "N/A"
        }
        return x[1]
    })
    tmp.push(item)
  }
  data = tmp
  // console.log(tmp)
}, 1000)

module.exports = {
  getData: function () {
    return {
        //Endpoint, BeaconHeight, Epoch, BeaconProposerIdx , BestShardHeight
      headers: ['Beacon Node', 'Height', 'Epoch', 'LeaderID', 'ShardHeight'],
      data: data
    }
  }
}
