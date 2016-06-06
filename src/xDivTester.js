import assert from 'fl-assert';

class xDivTester {
  contructor() {
    this.controller = null;

    // Will capture all calls to xController
    window.xController = function xController(func) {
      assert(!this.controller,
        `xDivTester(): There is already an x-div controller in place.
        Run xDivTester.reset() to unload current controller`);

      this.controller = func;
    };
  }

  reset() {
    this.controller = null;
  }

  callWith(el) {
    assert(typeof el === 'object' && el.setAttribute,
      'xDivTester.callWith(): Element provided is not a valid HTMLElement');

    assert(this.controller, 'xDivTester.callWith(): No x-div controller initialised.');

    this.controller.call(el, el);
  }
}

export default xDivTester;
