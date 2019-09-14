#!/bin/bash
if [ "$1" == "metric" ]; then
    echo "Remove Container Metric Server"
    ansible-playbook Ansible/removeContainer.yml -i Ansible/inventories/metric --limit  metric
fi
if [ "$1" == "metric-2s-b" ]; then
    echo "Remove Container Metric Server"
    ansible-playbook Ansible/removeContainer.yml -i Ansible/inventories/metric-2s-beacon --limit  metric
fi
if [ "$1" == "metric-4s-b" ]; then
    echo "Remove Container Metric Server"
    ansible-playbook Ansible/removeContainer.yml -i Ansible/inventories/metric-4s-beacon --limit  metric
fi
if [ "$1" == "metric-15s-b" ]; then
    echo "Remove Container Metric Server"
    ansible-playbook Ansible/removeContainer.yml -i Ansible/inventories/metric-15s-beacon --limit  metric
fi
if [ "$1" == "metric-32s-b" ]; then
    echo "Remove Container Metric Server"
    ansible-playbook Ansible/removeContainer.yml -i Ansible/inventories/metric-32s-beacon --limit  metric
fi
if [ "$1" == "metric-2s-100-b" ]; then
    echo "Remove Container Metric Server"
    ansible-playbook Ansible/removeContainer.yml -i Ansible/inventories/metric-2s-100-beacon --limit  metric
fi
