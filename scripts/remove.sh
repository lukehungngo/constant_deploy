#!/bin/bash
if [ "$1" == "metric" ]; then
    echo "Remove Container Metric Server"
    ansible-playbook Ansible/removeContainer.yml -i Ansible/inventories/metric --limit  metric
fi
