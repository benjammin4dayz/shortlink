# ShortLink

Simple, straightforward, self-hostable link shortener service built on SQLite, Express, and Node.js

Loosely inspired by ulvis.net

## Getting Started

### Using docker run

```bash
docker run -v data:/app/data -p 80:3000 benjammin4dayz/shortlink
```

### Using docker compose

```yaml
version: '3.9'
services:
  app:
    image: benjammin4dayz/shortlink
    ports:
      - 80:3000
    volumes:
      - data:/app/data
```

## Shortener API

### GET /api/v1/shorten?url=`<YOUR_LONG_URL>`

_Content Type: `text/plain`_

This is the simplest way to interface with the API.

#### Success Response

```txt
<YOUR_SHORT_URL>
```

#### Failure Response

```txt
<EMPTY_STRING>
```

### POST /api/v1/shorten

_Content Type: `application/json`_

This method accepts and returns an object with some more insight for use in your application

#### Request Format

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

#### Success Response

```json
{
  "message": "URL created successfully",
  "data": {
    "url": "<YOUR_SHORT_URL>"
  }
}
```

#### Failure Response

```json
{ "error": "That wasn't supposed to happen!" }
```

<!-- TODO:
    Implement graceful shutdowns where db is manually closed before releasing the process
    Server-side templating instead of static index (pug?)
    Rate Limiting w/ express-rate-limit or express-slow-down
-->
