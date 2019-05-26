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
    let res = await rpc(endpoint, 'getshardpoolstatev2',shardID )
    return {V: res.Result.Valid.length, P: res.Result.Pending.length}
  } catch (err) {
    return null
  }
}

backend.GetCrossShardShardPoolState = async function (endpoint, shardID) {
  try {
    let res = await rpc(endpoint, 'getcrossshardpoolstatev2', shardID)
    return res.Result
  } catch (err) {
    return null
  }
}

backend.GetTxPoolState = async function (endpoint) {
  try {
    let res = await rpc(endpoint, 'getnumberoftxsinmempool')
    return res.Result
  } catch (err) {
    return null
  }
}

backend.RetrieveBlock = async function (endpoint, hash, versobse) {
  try {
    let res = await rpc(endpoint, 'retrieveblock', hash,versobse)
    return res.Result
  } catch (err) {
    return null
  }
}

backend.GetBeaconPoolState = async function (endpoint) {
  try {
    let res = await rpc(endpoint, 'getbeaconpoolstatev2')
    // console.log(res.Result)
    return {V: res.Result.Valid.length, P: res.Result.Pending.length}
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

backend.GetBlocks = async function (endpoint, numblock, shardID) {
  try {
    let res = await rpc(endpoint, 'getblocks', numblock, shardID)
    return res.Result
  } catch (err) {
    return null
  }
}

backend.StartProfiling = async function (endpoint) {
  try {
    let res = await rpc(endpoint, 'startprofiling')
    // console.log(res)
    return res.Result
  } catch (err) {
    return null
  }
}

backend.StopProfiling = async function (endpoint) {
  try {
    let res = await rpc(endpoint, 'stopprofiling')
    // console.log(res)
    return res.Result
  } catch (err) {
    return null
  }
}

backend.GetNextCrossShard = async function (endpoint, from,to, start) {
  try {
    let res = await rpc(endpoint, 'getnextcrossshard',from,to, start)
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


!async function(){
  // var fs = require("fs")
  let res = await backend.StopProfiling({ host: '45.33.36.89', port: 9334 })
  // let res = await backend.GetNextCrossShard({ host: '172.104.39.6', port: 19334 },1,0,27993)
  console.log(res)
}()

