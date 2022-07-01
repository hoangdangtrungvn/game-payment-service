#!/usr/bin/env bash

echo "Deploy Payment Service..."

if [[ -d "/workspace/game/payment-service" ]]; then
  cd /workspace/game/payment-service
  git fetch
  git pull --ff-only
else
  git clone git@git.kralus.studio:kralus-game/payment-service.git /workspace/game/payment-service
  cd /workspace/game/payment-service
fi

cp -R /docker/game/payment-service/.env /workspace/game/payment-service/.env

timestamp=$(date +%s)

sudo docker image tag game/payment-service:latest game/payment-service:$timestamp
sudo docker build -t game/payment-service:latest --file /docker/game/payment-service/Dockerfile .
sudo docker-compose -f /docker/game/payment-service/docker-compose.yml up -d
sudo docker rmi game/payment-service:$timestamp