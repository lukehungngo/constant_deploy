const node = require('./node')
var remove = module.exports

remove.DO = [
  node.beacon(0),
  node.beacon(1),
  node.beacon(2),
  node.shard(0, 0),
  node.shard(0, 1),
  node.shard(0, 2),
  node.shard(1, 0),
  node.shard(1, 1),
  node.shard(1, 2)
]
