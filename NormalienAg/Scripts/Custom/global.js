$(window).on("load", function () {
    
    // Get canvas
    canvas = document.getElementById("canvas");

    var circleRadius = 50;
    var cImages = [
        "/Content/Img/drehbank.jpg",
        "/Content/Img/cnc.jpg",
        "/Content/Img/team.jpg",
        "/Content/Img/werkzeuge.jpg",
        "/Content/Img/teil1.jpg"];

    canvasManager = new CanvasManager(
        canvas,
        circleRadius,
        "/Content/Img/building.jpg",
        cImages);
    
    // Draw elements
    drawCanvas();
});

drawCanvas = function () {

    canvasManager.draw();

    return;
}


validateNumber = function (nr) {
    "use strict";

    if (isNaN(nr)) {
        throw "Parameter must be of type number!";
    }

    return Number(nr);
}
validateString = function (str) {
    if (typeof (str) !== "string") {
        throw "Parameter must be of type string!";
    }
    return str;
}
validateBool = function (bln) {
    switch(typeof(bln)){
        case "boolean":
            return bln;
        case "string":
            var tmpBlnStr = bln.toLowerCase();        
            if (tmpBlnStr === "true" || tmpBlnStr === "false") {
                return bln === "true";
            }
            break;
        case "number":
            if (bln === 0 || bln === 1) {
                return bln === 1;
            }
            break;
    }

    throw "Parameter must be of type boolean!";
}
isDefined = function (object) {
    return !(object === null || object === undefined);
}
isArray = function (object) {
    if (!isDefined(object)) {
        return false;
    }
    return Object.prototype.toString.call(object) === "[object Array]";
}
