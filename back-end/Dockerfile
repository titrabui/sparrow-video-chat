# It is example, may be used for next time if needed
FROM node:lts-alpine3.13

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY ["package.json", "yarn.lock", "./"]

USER node

RUN yarn install

COPY --chown=node:node . .

EXPOSE 3000

# Development
CMD ["npm", "run", "dev"]

# Production
# RUN npm install -g pm2
# CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"]
