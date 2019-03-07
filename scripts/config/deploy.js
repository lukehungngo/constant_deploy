const node = require("./node")
var deploy = module.exports

deploy.DO = [
        node.beacon(0,"sgp1"),node.beacon(1,"ams3"),node.beacon(2,"nyc3"), 
        node.shard(0,0,"sfo2"),node.shard(0,1,"lon1"),node.shard(0,2,"blr1"),
        node.shard(1,0,"sfo2"),node.shard(1,1,"lon1"),node.shard(1,2,"blr1")]