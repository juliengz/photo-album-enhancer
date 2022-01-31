# Photo album enhancer

This readme is a WIP !!!!

## Infrasture installation

CGP to create bucket and app runner

### Authenticate to Google Cloud
```
gcloud auth application-default login
gcloud projects create "PROJECT_ID" --name="PROJECT_NAME"
```

### Provide infrastucture with terraform
```
cd terraform
terraform init
terraform plan
terraform apply
terrafor destroy
```

## Poject Installation
```
docker-compose build
docker-compose up
docker-compose run --rm --no-deps backend npm install
```

## Test
```
# Launch unit tests
docker-compose run --rm --no-deps backend npm test

# Lauch integration tests
docker-compose run --rm --no-deps backend npm db:test:create
docker-compose run --rm --no-deps backend npm test:integration
```