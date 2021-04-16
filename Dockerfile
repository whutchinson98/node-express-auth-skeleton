FROM node:current-alpine

# Update packages
RUN apk update

# Create root application folder
WORKDIR /app

# Copy configs to /app folder
COPY package*.json ./
COPY tsconfig.json ./
COPY .eslintrc.json ./
COPY .prettierrc.json ./

# Copy Source
COPY src /app/src

# Install Dependencies
RUN npm install

# Environment Variables
ENV ACCESS_TOKEN_SECRET=${ACCESS_TOKEN_SECRET}
ENV ACCESS_TOKEN_TIME=${ACCESS_TOKEN_TIME}

ENV REFRESH_TOKEN_SECRET=${REFRESH_TOKEN_SECRET}
ENV REFRESH_TOKEN_TIME=${REFRESH_TOKEN_TIME}

ENV ADMIN_PRIVATE_KEY=${ADMIN_PRIVATE_KEY}

ENV DB_URL=${DB_URL}

ENV NODE_ENV=PROD

# Build
RUN npm run build

EXPOSE 8080

CMD [ "npm", "start" ]
