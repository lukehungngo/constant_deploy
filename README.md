
## Install docker on servers

```
ansible-playbook docker/install.yml -i inventories/ --limit deploy-do-servers

ansible-playbook constant/deploy.yml -i inventories/ --limit deploy-do-servers

ansible-playbook server/init.yml -i inventories/ --limit deploy-do-servers

```

