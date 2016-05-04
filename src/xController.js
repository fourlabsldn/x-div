

// Calls a function and gives it an element to act on.

/**
 * [xController description]
 * @method xController
 * @param  {function} callback - This is the controller function for the x-div
 *                             	Component. It will be called with the x-div Element
 *                              as its first argument and as the `this` keyword
 * @return {void}
 */
function xController(callback) {
  'use strict';

  const execute = () => {
    callback.call(document.currentScript.parentElement, document.currentScript.parentElement);
  };

  // For document.currentScript.parentElement to give us the right element
  // it must be called from within the function.
  execute.call(callback);
}

export default xController;
