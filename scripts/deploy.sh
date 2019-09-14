#!/bin/bash
if [ "$1" == "server" ]; then
    echo "Deploy Server"
    (cd /usr/local/src/go10/src/github.com/constant-money/constant-chain/bin && sh build.sh)
    # ansible-playbook Ansible/init.yml -i Ansible/inventories/server --limit  server
    ansible-playbook Ansible/docker.yml -i Ansible/inventories/server --limit  server
    # ansible-playbook Ansible/deployServer.yml -i Ansible/inventories/server --limit shard0-0
    # ansible-playbook Ansible/deployServer.yml -i Ansible/inventories/server --limit  beacon0,beacon1,beacon2,beacon3
    ansible-playbook Ansible/deployServer.yml -i Ansible/inventories/server --limit  server
    # ansible-playbook Ansible/deployServer.yml -i Ansible/inventories/server --limit  shard1-0,shard1-1,shard1-2,shard1-3
elif [ "$1" == "metric" ]; then
    echo "Deploy Metric Server"
    (cd /Users/hungautonomous/go/src/github.com/incognitochain/incognito-chain/bin && sh build.sh)
    # ansible-playbook Ansible/init.yml -i Ansible/inventories/metric --limit  metric
    ansible-playbook Ansible/docker.yml -i Ansible/inventories/metric --limit  metric
    ansible-playbook Ansible/deployServer.yml -i Ansible/inventories/metric --limit  metric
elif [ "$1" == "metric-2s-b" ]; then
    echo "Deploy Metric Server"
    (cd /Users/hungautonomous/go/src/github.com/incognitochain/incognito-chain/bin && sh build.sh)
    # ansible-playbook Ansible/init.yml -i Ansible/inventories/metric --limit  metric
    ansible-playbook Ansible/docker.yml -i Ansible/inventories/metric-2s-beacon --limit  metric
    ansible-playbook Ansible/deployServer.yml -i Ansible/inventories/metric-2s-beacon --limit  metric
elif [ "$1" == "metric-4s-b" ]; then
    echo "Deploy Metric Server"
    (cd /Users/hungautonomous/go/src/github.com/incognitochain/incognito-chain/bin && sh build.sh)
    # ansible-playbook Ansible/init.yml -i Ansible/inventories/metric --limit  metric
    ansible-playbook Ansible/docker.yml -i Ansible/inventories/metric-4s-beacon --limit  metric
    ansible-playbook Ansible/deployServer.yml -i Ansible/inventories/metric-4s-beacon --limit  metric
elif [ "$1" == "metric-15s-b" ]; then
    echo "Deploy Metric Server"
    (cd /Users/hungautonomous/go/src/github.com/incognitochain/incognito-chain/bin && sh build.sh)
    # ansible-playbook Ansible/init.yml -i Ansible/inventories/metric --limit  metric
    ansible-playbook Ansible/docker.yml -i Ansible/inventories/metric-15s-beacon --limit  metric
    ansible-playbook Ansible/deployServer.yml -i Ansible/inventories/metric-15s-beacon --limit  metric
elif [ "$1" == "metric-32s-b" ]; then
    echo "Deploy Metric Server"
    (cd /Users/hungautonomous/go/src/github.com/incognitochain/incognito-chain/bin && sh build.sh)
    # ansible-playbook Ansible/init.yml -i Ansible/inventories/metric --limit  metric
    ansible-playbook Ansible/docker.yml -i Ansible/inventories/metric-32s-beacon --limit  metric
    ansible-playbook Ansible/deployServerSuperBeacon.yml -i Ansible/inventories/metric-32s-beacon --limit  metric
elif [ "$1" == "metric-2s-100-b" ]; then
    echo "Deploy Metric Server"
    (cd /Users/hungautonomous/go/src/github.com/incognitochain/incognito-chain/bin && sh build.sh)
    # ansible-playbook Ansible/init.yml -i Ansible/inventories/metric --limit  metric
    ansible-playbook Ansible/docker.yml -i Ansible/inventories/metric-2s-100-beacon --limit  metric
    ansible-playbook Ansible/deployServerShared.yml -i Ansible/inventories/metric-2s-100-beacon --limit  metric
elif [ "$1" == "metric-fullnode" ]; then
    echo "Deploy Metric Server FullNode Only"
    (cd /Users/hungautonomous/go/src/github.com/incognitochain/incognito-chain/bin && sh build.sh)
    # ansible-playbook Ansible/init.yml -i Ansible/inventories/metric --limit  metric
    ansible-playbook Ansible/docker.yml -i Ansible/inventories/metric-fullnode --limit  metric
    ansible-playbook Ansible/deployServerFullnode.yml -i Ansible/inventories/metric-fullnode --limit  metric
elif [ "$1" == "single" ]; then
    echo "Deploy Local Single"
    (cd /usr/local/src/go10/src/github.com/constant-money/constant-chain/bin && sh local.sh)
    ansible-playbook Ansible/deployLocal.yml -i Ansible/inventories/single --limit  single
elif [ "$1" == "local" ]; then
    echo "Deploy Local Multi"
    ansible-playbook Ansible/deployLocal.yml -i Ansible/inventories/local --limit  local
#     ansible-playbook Ansible/deployLocal.yml -i Ansible/inventories/local --limit local-bootnode
#     ansible-playbook Ansible/deployLocal.yml -i Ansible/inventories/local --limit local-beacon1,local-beacon2,local-beacon0,,local-beacon3
#     ansible-playbook Ansible/deployLocal.yml -i Ansible/inventories/local --limit local-shard0-0,local-shard0-1,local-shard0-2,local-shard0-3
#     ansible-playbook Ansible/deployLocal.yml -i Ansible/inventories/local --limit local-shard1-0,local-shard1-1,local-shard1-2
fi
