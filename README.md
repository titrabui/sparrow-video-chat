# sparrow-video-chat

### Pull docker images
```
docker pull node:lts-alpine3.13
docker pull mongo:latest
```

### Run yarn install
```
docker run --rm -v $(pwd):/home/node/app -w /home/node/app node:lts-alpine3.13 yarn install
```

### Start server
```
NODE_ENV=development PROCESS_TYPE=web docker-compose up -d
```

### Stop server
```
NODE_ENV=development PROCESS_TYPE=web docker-compose down
```
