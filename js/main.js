/*globals xController*/
(function () {
  'use strict';
  xController(
    function main(el) {
      el.style.height = 900 + 'px';
      el.style.width = 900 + 'px';
      el.style.backgroundColor = 'red';
      el.innerHTML = 'MAIN BUTTON';
      console.log('I was called!');
    }
  );
}());
