# ANSIBLE_HOST_KEY_CHECKING=false ansible-playbook ../../Ansible/init.yml -i ../../Ansible/inventories/master --limit  master
ansible-playbook ../../Ansible/docker.yml -i ../../Ansible/inventories/master --limit  master
ansible-playbook ../../Ansible/deployFullNode.yml -i ../../Ansible/inventories/master --limit master
# ansible-playbook ../../Ansible/deployFullNode.yml -i ../../Ansible/inventories/ --limit shard0

