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
  ['avatar', '/01-avatar', '06-lection4/01-avatar/index.html'],
  ['background', '/02-background-image', '06-lection4/02-background-image/index.html'],
  ['srcset', '/03-srcset', '06-lection4/03-srcset/index.html'],
  ['checkbox', '/01-checkbox', '07-lection5/01-checkbox/index.html'],
  ['radio', '/02-radio', '07-lection5/02-radio/index.html'],
  ['toggler', '/03-toggler', '07-lection5/03-toggler/index.html'],
  ['input', '/04-input', '07-lection5/04-input/index.html'],
  ['burgerMenu', '/01-burger-menu', '09-lection7/01-burger-menu/index.html'],
  ['themeChanger', '/01-theme-changer', '10-lection8/01-theme-changer/index.html'],

  ['template', '/template', 'pages/template.html'],
  ['icons', '/icons', 'pages/icons.html'],

  ['p-avatar', '/avatar', 'pages/p-avatar.html'],
  ['p-calendar', '/calendar', 'pages/p-calendar.html'],
  ['p-elements', '/elements', 'pages/p-elements.html'],
  ['p-histogram', '/histogram', 'pages/p-histogram.html'],
  ['p-modal', '/modal', 'pages/p-modal.html'],
  ['p-tooltip', '/tooltip', 'pages/p-tooltip.html'],
];

const obj = routes.reduce((sum, [key, url, path]) => {
  sum[key] = {route, key, url, path};
  return sum;
}, {});

module.exports = obj;
