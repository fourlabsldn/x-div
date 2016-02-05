/*globals xController*/
(function () {
  'use strict';
  xController(
    function main(el) {
      el.style.height = 900 + 'px';
      el.style.width = 900 + 'px';
      el.style.backgroundColor = 'red';
      el.insertAdjacentHTML('afterbegin', 'MAIN TEXT');
      console.log('I was called!');

      var button =  document.createElement('button');
      button.innerHTML = 'A test button.';
      el.appendChild(button);
    }
  );
}());
