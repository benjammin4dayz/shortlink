# ShortLink

Simple, straightforward, self-hostable link shortener service built on SQLite, Express, and Node.js

Loosely inspired by ulvis.net

## Getting Started

After starting the service using one of the methods outlined below, the web UI can be used to start generating shortlinks without writing any code. Simply input the full URL you want to shorten into the form, click the button, and copy the output.

By default, the Express server will run on port `3000` unless `PORT` is specified in the .env file.

### Docker

Images are available on [Docker Hub](https://hub.docker.com/r/benjammin4dayz/shortlink/tags)

- **Example using docker run**

  ```bash
  docker run -v data:/app/data -p 3000:3000 benjammin4dayz/shortlink
  ```

- **Example using docker compose**

  ```yaml
  version: '3.9'
  services:
    app:
      image: benjammin4dayz/shortlink
      ports:
        - 3000:3000
      volumes:
        - data:/app/data
  ```

### Source

Check the [tags](https://github.com/benjammin4dayz/shortlink/tags) for a specific version

- **Running the development server**

  ```bash
  npm start
  ```

- **Building for production**

  ```bash
  npm run build
  node dist/app.js
  ```

## Shortener API

### GET /api/v1/shorten?url=`<YOUR_LONG_URL>`

_Content Type: `text/plain`_

Postfixing a query string with the `url=` parameter is the simplest way to interact with the API. If the provided URL is valid, a shortlink is returned in plain text. Otherwise, an empty string is returned.

**Request Format**

```js
fetch('/api/v1/shorten?url=https://example.com').then(res => res.text());
```

### POST /api/v1/shorten

_Content Type: `application/json`_

This method accepts and returns an object with some more insight for use in your application

**Request Format**

```js
fetch('/api/v1/shorten', {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  method: 'POST',
  body: JSON.stringify({
    url: '<YOUR_LONG_URL>',
  }),
}).then(res => res.json());
```

**Success Response**

```json
{
  "message": "URL created successfully",
  "data": {
    "url": "<YOUR_SHORT_URL>"
  }
}
```

**Failure Response**

```json
{ "error": "That wasn't supposed to happen!" }
```

<!-- TODO:
    Implement graceful shutdowns where db is manually closed before releasing the process
    Server-side templating instead of static index (pug?)
    Rate Limiting w/ express-rate-limit or express-slow-down
-->
