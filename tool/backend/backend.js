var jayson = require('jayson')
var backend = exports

backend.GetBeaconBestState = async function (endpoint) {
  try {
    let res = await rpc(endpoint, 'getbeaconbeststate')
    return res.Result
  } catch (err) {
    return null
  }
}

backend.GetShardBestState = async function (endpoint, shardID) {
  try {
    let res = await rpc(endpoint, 'getshardbeststate', shardID)
    // console.log(res)
    return res.Result
  } catch (err) {
    return null
  }
}

backend.GetNetworkInfo = async function (endpoint) {
  try {
    let res = await rpc(endpoint, 'getnetworkinfo')
    // console.log(res)
    return res.Result
  } catch (err) {
    return null
  }
}

function rpc ({ host, port } = ({} = endpoint), method, ...params) {
  return new Promise((resolve, reject) => {
    var client = jayson.client.http({
      host: host,
      port: port
    })
    client.request(method, params, function (err, response) {
      if (err) {
        // console.log(err)
        return reject(err)
      }
      
      resolve(response)
    })
  })
}

// backend.GetShardBestState({ host: '134.209.40.131', port: 9334 }, 0)
