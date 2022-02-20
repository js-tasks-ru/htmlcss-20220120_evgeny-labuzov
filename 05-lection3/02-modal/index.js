(function() {
  "use strict"
  const { qs, cl, getAttr, setAttr, isNode } = window.utils;

  class Modal {
    // props
    isOpen = false;
    openCount = 0;

    // events
    eventOpen = null;
    eventClose = null;

    // elements
    elModal = null;
    elWindow = null;
    elButton = null;
    elClose = null;
    elAction = null;

    actionButtons = [];

    // static collections
    static buttons = [];
    static modals = [];

    constructor({button, modal}) {
      if(!isNode(button) && !isNode(modal)) return false;
      this.elModal = modal;
      this.elButton = button;

      this.elClose = qs('.modal__button-close', this.elModal);
      this.elWindow = qs('.modal__window', this.elModal);
      this.elAction = qs('.modal__action', this.elModal);

      this.eventOpen = new CustomEvent('modal-open', { detail: {ctx: this, isOpen: true} });
      this.eventClose = new CustomEvent('modal-close', { detail: {ctx: this, isOpen: false} });

      this.close();

      if(this.elAction) {
        this.actionButtons = [...qs('button:not(.modal__button-close)', this.elAction, 'querySelectorAll')];
        this.actionButtons.forEach(button => {
          button.addEventListener('click', _ => {
            let { innerText, id } = button;
            id && setAttr(this.elModal, 'data-closed-with-id', '#' + id);
            innerText && setAttr(this.elModal, 'data-closed-with-button', innerText);
            this.close()
          });
        });
      }

      this.elClose.addEventListener('click', _ => this.close());
      this.elModal.addEventListener('click', ({target}) => {
        cl(target, 'modal') ? this.close() : void null;
      });
      window.addEventListener('keyup', ({keyCode, key}) => {
        (keyCode === 27 || key === 'Escape') ? this.close() : void null;
      });
      this.elButton.addEventListener('click', _ => this.closeController());
    };

    closeController() { this.isOpen ? this.close() : this.open(); };

    close() {
      this.elModal.dispatchEvent(this.eventClose);

      cl(this.elWindow, 'modal__window_disappear-to:bottom', 'add');
      cl(this.elWindow, 'modal__window_appear-from:top', 'remove');
      this.clearCloseAnimationController(_ => {
        cl(this.elModal, 'modal_close', 'add');
        cl(document.body, '_overflow:hidden', 'remove');
        cl(this.elWindow, 'modal__window_disappear-to:bottom', 'remove');
        this.isOpen = false;
      });
    };
    clearCloseAnimationController(callback) {
      this.elWindow.addEventListener('animationend', ({animationName}) => {
        if(animationName === 'disappearToBottom') callback();
      });
    }

    open() {
      this.elModal.dispatchEvent(this.eventOpen);

      cl(this.elWindow, 'modal__window_appear-from:top', 'add');
      cl(this.elWindow, 'modal__window_disappear-to:bottom', 'remove');
      cl(this.elModal, 'modal_close', 'remove');
      cl(document.body, '_overflow:hidden', 'add');
      this.openCount++;
      setAttr(this.elModal, 'data-open-count', this.openCount);
      this.isOpen = true;
    };

    // static methods:
    static init() {
      const body = document.body;
      const attributeName = 'data-open-modal';
      this.buttons = [...qs(`[${attributeName}]`, body, 'querySelectorAll')];
      this.modals = this.buttons.map(button => {
        let id = getAttr(button, attributeName);
        let modal = qs(`#${id}`);
        let instance = new this({button, modal});
        return { id, modal, instance };
      });
      return this;
    };
    static log() {
      console.log(this.buttons);
      console.log(this.modals);
      return this;
    };
    static getModalById(idModal) {
      return this.modals.find(({id}) => id === idModal);
    };
  }

  Modal
  .init()
  .log();

  const { modal = null } = Modal.getModalById('modal1');

  let blurContainers = [...(qs('.presentation', document.body, 'querySelectorAll') || [])];
  let cond = blurContainers && blurContainers.length && blurContainers.length > 0;

  // open event
  modal && modal.addEventListener('modal-open', e => {
    cond && blurContainers.forEach(el => cl(el, 'presentation_blur&contrast', 'add'));
    console.log('Modal is opened', e, modal);
  });

  // close event
  modal && modal.addEventListener('modal-close', e => {
    cond && blurContainers.forEach(el => cl(el, 'presentation_blur&contrast', 'remove'));
    console.log('Modal is closed', e, modal);
  });
})();
