import urlMarker from "./utils/urlMarker";
import regexMatch from "./utils/regexMatch";
// Calls a function and gives it an element to act on.

const getCurrentScript = () => {
    if (document.currentScript) {
        return document.currentScript;
    }

    try {
        throw new Error();
    } catch (e) {
        const stack = e.stack.toString();
        const scriptMark = regexMatch(/\sat\s.+?(\n|$)/g, stack)
      .map(urlMarker.getMark)
      .filter(v => !!v)[0];

        if (!scriptMark) {
            throw new Error("No url mark current Script found");
        }

        const scripts = document.getElementsByTagName("script");
        const currentScript = [].slice.call(scripts)
      .filter((scriptEl) => {
          const scriptSrc = scriptEl.getAttribute("src") || "";
          const elMark = urlMarker.getMark(scriptSrc);
          return elMark === scriptMark;
      })[0];


        if (!scriptMark) {
            throw new Error("currentScript not found");
        }

        return currentScript;
    }
};

/**
 * [xController description]
 * @method xController
 * @param  {function} callback - This is the controller function for the x-div
 *                             	Component. It will be called with the x-div Element
 *                              as its first argument and as the `this` keyword
 * @return {void}
 */
function xController(callback) {
    "use strict";

    const execute = () => {
        const currentScript = getCurrentScript();
        callback.call(currentScript.parentElement, currentScript.parentElement);
    };

  // For document.currentScript.parentElement to give us the right element
  // it must be called from within the function.
    execute.call(callback);
}

export default xController;
