ansible-playbook ../../Ansible/docker.yml -i ../../Ansible/inventories/ --limit deploy
ansible-playbook ../../Ansible/deployFullNode.yml -i ../../Ansible/inventories/ --limit deploy
# ansible-playbook ../../Ansible/deployFullNode.yml -i ../../Ansible/inventories/ --limit shard0

