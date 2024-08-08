import fs from 'fs';
import path from 'path';
import { Database } from 'sqlite3';
import { dbLogger as logger } from '../utils/logger';

const DB_DIR = 'data';
const DB_FILE = 'sqlite3.db';
const dbPath = path.join(DB_DIR, DB_FILE);

if (!fs.existsSync('data')) {
  fs.mkdirSync('data');
}

export const db = new Database(dbPath);

db.run(
  `CREATE TABLE IF NOT EXISTS urls (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      url TEXT,
      hits INTEGER,
      created TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL)`
);

export function addURL(url) {
  return new Promise((resolve, reject) => {
    const sqlQuery = 'INSERT INTO urls (url, hits) VALUES (?, ?)';

    logger.trace('Query: %s', sqlQuery);

    if (Array.isArray(url)) {
      const ids = [];
      const stmt = db.prepare(sqlQuery, function (err) {
        err ? reject(err) : ids.push(this.lastID);
      });
      url.forEach(u => {
        stmt.run(u, 0);
      });
      stmt.finalize();
      resolve(ids);
    } else {
      db.run(sqlQuery, [url, 0], function (err) {
        err ? reject(err) : resolve(this.lastID);
      });
    }
  });
}

export function getURL(id) {
  return new Promise((resolve, reject) => {
    id = parseInt(id, 10);
    const sqlQuery = 'SELECT * FROM urls WHERE id = ?';
    const params = [id];

    logger.trace('Query: %s', sqlQuery);

    db.get(sqlQuery, params, (err, row) => {
      err
        ? reject(err)
        : row && row?.url
        ? resolve(row.url)
        : reject('Empty or missing URL in database');
    });
  });
}

export function getHits(id) {
  return new Promise((resolve, reject) => {
    const sqlQuery = 'SELECT hits FROM urls WHERE id = ?',
      params = [id];

    logger.trace('Query: %s', sqlQuery);

    db.get(sqlQuery, params, (err, row) => {
      err ? reject(err) : resolve(row.hits);
    });
  });
}

export function addHit(id) {
  return new Promise((resolve, reject) => {
    const sqlQuery = 'UPDATE urls SET hits = hits + 1 WHERE id = ?',
      params = [id];

    logger.trace('Query: %s', sqlQuery);

    db.run(sqlQuery, params, function (err) {
      if (err) reject(err);

      getHits(id).then(hits => {
        resolve(hits);
      });
    });
  });
}

// eslint-disable-next-line no-unused-vars
function _test() {
  db.serialize(() => {
    let stmt = db.prepare('INSERT INTO urls (url, hits) VALUES (?, ?)');

    for (let i = 0; i < 10; i++) {
      stmt.run('http://localhost:3000/' + i, 0);
    }
    stmt.finalize();

    const urls = [];
    for (let i = 0; i < 100; i++) {
      const randomNum = Math.floor(Math.random() * 1000000);
      const url = `http://localhost:3000/${randomNum}`;
      urls.push(url);
    }

    addURL(urls);

    db.each('SELECT id, url, hits, created FROM urls', (err, row) => {
      console.log(row.id, row.url, row.hits, row.created);
    });
  });
}
