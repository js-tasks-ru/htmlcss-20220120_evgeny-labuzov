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
  '05-lection3/03-calendar',
];

app.use('/assets', express.static('assets', options));
app.use('/components', express.static('components', options));

static.forEach(s => app.use(express.static(s, options)));

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