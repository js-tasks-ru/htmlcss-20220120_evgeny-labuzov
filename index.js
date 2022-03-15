// std
const path = require('path');
const { resolve } = require('path');
// dependences
const express = require('express');

// app
const routes = require('./routes');

const port = 3000;

const options = {
  dotfiles: 'ignore', maxAge: 1,
  etag: false, index: false, redirect: false,
  extensions: 'htm,html,mp3,ogg,wav,js,txt,css'.split(''),
  setHeaders(res) { res.set('x-timestamp', Date.now()); },
};

const app = express();

app.use((req, res, next) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  };
  Object.entries(headers)
  .forEach(([key, value], i) => res.header(key, value));
  next();
}).options('*', (req, res) => res.end());

const static = [
  '02-dz0/01-semantic-mockup',
  '03-lection1/01-button',
  '03-lection1/02-accordion',
  '04-lection2/01-histogram',
  '04-lection2/02-skeleton',
  '05-lection3/01-tooltip',
  '05-lection3/02-modal',
  '05-lection3/03-calendar',
  '06-lection4/01-avatar',
  '06-lection4/02-background-image',
  '06-lection4/03-srcset',
  '07-lection5/01-checkbox',
  '07-lection5/02-radio',
  '07-lection5/03-toggler',
  '07-lection5/04-input',
  '09-lection7/01-burger-menu',
  'assets/images',
  'build',
  'libs',
];

app.use('/assets', express.static('assets', options));
app.use('/components', express.static('components', options));

const staticResolve = [...new Set(static.map(s => [s, ...s.split('/')].map(ss => ss)).flat())];

staticResolve.forEach(st => {
  app.use(`/${st}`, express.static(st, options));
  app.use(express.static(st, options));
});

const runRouters = async _ =>  {
  const {entries} = Object;
  const param = {};
  for (let [key, {route, url, path}] of entries(routes)) {
    await route(app, {...(param[key] || {}), url, path: resolve(path)});
  }
};

runRouters();

app.listen(port, (err) => {
  if (err) {
    console.error('error: ', err);
    throw new Error(err);
  }
  console.log(`Server runing on http://localhost:${port}/ ${new Date()}`);
});
