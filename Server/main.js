const DOClient = require('./digitalocean')
const deploy_config = require('./config/deploy')


var DOTemplate = {
  name: 'test',
  region: 'nyc1',
  size: 's-2vcpu-4gb',
  image: 'ubuntu-18-04-x64',
  tags: ['constant_chain']
}

var listDeployServer = []
var activity = {
  DO: { success: [], not_exist: [], duplicate: [], error: [] }
}

async function list () {
  console.log('============ List DO servers ============')
  let doServer = (await DOClient.listAllDroplet()).droplets
  doServer.sort((a,b)=>{
    return a.name > b.name ? 1 : -1
  })
  doServer = doServer.map(x => {console.log(x.name, "\t", x.region.slug, "\t",x.networks.v4[0].ip_address, "\t", x.id)})
}

async function deploy () {
  let doServer = (await DOClient.listAllDroplet()).droplets
  listDeployServer = listDeployServer.concat(doServer.map(x => x.name))
  console.log('current server: ', listDeployServer)

  await Promise.all(
    deploy_config.DO.map(async function (c) {
      console.log('Deploy server ', c.name)
      if (listDeployServer.indexOf(c.name) == -1) {
        let deployData = Object.assign(Object.assign({}, DOTemplate), c)
        let res = await DOClient.createDroplet(deployData)

        if (!res.droplet || !res.droplet.id) {
          console.log('Cannot create server ', c.name)
          activity.DO.error = activity.DO.error.concat(c.name)
        } else {
          activity.DO.success = activity.DO.success.concat(c.name)
        }
      } else {
        activity.DO.duplicate = activity.DO.duplicate.concat(c.name)
      }
    })
  )

  // Report result
  console.log('============ Digital Ocean Deploy ============')
  console.log('success', activity.DO.success)
  console.log('duplicate', activity.DO.duplicate)
  console.log('error', activity.DO.error)
}

async function remove () {
  let doServer = (await DOClient.listAllDroplet()).droplets
  listDeployServer = listDeployServer.concat(doServer.map(x => x.name))
  console.log('current server: ', listDeployServer)
  
  await Promise.all(
    deploy_config.DO.map(async function (c) {
      console.log('Remove server ', c.name)
      if (!c.name) {
        console.log('Error: name empty!!!', process.exit())
      }
      if (listDeployServer.indexOf(c.name) != -1) {
        await DOClient.deleteDropletByTag(c.name)
        activity.DO.success = activity.DO.success.concat(c.name)
      } else {
        activity.DO.not_exist = activity.DO.not_exist.concat(c.name)
      }
    })
  )

  // Report result
  console.log('============ Digital Ocean Delete ============')
  console.log('success', activity.DO.success)
  console.log('not_exist', activity.DO.not_exist)
}

switch (process.argv[2]) {
  case 'deploy':
    deploy()
    break
  case 'remove':
    remove()
    break
  default:
    list()
}
