var babelHelpers = {};
babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

babelHelpers;

/**
 * Registers the `x-div` HTMLElement
 * @method registerXDiv
 * @return {void}
 */
function registerXDiv() {
  // Create our 'x-div' Web Component Prototype
  var xProto = Object.create(HTMLElement.prototype);

  // Create methods for its lifecycle
  xProto.attachedCallback = function () {
    var scriptEl = document.createElement('script');

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
    prototype: xProto
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

  return controllerSrc + '.js';
}

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

  var execute = function execute() {
    callback.call(document.currentScript.parentElement, document.currentScript.parentElement);
  };

  // For document.currentScript.parentElement to give us the right element
  // it must be called from within the function.
  execute.call(callback);
}

// Bug checking function that will throw an error whenever
// the condition sent to it is evaluated to false
/**
 * Processes the message and outputs the correct message if the condition
 * is false. Otherwise it outputs null.
 * @api private
 * @method processCondition
 * @param  {Boolean} condition - Result of the evaluated condition
 * @param  {String} errorMessage - Message explainig the error in case it is thrown
 * @return {String | null}  - Error message if there is an error, nul otherwise.
 */
function processCondition(condition, errorMessage) {
  if (!condition) {
    var completeErrorMessage = '';

    // TODO: Use Error.stack to add caller names to functions.
    // Strict mode doesn't allow us to use callers
    // // The assert function is calling this processCondition and we are
    // // really interested is in who is calling the assert function.
    // const assertFunction = processCondition.caller;
    //
    // if (!assertFunction) {
    //   // The program should never ever ever come here.
    //   throw new Error('No "assert" function as a caller?');
    // }
    //
    // if (assertFunction.caller && assertFunction.caller.name) {
    //   completeErrorMessage = `${assertFunction.caller.name}: `;
    // }

    completeErrorMessage += errorMessage;
    return completeErrorMessage;
  }

  return null;
}

/**
 * Throws an error if the boolean passed to it evaluates to false.
 * To be used like this:
 * 		assert(myDate !== undefined, "Date cannot be undefined.");
 * @api public
 * @method assert
 * @param  {Boolean} condition - Result of the evaluated condition
 * @param  {String} errorMessage - Message explainig the error in case it is thrown
 * @return void
 */
function assert(condition, errorMessage) {
  var error = processCondition(condition, errorMessage);
  if (typeof error === 'string') {
    throw new Error(error);
  }
}

/**
 * Logs a warning if the boolean passed to it evaluates to false.
 * To be used like this:
 * 		assert.warn(myDate !== undefined, "No date provided.");
 * @api public
 * @method warn
 * @param  {Boolean} condition - Result of the evaluated condition
 * @param  {String} errorMessage - Message explainig the error in case it is thrown
 * @return void
 */
assert.warn = function warn(condition, errorMessage) {
  var error = processCondition(condition, errorMessage);
  if (typeof error === 'string') {
    console.warn(error);
  }
};

var xDivTester = function () {
  function xDivTester() {
    babelHelpers.classCallCheck(this, xDivTester);
  }

  babelHelpers.createClass(xDivTester, [{
    key: 'contructor',
    value: function contructor() {
      this.controller = null;

      // Will capture all calls to xController
      window.xController = function xController(func) {
        assert(!this.controller, 'xDivTester(): There is already an x-div controller in place.\n        Run xDivTester.reset() to unload current controller');

        this.controller = func;
      };
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.controller = null;
    }
  }, {
    key: 'callWith',
    value: function callWith(el) {
      assert((typeof el === 'undefined' ? 'undefined' : babelHelpers.typeof(el)) === 'object' && el.setAttribute, 'xDivTester.callWith(): Element provided is not a valid HTMLElement');

      assert(this.controller, 'xDivTester.callWith(): No x-div controller initialised.');

      this.controller.call(el, el);
    }
  }]);
  return xDivTester;
}();

registerXDiv();

// Expose xController for xDiv modules
window.xController = xController;
window.xDivTester = xDivTester;