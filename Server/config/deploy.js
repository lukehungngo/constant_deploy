const node = require('./node')
var deploy = module.exports

var region = function () {
  var regions = [
    'nyc1',
    'nyc3',
    'sfo2',
    'tor1',
    'tor1',
    'ams3',
    'ams3',
    'sgp1',
    'sgp1',
    'lon1',
    'fra1',
    'lon1',
    'fra1',
    'blr1',
    'blr1'
  ]
  var random = Math.floor(Math.random() * regions.length)
  return regions[random]
}

deploy.DO = [
  node.beacon(0, region()),
  node.beacon(1, region()),
  node.beacon(2, region()),
  node.shard(0, 0, region()),
  node.shard(0, 1, region()),
  node.shard(0, 2, region()),
  node.shard(1, 0, region()),
  node.shard(1, 1, region()),
  node.shard(1, 2, region())
]
