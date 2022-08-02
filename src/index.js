class CMBUtil {
    static isNullOrEmpty(tmp) {
      return (!tmp || 0 === tmp.length);
    }
  
    static isUndefined(tmp) {
      return (typeof(tmp) === 'undefined');
    }
  
    static isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }
  
    static getFromStore(name) {
      if (typeof(Storage) !== 'undefined') {
        return sessionStorage.getItem(name);
      }
    }
  
    // Parameter obj is a name/value object
    static writeToStore(obj) {
      if (typeof(Storage) !== 'undefined') {
        sessionStorage.setItem(obj.name, obj.value);
      }
    }
  
    static removeFromStore(name) {
      if (typeof(Storage) !== 'undefined') {
        sessionStorage.removeItem(name);
      }
    }
  
    // Find closest selector for referenced element
    static closest(refEl, findSelector) {
      if (refEl.closest) {
        return refEl.closest(findSelector);
      }
  
      var matches = Element.prototype.matches ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector,
      currentEl = refEl;
  
      while (currentEl) {
        if (matches.call(currentEl, findSelector)) {
          return currentEl;
        }
        currentEl = currentEl.parentElement;
      }
      return null;
    }
  
    /**
     * Get the largest value from an array
     * @param narray integer
    **/
    static getMaxFromArray(narray) {
        return Math.max.apply(null, narray);
    }
  
    static isIE() {
      if(/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
        return true;
      }
      else {
        return false;
      }
    }
  
    static viewportWidth() {
      let e = window;
      let a = 'inner';
      if (!('innerWidth' in window)) {
        a = 'client';
        e = document.documentElement || document.body;
      }
      return e[ a+'Width' ];
    }
  
    static hasClass(elem, tstClass) {
          return elem.className.indexOf(tstClass) !== -1;
    }
  
    static loaded(fn) {
      if (document.readyState !== 'loading') {
        fn();
      }
      else {
        document.addEventListener('DOMContentLoaded', fn);
      }
    }
  
    static resize(fn) {
      window.addEventListener('resize', fn);
    }
  
    static addEvent(element, evt, cb) {
      let previousEventCallback = element['on' + evt];
      element['on' + evt] = function(e) {
        let output = cb(e);
  
        if (output === false) return false;
  
        if (typeof(previousEventCallback) === 'function') {
          output = previousEventCallback(e);
  
          if (output === false) return false;
        }
      }
    }
  
    static getQueryParam(name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
  }
  
  export default CMBUtil;