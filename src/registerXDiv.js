/**
 * Registers the `x-div` HTMLElement
 * @method registerXDiv
 * @return {void}
 */
function registerXDiv() {
  // Create our 'x-div' Web Component Prototype
  const xProto = Object.create(HTMLElement.prototype);

  // Create methods for its lifecycle
  xProto.attachedCallback = () => {
    const scriptEl = document.createElement('script');

    if (!this.dataset.controller) {
      console.error('No controller specified for x-div.');
      return;
    }

    scriptEl.src = getControllerSrc(this.dataset.controller);
    scriptEl.async = true;
    this.appendChild(scriptEl);
  };

  // Register the Element
  document.registerElement('x-div', {
    prototype: xProto,
  });
}

/**
 * If controllerSrc doesn't finish with `.js` it adds that.
 * @api private
 * @function getControllerSrc
 * @param  {String} controllerSrc - A given src value that may or may not have the `.js` extension
 * @return {String} The full controller src value.
 */
function getControllerSrc(controllerSrc) {
  if (/\.js$/i.test(controllerSrc)) {
    return controllerSrc;
  }

  return `${controllerSrc}.js`;
}

export default registerXDiv;
