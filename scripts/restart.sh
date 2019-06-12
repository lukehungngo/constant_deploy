#!/bin/bash
if [ "$1" == "metric" ]; then
    echo "Restart Container Metric Server"
    ansible-playbook Ansible/restartContainer.yml -i Ansible/inventories/metric --limit  metric
fi
