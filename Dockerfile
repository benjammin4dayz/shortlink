FROM alpine:3.20.2

RUN apk add --no-cache nodejs npm

WORKDIR /app

# Configuration
COPY .babelrc .
COPY package*.json .

# Source Code
COPY src/ src

# Assets
COPY public/ public

RUN npm ci \
    && npm run build \
    && npm prune --production

EXPOSE 3000
CMD ["node", "dist/app.js"]