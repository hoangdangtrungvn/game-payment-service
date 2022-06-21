#!/usr/bin/env bash

echo "Deploy MU Online - Owner API..."

if [[ -d "/workspace/mu-owner-api" ]]; then
  cd /workspace/mu-owner-api
  git fetch
  git pull --ff-only
else
  git clone git@github.com:hoangdangtrungvn/mu-owner-api.git mu-owner-api
  cd /workspace/mu-owner-api
fi

cp -R /docker/mu-owner-api/.env /workspace/mu-owner-api/.env

timestamp=$(date +%s)

sudo docker image tag mu/owner-api:latest mu/owner-api:$timestamp
sudo docker build -t mu/owner-api:latest --file /docker/mu-owner-api/Dockerfile .
sudo docker-compose -f /docker/mu-owner-api/docker-compose.yml up -d
sudo docker rmi mu/owner-api:$timestamp
