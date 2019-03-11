ansible-playbook server/docker.yml -i inventories/ --limit shard1-2
ansible-playbook server/deployFullNode.yml -i inventories/ --limit shard1-2