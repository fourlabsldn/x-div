 /**
  * xController()
  * Calls a function and gives it an element to act on.
  *
  * @param {@callback} func - the function to be called.
  */

function xController(func) {
  'use strict';

  var execute = function () {
    func(document.currentScript.parentElement);
  };

  // For document.currentScript.parentElement to give us the right element
  // it must be called from within the function.
  execute.call(func);
}

xController(console.log);
