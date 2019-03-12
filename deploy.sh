ansible-playbook server/docker.yml -i inventories/ --limit all
ansible-playbook server/deployFullNode.yml -i inventories/ --limit all