FROM node:current-alpine

# update packages
RUN apk update

# create root application folder
WORKDIR /app

# copy configs to /app folder
COPY package*.json ./
COPY tsconfig.json ./
# copy source code to /app/src folder
COPY src /app/src

# Lint
RUN npm run lint

# Test

# Build
RUN npm install
RUN npm run build

EXPOSE 8080

CMD [ "npm", "start" ]
