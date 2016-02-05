/* global describe, it, expect */

/*jshint strict: false */
describe('Web Component', function () {
  var component;
  var controllerAdd = '../js/main';

  component = document.createElement('x-div');
  component.dataset.controller = controllerAdd;
  document.body.appendChild(component);

  it('should add a script tag to load controller', function () {
    expect(component.querySelector('script')).toBeDefined();
  });

  it('the script tag should load the right controller', function () {
    expect(component.querySelector('script').src.indexOf(controllerAdd + 'js')).toBeTruthy();
  });

  describe('After the controller is loaded', function () {

    it('its function should have been called with the x-div element as parameter', function () {
      //The controller being used will change the colors of the div and add a button
      //Let's see if the button was added to check whether the function was applied.
      expect(component.querySelector('button')).toBeDefined();
    });
  });
});
