// ===================================
//      WEB COMPONENT
// ===================================

(function () {
  'use strict';

  // Create our 'x-div' Web Component Prototype
  var xProto = Object.create(HTMLElement.prototype);

  //Create methods for its lifecycle
  xProto.attachedCallback = function () {

    var scriptEl = document.createElement('script');

    scriptEl.src = this.dataset.controller + '.js';
    scriptEl.async = true;
    this.appendChild(scriptEl);
  };

  //Register the Element
  document.registerElement('x-div', { prototype: xProto });
}());
