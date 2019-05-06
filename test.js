const exec = require("child_process").exec
setInterval(() =>{
   var inbound = Math.random()*100 +300
   var cmd = `curl -s 'http://128.199.96.206:8086/write?db=mydb' --data-binary "metric1,node=beacon0 value=${inbound} \`date +%s\`000000000"`
   console.log(cmd)
   exec(cmd, function(){})

   var inbound = Math.random()*100 +300
   var cmd = `curl -s 'http://128.199.96.206:8086/write?db=mydb' --data-binary "metric1,node=beacon1 value=${inbound} \`date +%s\`000000000"`
   exec(cmd, function(){})

   var inbound = Math.random()*100 +300
   var cmd = `curl -s 'http://128.199.96.206:8086/write?db=mydb' --data-binary "metric1,node=beacon2 value=${inbound} \`date +%s\`000000000"`
   exec(cmd, function(){})

   var inbound = Math.random()*100 +300
   var cmd = `curl -s 'http://128.199.96.206:8086/write?db=mydb' --data-binary "metric1,node=beacon3 value=${inbound} \`date +%s\`000000000"`
   exec(cmd, function(x,err){console.log(err)})


},1000)