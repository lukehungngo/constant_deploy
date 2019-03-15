#!/usr/bin/env bash
if [ -f ./constant ]; then
    rm -rf ./constant
fi
if [ -f ./bootnode ]; then
    rm -rf ./bootnode
fi
env CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags '-w' -o constant github.com/constant-money/constant-chain
env CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags '-w' -o bootnode github.com/constant-money/constant-chain/bootnode
docker build -t constant .
docker rmi -f $(docker images --filter "dangling=true" -q)

ansible-playbook ../Ansible/deployLocal.yml -i ../Ansible/inventories/ --limit local-simple

