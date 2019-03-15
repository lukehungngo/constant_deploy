const axios = require('axios')

var DO = module.exports 
DO.APIKEY = process.env['DO_KEY']
DO.SSH_KEYS = 24121016

DO.request = async function(method = 'get', url = '', data){
  let config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${DO.APIKEY}`
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

DO.listDropletByTag = function (tag) {
  var result = DO.request(
    'get',
    `https://api.digitalocean.com/v2/droplets?tag_name=${tag}`
  )
  return result
}

DO.listAllDroplet = function (tag) {
  var result = DO.request(
    'get',
    `https://api.digitalocean.com/v2/droplets`
  )
  return result
}

DO.createDroplet = function({name, region, size, image, tags} = {}) {
  var data = {
    name: name,
    region: region,
    size: size,
    image: image,
    ssh_keys: [DO.SSH_KEYS],
    backups: false,
    ipv6: false,
    user_data: null,
    private_networking: null,
    volumes: null,
    tags: tags
  }

  return DO.request(
    'post',
    'https://api.digitalocean.com/v2/droplets',
    data
  )
}

DO.getSSHKeys = function() {
  return DO.request('get', 'https://api.digitalocean.com/v2/account/keys')
}

DO.deleteDroplet = function(id) {
  return DO.request(
    'delete',
    `https://api.digitalocean.com/v2/droplets/${id}`
  )
}

DO.deleteDropletByTag = function(tag) {
  return DO.request(
    'delete',
    `https://api.digitalocean.com/v2/droplets?tag_name=${tag}`
  )
}

