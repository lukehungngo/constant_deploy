#!/bin/bash
if [ "$1" == "server" ]; then
    echo "Stop Server"
elif [ "$1" == "single" ]; then
    echo "Stop local master"
    ansible-playbook Ansible/stopLocal.yml -i Ansible/inventories/single --limit  single
elif [ "$1" == "local" ]; then
    echo "Stop local"
    ansible-playbook Ansible/stopLocal.yml -i Ansible/inventories/local --limit  local
fi
