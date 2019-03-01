
## Install docker on servers

```
ansible-playbook docker/install.yml -i inventories/ --limit deploy-gc-servers

ansible-playbook constant/deploy.yml -i inventories/ --limit deploy-gc-servers

```

