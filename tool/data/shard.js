let shardData = require("../backend/aggregator").shard

var data = []
setInterval(() => {
    tmp = []
    for (let sid in shardData){
        for (const [k,v] of Object.entries(shardData[sid])){
            if (!v.IP) continue
            let item = Object.entries(v.data)
            item = item.map((x) => {
                if (typeof x[1] == "undefined") {
                    x[1] = "N/A"
                }
                return x[1]
            })
            // console.log(item)
            tmp.push(item)
        }
    }
    
    data = tmp
    // console.log(tmp)
},1000)


module.exports = {
    getData: function(){
        return {
            //Endpoint, ShardID, ShardHeight, ShardProposerIdx, BeaconHeight, Epoch, BestCrossShard
            headers: ['Shard Node', 'Shard ID', 'Height', 'LeaderID', 'BeaconHeight', 'Epoch', 'Crossshard'],
            data: data
          }
    }
}

