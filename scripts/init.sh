#!/bin/bash
if [ "$1" == "metric" ]; then
    echo "Init Docker Metric Server"
    ansible-playbook Ansible/init.yml -i Ansible/inventories/metric --limit  metric
fi
