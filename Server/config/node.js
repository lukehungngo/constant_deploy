var node = module.exports

node.beacon = function(id, region) {
  return {
    name: `beacon-${id}`,
    tags: ['constant_chain', 'beacon', `beacon-${id}`],
    region: region
  }
}

node.shard = function(sid, id, region) {
  return {
    name: `shard-${sid}-${id}`,
    tags: ['constant_chain', 'shard', `shard-${sid}`, `shard-${sid}-${id}`],
    region: region
  }
}
