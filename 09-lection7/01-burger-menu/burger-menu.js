(function() {
  "use strict"
  const { qs, cl, getAttr, setAttr, remAttr, isNode } = window.utils;

  class Menu {
    // props
    isOpen = false;

    // events
    eventOpen = null;
    eventClose = null;

    // elements
    elRoot = null;
    elButton = null;
    elContainer = null;

    // static
    static instance = null;

    constructor() {
      try {
        this.elRoot = qs('#burger-menu');
        const slcContainer = getAttr(this.elRoot, 'data-for');
        this.elButton = qs('button', this.elRoot);
        this.elContainer = qs(slcContainer, this.elRoot);
        const condition = [
          this.elContainer === null,
          this.elButton === null,
          this.elContainer === null
        ].some(itm => !!itm);
        if(condition) throw new Error('Menu not Found!')
      } catch (e) {
        console.error('Error!');
        console.log(e);
        console.dir(e);
        return false;
      }

      this.eventOpen = new CustomEvent('menu-open', { detail: { ctx: this, isOpen: true } });
      this.eventClose = new CustomEvent('menu-close', { detail: { ctx: this, isOpen: false } });

      this.close();

      window.addEventListener('keyup', ({keyCode, key}) => {
        (keyCode === 27 || key === 'Escape') ? this.close() : void null;
      });
      window.addEventListener('keyup', ({ctrlKey, key}) => {
        (key === 'm' && ctrlKey) ? this.closeController() : void null;
      });
      this.elButton.addEventListener('click', _ => this.closeController());
    };

    closeController() { this.isOpen ? this.close() : this.open(); };

    close() {
      this.elRoot.dispatchEvent(this.eventClose);
      cl(document.body, '_overflow:hidden', 'remove');
      cl(this.elRoot, 'burger-menu_open', 'remove');
      cl(this.elRoot, 'burger-menu_close', 'add');
      remAttr(this.elRoot, 'open');
      this.isOpen = false;
    };

    open() {
      this.elRoot.dispatchEvent(this.eventOpen);
      cl(document.body, '_overflow:hidden', 'add');
      cl(this.elRoot, 'burger-menu_close', 'remove');
      cl(this.elRoot, 'burger-menu_open', 'add');
      setAttr(this.elRoot, 'open', true);
      this.isOpen = true;
    };

    // static methods:
    static init() {
      this.instance = new this();
      return this;
    };
    static log() {
      console.log(this.instance);
      return this;
    };
    static getInstance() { return this.instance; };
    static getElement() { return this.instance.elRoot; };
  }

  Menu
  .init()
  .log();

  let menu = Menu.getInstance()
  let elMenu = Menu.getElement();

  elMenu && elMenu.addEventListener('menu-open', e => {
    console.log('Menu is opened');
    console.log(e);
    console.log(menu);
  });

  elMenu && elMenu.addEventListener('menu-close', e => {
    console.log('Menu is closed');
    console.log(e);
    console.log(menu);
  });
})();
