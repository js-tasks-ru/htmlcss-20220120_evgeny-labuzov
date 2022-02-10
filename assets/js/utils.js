'use strict';
/* utils */
(function(){
  const { floor, random } = Math;
  const rndMinMaxInt = (min, max) => floor(random() * (max - min + 1)) + min;
  const getAttr = (el, keyAttribute) => el.getAttribute(keyAttribute);
  const setAttr = (el, keyAttribute, valAttribute) => el.setAttribute(keyAttribute, valAttribute);
  const remAttr = (el, keyAttribute) => el.removeAttribute(keyAttribute);

  const isNode = o => (
  typeof Node === 'object' ? o instanceof Node
    : o && typeof o === 'object' && typeof o.nodeType === 'number' && typeof o.nodeName === 'string'
  );
  const stl = (el, prop, val = null) => (val === null) ? el.style[prop] : el.style[prop] = val;
  const qs = (slctr, ctx = null, mode = 'querySelector') => (ctx ? ctx : document.body)[mode](slctr);
  const cl = (el, cls, mode = 'contains') => (el.classList[mode](cls), cl);
  const getCmpStl = (el, prop) => getComputedStyle(el)[prop];
  const insert = (el, ctx = null) => (ctx ? ctx : document.body).appendChild(el);


  const px = unit => `${unit}px`;

  const up = val => String(val).toLocaleUpperCase();
  const lo = val => String(val).toLocaleLowerCase();
  const trim = val => String(val).trim();
  const int = parseInt;
  const str = (val, {trim = false, upper = -1}) => {
    let ret = String(val);
    if(trim) ret = trim(ret);
    if(upper !== -1) ret = ret.split('').map((c, i) => i === upper ? up(c) : c).join('');
  };

  window.utils = {
    rndMinMaxInt,
    getAttr,
    setAttr,
    remAttr,
    isNode,
    qs,
    cl,
    insert,
    px,
    getCmpStl,
    up, lo, str, trim,
    int,
    stl
  };
})();
