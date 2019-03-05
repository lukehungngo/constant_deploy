var node = module.exports

node.beacon = function(id) {
  return {
    name: `beacon-${id}`,
    tags: ['constant_chain', 'beacon', `beacon-${id}`]
  }
}

node.shard = function(sid, id) {
  return {
    name: `shard-${id}`,
    tags: ['constant_chain', 'shard', `shard-${sid}`, `shard-${sid}-${id}`]
  }
}
