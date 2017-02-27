$(window).on("load", function () {
    
    // Get canvas
    var canvas = document.getElementById("canvas");

    var circleRadius = 55;

    var imageDescriptions = [
    new ImageDescription("Formenbau", ["Beschreibung1", "Beschreibung2", "Beschreibung3"]),
    new ImageDescription("Werkzeugbau", ["Plattenbearbeitungen", "Schnittwerkzeuge", "Biegewerkzeuge", "Konstruktionen", "Hartbearbeitungen"]),
    new ImageDescription("Maschinenbau", ["Beschreibung1", "Beschreibung2", "Beschreibung3"]),
    new ImageDescription("Download", ["Beschreibung1", "Beschreibung2", "Beschreibung3"]),
    new ImageDescription("Gewindeformen", ["Beschreibung1", "Beschreibung2", "Beschreibung3"]),
    new ImageDescription("Führungselemente", ["Beschreibung1", "Beschreibung2", "Beschreibung3"]),
    new ImageDescription("Montage", ["Beschreibung1", "Beschreibung2", "Beschreibung3"])
    ];

    var cImages = [
        "/Content/Img/formenbau.jpeg",
        "/Content/Img/werkzeugbau.jpeg",
        "/Content/Img/maschinenbau.jpeg",
        "/Content/Img/download.png",
        "/Content/Img/gewindeformen.jpeg",
        "/Content/Img/fuehrungselemente.png",
        "/Content/Img/montage.jpeg"];

    var canvasManager = new CanvasManager(
        canvas,
        circleRadius,
        "/Content/Img/building.jpeg",
        new ImageDescription("Firma", ["Kontakt", "Team", "Geschichte"]),
        cImages,
        imageDescriptions);
    
    // Draw elements
    canvasManager.draw();

    resizeDescriptionContainer();

    // register event listener
    $(window).on("resize", resizeDescriptionContainer);
});

resizeDescriptionContainer = function() {
    var $descContainer = $("#descriptionContainer");
    var $canvas = $("#canvas");

    var width = $descContainer.parent().width() - $canvas.outerWidth(true) - $descContainer.outerWidth(true);
    var height = $canvas.height();

    $descContainer.width(width);
    $descContainer.height(height);
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
