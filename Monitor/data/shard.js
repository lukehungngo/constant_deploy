var shardData = require('../backend/aggregator').shard

/*  Shard table data */
function getShardTableData(){
  function filterShardTableData( { Endpoint, ShardHeight, Epoch, name, BeaconHeight, ShardProposerIdx, BestCrossShard ,TxPool ,Pool,BeaconBest}= {}){
    return { Endpoint, Name: name, ShardHeight, ShardProposerIdx, BeaconHeight, Epoch, TxPool, Pool, BeaconBest, BestCrossShard: JSON.stringify(BestCrossShard)}
  }
  tmp = []
  for (let data of shardData) {
    let v = filterShardTableData(data)
    if (!v || !v.Endpoint) continue
    
    let item = Object.entries(v)
    item = item.map(x => {
      if (typeof x[1] === 'undefined') {
        x[1] = 'N/A'
      }
      return x[1]
    })
    tmp.push(item)
  }
  return tmp
}

/*  Shard block data */
let blockData = []
setInterval(()=>{
  getBlockData()
},1000)
function getBlockData(){
  function formatBytes(bytes,decimals) {
    if(bytes == 0) return '0 Bytes';
    var k = 1024,
        dm = decimals <= 0 ? 0 : decimals || 2,
        sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
 }
  function filterShardBlockData( { Height, Time, TxHashes, Size, Round}= {}){
    return { Time, Height, Size : formatBytes(Size), Latency: 0, NumTx: (TxHashes || []).length, Round}
  }
  for (let i in shardData) {
    let data = shardData[i]
    if (!data || !data.blocks) continue
    let revertBlocks = JSON.parse(JSON.stringify(data.blocks)).reverse()

    for (let block of revertBlocks) {
      let v = filterShardBlockData(block)
      if (!v || !v.Height) continue
      let item = Object.entries(v)
      item = item.map(x => {
        if (typeof x[1] === 'undefined') {
          x[1] = 'N/A'
        }
        return x[1]
      })
      if (!blockData[i]) blockData[i] = []
      if (blockData[i][0] && item[1] <= (blockData[i][0][1] || 0)) continue
      try {
        item[0] = new Date(Number(item[0])*1000).toLocaleString()
        item[3] = (blockData[i][0] ? (new Date(item[0]) - new Date(blockData[i][0][0]))/1000 : 0) + "s"
        blockData[i].unshift(item)
        require("fs").appendFileSync("logs/blocks/" + data.name,item.join(",")+"\n")
      } catch(err){
        console.log(err)
      }
      
    }
  }
}

module.exports = {
  getAllData: ()=> shardData,
  getShardTableData: function () {
    return {
      // Endpoint, ShardID, ShardHeight, ShardProposerIdx, BeaconHeight, Epoch, BestCrossShard
      headers: [
        'Shard Node',
        'Name',
        'Height',
        'LeaderID',
        'BeaconHeight',
        'Epoch',
        'Tx Pool',
        'B/S/CS Pool',
        'BeaconBest',
        'Crossshard'
      ],
      data: getShardTableData()
    }
  },
  getBlockData: function(nid){
    return {
      // Endpoint, ShardID, ShardHeight, ShardProposerIdx, BeaconHeight, Epoch, BestCrossShard
      headers: [
        "Time",
        "Height",
        "Size",
        "Latency",
        "NumTx",
        "Round"
      ],
      data: blockData[nid] || []
    }
  }
}