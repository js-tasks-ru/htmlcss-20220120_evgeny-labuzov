'use strict';
/* call common scripts */
console.log(1);
(function(){
  const { domReady, cl } = window.utils;
  domReady(_ => cl(document.body, 'preload', 'remove'));
})();
