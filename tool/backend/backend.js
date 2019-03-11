var jayson = require('jayson')
var backend = exports
const exec = require("child_process").exec

backend.RetrieveLogs = async function (endpoint, name) {
  try {
    return new Promise(resolve => {
      exec(`ssh -i ~/constant_key root@${endpoint} 'docker  logs --tail 20 ${name}'`, (err, stdout) => {
        if (err)  return resolve("Cannot connect ${endpoint}")
        resolve(stdout)
      })
    })
  } catch (err) {
    return null
  }
}

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

function rpc({ host, port } = ({} = endpoint), method, ...params) {
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
