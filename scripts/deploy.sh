#!/bin/bash
if [ "$1" == "server" ]; then
    echo "Deploy Server"
elif [ "$1" == "local" ]; then
    echo "Deploy Local"
    (cd /usr/local/src/go10/src/github.com/constant-money/constant-chain/bin && sh local.sh)
    ansible-playbook ../Ansible/deployLocal.yml -i ../Ansible/inventories/local --limit  local-multi
    # ansible-playbook ../../Ansible/deployLocal.yml -i ../../Ansible/inventories/ --limit local-bootnode
    # ansible-playbook ../../Ansible/deployLocal.yml -i ../../Ansible/inventories/ --limit local-bootnode,local-beacon1,local-beacon2,local-beacon0
    # ansible-playbook ../../Ansible/deployLocal.yml -i ../../Ansible/inventories/ --limit local-shard0-0,local-shard0-1,local-shard0-2
    # ansible-playbook ../../Ansible/deployLocal.yml -i ../../Ansible/inventories/ --limit local-shard1-0,local-shard1-1,local-shard1-2
fi
