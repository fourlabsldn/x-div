if("undefined" === typeof document.currentScript){
    (function(){
        /***************************************************************************/
        /* document.currentScript polyfill + improvements */
        /***************************************************************************/
        document._currentScript = document.currentScript;

        // return script object based off of src
        var getScriptFromURL = function(url, scripts) {
            for (var i = scripts.length - 1; i >= 0; i--)
                if (scripts[i].src === url)
                    return scripts[i];

            return undefined;
        }

        var actualScript = document.actualScript = function() {
            var scripts = document.getElementsByTagName('script');

            if (document._currentScript)
                return document._currentScript;

            var stack;
            try {
                omgwtf
            } catch(e) {
                stack = e.stack;
            };

            if (!stack)
                return undefined;

            var e = stack.indexOf(' at ') !== -1 ? ' at ' : '@';
            while (stack.indexOf(e) !== -1)
                stack = stack.substring(stack.indexOf(e) + e.length);
                stack = stack.substring(0, stack.indexOf(':', stack.indexOf(':')+1));

            return getScriptFromURL(stack, scripts);
        };
        if (document.__defineGetter__)
            document.__defineGetter__('currentScript', actualScript);

    })();


}
