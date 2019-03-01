const axios = require('axios')
class DO {
  constructor (apikey) {
    this.apikey = apikey
    this.ssh_keys = 24121016
    this.tag = 'constant_chain'
    console.log('set apikey', this.apikey)
  }

  async request (method = 'get', url = '', data) {
    let config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apikey}`
      }
    }
    // Object.assign(config.headers, custom_header)
    var response = {}
    switch (method) {
      case 'get':
        response = await axios.get(url, config)
        break
      case 'post':
        response = await axios.post(url, data, config)
        break
      case 'delete':
        response = await axios.delete(url, config)
        break
    }

    return response.data ? response.data : null
  }

  listDropletByTag () {
    var result = this.request(
      'get',
      `https://api.digitalocean.com/v2/droplets?tag_name=${this.tag}`
    )
    return result
  }

  createDroplet ({name, region, size, image, tags} = {}) {
    var data = {
      name: name,
      region: region,
      size: size,
      image: image,
      ssh_keys: [this.ssh_keys],
      backups: false,
      ipv6: false,
      user_data: null,
      private_networking: null,
      volumes: null,
      tags: tags
    }

    return this.request(
      'post',
      'https://api.digitalocean.com/v2/droplets',
      data
    )
  }

  getSSHKeys () {
    return this.request('get', 'https://api.digitalocean.com/v2/account/keys')
  }

  deleteDroplet (id) {
    return this.request(
      'delete',
      `https://api.digitalocean.com/v2/droplets/${id}`
    )
  }
}
exports = module.exports = DO



var DOClient = new DO(process.env['DO_KEY'])

async function createDroplets(servers){
  for (let serverConfig of servers) {
      console.log(await DOClient.createDroplet(serverConfig))
  }
}

async function deleteDroplets(tag) {
  var allDroplet = await DOClient.listDropletByTag(tag)
  ids = allDroplet.droplets.map(x => x.id)
  for (let i = 0; i < ids.length; i++) {
    console.log('delete ', ids[i])
    console.log(await DOClient.deleteDroplet(ids[i]))  
  }
  console.log("delete finish")
}


const serverTemplate =  {
    "name": "",
    "region": "nyc1",
    "size": "s-1vcpu-1gb",
    "image": "ubuntu-18-04-x64",
    "tags": [
        "constant_chain"
    ]
}

const beacon1 = {name:"beacon-1", tags: ["constant_chain", "beacon"]}
const beacon2 = {name:"beacon-2", tags: ["constant_chain", "beacon"]}
const beacon3 = {name:"beacon-3", tags: ["constant_chain", "beacon"]}
const beacon4 = {name:"beacon-4", tags: ["constant_chain", "beacon"]}

const beacon_1_config = Object.assign(Object.create(serverTemplate), beacon1)
const beacon_2_config = Object.assign(Object.create(serverTemplate), beacon2)
const beacon_3_config = Object.assign(Object.create(serverTemplate), beacon3)
const beacon_4_config = Object.assign(Object.create(serverTemplate), beacon4)

