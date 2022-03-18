(function() {
  "use strict"
  const { qs, cl, getAttr, setAttr, remAttr } = window.utils;

  class ThemeSwitcher {
    attrName = 'data-theme-dark';

    labelOn = 'Dark Theme On';
    labelOff = 'Light Theme On';

    hrefSourceLight = null;
    hrefSourceDark = null;

    isStartOn = null;
    withoutLabelChanger = false;

    elChanger = null;
    elLabel = null;
    elCheckbox = null;

    elSideChanger = null;
    elSideLabel = null;
    elSideCheckbox = null;

    elCtx = null;
    elSourceLink = null;


    // static
    static instance = null;

    constructor({ withoutLabelChanger, isStartOn = null }) {
      this.elSourceLink = qs('#source-theme', document.head);

      this.elChanger = qs('#theme-changer');
      this.elLabel = qs('.theme-changer__label', this.elChanger);
      this.elCheckbox = qs('.theme-changer__input', this.elChanger);

      this.elSideChanger = qs('#mobile-theme-switcher');
      if(this.elSideChanger) {
        this.elSideLabel = qs('.toggler__label', this.elSideChanger);
        this.elSideCheckbox = qs('.toggler__input', this.elSideChanger);
        this.labelSideOn = getAttr(this.elSideLabel, 'data-label-on') || this.labelSideOn;
        this.labelSideOff = getAttr(this.elSideLabel, 'data-label-off') || this.labelSideOff;
      }

      this.elCtx = document.documentElement;

      this.withoutLabelChanger = withoutLabelChanger;

      if(isStartOn !== null) {
        this.isStartOn = isStartOn;
        if(this.isStartOn) this.elCheckbox.checked = true;
        else this.elCheckbox.checked = false;
      }

      if(!this.withoutLabelChanger) {
        this.labelOn = getAttr(this.elLabel, 'data-label-on') || this.labelOn;
        this.labelOff = getAttr(this.elLabel, 'data-label-off') || this.labelOff;
      }

      this.handler();


      this.elChanger.addEventListener('change', _ => this.handler());
      this.elSideChanger && this.elSideChanger.addEventListener('change', _ => this.sideHandler());
    };

    handler() {
      if(this.isChecked) {
        setAttr(this.elCtx, this.attrName, true);
        if(!this.withoutLabelChanger) this.elLabel.innerText = this.labelOn;
        if(this.elSideChanger) {
          this.elSideLabel.innerText = this.labelSideOn;
          this.elSideCheckbox.checked = true;
        }
        this.setSourceStyle(true);
        cl(this.elChanger, 'theme-changer_on', 'add');
      } else {
        remAttr(this.elCtx, this.attrName);
        if(!this.withoutLabelChanger) this.elLabel.innerText = this.labelOff;
        if(this.elSideChanger) {
          this.elSideLabel.innerText = this.labelSideOff;
          this.elSideCheckbox.checked = false;
        }
        this.setSourceStyle(false);
        cl(this.elChanger, 'theme-changer_on', 'remove');
      }
    };

    sideHandler() {
      if(this.isSideChecked) {
        setAttr(this.elCtx, this.attrName, true);
        this.elSideLabel.innerText = this.labelSideOn;
        this.elCheckbox.checked = true;
        cl(this.elChanger, 'theme-changer_on', 'add');
        this.setSourceStyle(true);
      } else {
        remAttr(this.elCtx, this.attrName);
        this.elSideLabel.innerText = this.labelSideOff;
        this.elCheckbox.checked = false;
        this.setSourceStyle(false);
        cl(this.elChanger, 'theme-changer_on', 'remove');
      }
    };

    setSourceStyle(isOn) {
      if(!this.elSourceLink) return false
      if(!this.hrefSourceLight) this.hrefSourceLight = getAttr(this.elSourceLink, 'data-light') || getAttr(this.elSourceLink, 'href');
      if(!this.hrefSourceDark) this.hrefSourceDark = getAttr(this.elSourceLink, 'data-dark') || getAttr(this.elSourceLink, 'href');
      if (isOn) setAttr(this.elSourceLink, 'href', this.hrefSourceDark);
      else setAttr(this.elSourceLink, 'href', this.hrefSourceLight);
    }

    get isChecked() { return this.elCheckbox.checked; }
    get isSideChecked() { return this.elSideCheckbox.checked; }

    // static methods:
    static init({ withoutLabelChanger, isStartOn = null }) {
      this.instance = new this({withoutLabelChanger, isStartOn});
      return this;
    };

    static log() {
      console.log(this.instance);
      return this;
    };

  }

  ThemeSwitcher
  .init({
    withoutLabelChanger: true,
    isStartOn: true
  })
  .log();

})();
