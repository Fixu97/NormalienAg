window.CanvasElementHelper = function () {
    "use strict";

};

window.CanvasElementHelper.prototype = {

    // Returns a boolean indicating weather the object is at the given coordinates
    isAtPosition: function (mouseX, mouseY) { throwAbstract(); },

    // Should call the "forward" method with the given url
    openSite: function () { throwAbstract(); },

    // Changes page location
    forward: function (forwardUrl) {
        window.open(forwardUrl, "_self");
    },

    throwAbstract: function(){
        throw "This is an abstract method!";
    }

};