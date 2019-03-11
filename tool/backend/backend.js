var jayson = require('jayson')
var backend = exports
const exec = require("child_process").exec

backend.RetrieveLogs = async function (endpoint, name, key) {
  try {
    return new Promise(resolve => {
      // console.log(`ssh -i ${key} root@${endpoint} 'docker  logs --tail 500 ${name}'`)
      exec(`ssh -i ${key} root@${endpoint} 'docker  logs --tail 500 ${name}'`, (err, stdout) => {
        if (err)  {
          console.log(err)
          return resolve(`Cannot connect ${endpoint}`)
        }
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

backend.GetShardToBeaconPoolState = async function (endpoint) {
  try {
    let res = await rpc(endpoint, 'getshardtobeaconpoolstate')
    return res.Result
  } catch (err) {
    return null
  }
}

backend.GetShardPoolState = async function (endpoint, shardID) {
  try {
    let res = await rpc(endpoint, 'getshardpoolstate',shardID )
    return res.Result
  } catch (err) {
    return null
  }
}

backend.GetCrossShardShardPoolState = async function (endpoint, shardID) {
  try {
    let res = await rpc(endpoint, 'getcrossshardpoolstate', shardID)
    return res.Result
  } catch (err) {
    return null
  }
}

backend.GetBeaconPoolState = async function (endpoint) {
  try {
    let res = await rpc(endpoint, 'getbeaconpoolstate')
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
