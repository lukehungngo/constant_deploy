
## Install docker on servers

```
ansible-playbook server/init.yml -i inventories/ --limit deploy

ansible-playbook server/docker.yml -i inventories/ --limit deploy

ansible-playbook server/deployBootNode.yml -i inventories/

ansible-playbook server/deployFullNode.yml -i inventories/ --limit deploy

```

