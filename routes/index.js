
const route = require('./getRoute');



const routes = [
  ['index', '/', 'index.html'],
  ['helloWorld', '/01-hello-world', '01-intro/01-hello-world/solution.html'],
  ['semanticMockup', '/01-semantic-mockup', '02-dz0/01-semantic-mockup/solution.html'],
  ['button', '/01-button', '03-lection1/01-button/index.html'],
  ['accordion', '/02-accordion', '03-lection1/02-accordion/index.html'],
  ['histogram', '/01-histogram', '04-lection2/01-histogram/index.html'],
  ['skeleton', '/02-skeleton', '04-lection2/02-skeleton/index.html'],
  ['tooltip', '/01-tooltip', '05-lection3/01-tooltip/index.html'],
  ['modal', '/02-modal', '05-lection3/02-modal/index.html'],
  ['calendar', '/03-calendar', '05-lection3/03-calendar/index.html'],
  ['background', '/02-background-image', '06-lection4/02-background-image/index.html'],
];

const obj = routes.reduce((sum, [key, url, path]) => {
  sum[key] = {route, key, url, path};
  return sum;
}, {});

module.exports = obj;
