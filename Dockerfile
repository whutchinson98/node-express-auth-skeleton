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


# Environment Variables
ENV ACCESS_TOKEN_SECRET=${ACCESS_TOKEN_SECRET}
ENV ACCESS_TOKEN_TIME=${ACCESS_TOKEN_TIME}

ENV REFRESH_TOKEN_SECRET=${REFRESH_TOKEN_SECRET}
ENV REFRESH_TOKEN_TIME=${REFRESH_TOKEN_TIME}

ENV ADMIN_PRIVATE_KEY=${ADMIN_PRIVATE_KEY}

ENV DB_URL=${DB_URL}

# Build
RUN npm run build

EXPOSE 8080

CMD [ "npm", "start" ]
