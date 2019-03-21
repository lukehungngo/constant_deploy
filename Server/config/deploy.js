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
  node.beacon(3, region()),

  node.beacon(4, region()),
  node.beacon(5, region()),
  node.beacon(6, region()),
  node.beacon(7, region()),
  node.beacon(8, region()),
  node.beacon(9, region()),
  node.beacon(10, region()),
  node.beacon(11, region()),
  node.beacon(12, region()),


  node.shard(0, 0, region()),
  node.shard(0, 1, region()),
  node.shard(0, 2, region()),
  node.shard(0, 3, region()),
  node.shard(1, 0, region()),
  node.shard(1, 1, region()),
  node.shard(1, 2, region()),
  node.shard(1, 3, region())
]
