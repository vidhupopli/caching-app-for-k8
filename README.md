# Caching App for K8

Authored by: Vidhu Popli

## Running in kubernetes environment

1. Create all three deployements using: `kubectl create -f filename`
2. Create all three services using: `kubectl create -f filename`
3. Expose fe service through minikube: `minikube service feservicenamehere`

## Running in docker environment

### Docker env for PROD

Command to run: `docker compose -f docker-compose.prod.yml up`
Command to stop: `docker compose -f docker-compose.prod.yml down`

### Docker env for DEV

Command to run: `docker compose -f docker-compose.dev.yml up`
Command to run: `docker compose -f docker-compose.dev.yml down`
