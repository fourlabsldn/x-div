# x-div Web Component

Use it like:

**myPage.html**
```html
  <x-div data-controller="js/mycontroller.js"> </x-div>
```
***mycontroller.js***
```javascript
  xController(function (element){    
    var whoisThis = (this === element) ? true : false; //true;
  });
```

The xController receives a callback which receives the element it is inserted
into as an argument.

## Installation
**NPM**
```
npm install x-div
```
**Bower**

```
bower install x-div
```