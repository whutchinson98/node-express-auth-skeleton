FROM node:current-alpine

# update packages
RUN apk update

# create root application folder
WORKDIR /app

# copy configs to /app folder
COPY package*.json ./
COPY tsconfig.json ./
COPY .eslintrc.json ./
COPY .prettierrc.json ./

# copy files
COPY src /app/src

# Install Dependencies
RUN npm install

# Lint
RUN npm run lint

# Test

# Build
RUN npm run build

EXPOSE 8080

CMD [ "npm", "start" ]
