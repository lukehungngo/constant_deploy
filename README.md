
## Install docker on servers

```
ansible-playbook server/init.yml -i inventories/ --limit deploy

ansible-playbook server/docker.yml -i inventories/ --limit deploy

ansible-playbook constant/deployBootNode.yml -i inventories/

ansible-playbook constant/deployFullNode.yml -i inventories/ --limit beacon

```

