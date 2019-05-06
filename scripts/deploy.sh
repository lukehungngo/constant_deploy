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
    (cd $GOPATH/github.com/constant-money/constant-chain/bin && sh build.sh)
    # ansible-playbook Ansible/init.yml -i Ansible/inventories/metric --limit  metric
    ansible-playbook Ansible/docker.yml -i Ansible/inventories/metric --limit  metric
    ansible-playbook Ansible/deployServer.yml -i Ansible/inventories/metric --limit  metric
elif [ "$1" == "single" ]; then
    echo "Deploy Local Single"
    (cd /usr/local/src/go10/src/github.com/constant-money/constant-chain/bin && sh local.sh)
    ansible-playbook Ansible/deployLocal.yml -i Ansible/inventories/single --limit  single
elif [ "$1" == "local" ]; then
    echo "Deploy Local Multi"
    (cd /usr/local/src/go10/src/github.com/constant-money/constant-chain/bin && sh local.sh)
    ansible-playbook Ansible/deployLocal.yml -i Ansible/inventories/local --limit  local
#     ansible-playbook Ansible/deployLocal.yml -i Ansible/inventories/local --limit local-bootnode
#     ansible-playbook Ansible/deployLocal.yml -i Ansible/inventories/local --limit local-beacon1,local-beacon2,local-beacon0,,local-beacon3
#     ansible-playbook Ansible/deployLocal.yml -i Ansible/inventories/local --limit local-shard0-0,local-shard0-1,local-shard0-2,local-shard0-3
#     ansible-playbook Ansible/deployLocal.yml -i Ansible/inventories/local --limit local-shard1-0,local-shard1-1,local-shard1-2
fi
