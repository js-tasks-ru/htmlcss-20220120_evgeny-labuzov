'use strict';
/* call common scripts */
(function(){
  const { domReady, cl } = window.utils;
  domReady(_ => {
    setTimeout(_ => cl(document.body, 'preload', 'remove'), 250);
  });
})();
