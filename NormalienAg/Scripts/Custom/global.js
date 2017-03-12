$(window).on("load", function () {
    
    // Get canvas
    var canvas = document.getElementById("canvas");
    var circleRadius = 55;
    var hoverfactor = 2;

    var formenbau = new CanvasImage(
        canvas,
        circleRadius,
        hoverfactor,
        "/Content/Img/formenbau.jpeg",
        new ImageDescription("Formenbau", ["Beschreibung1", "Beschreibung2", "Beschreibung3"]));

    var werkzeugbau = new CanvasImage(
        canvas,
        circleRadius,
        hoverfactor,
        "/Content/Img/werkzeugbau.jpeg",
        new ImageDescription("Werkzeugbau", ["Plattenbearbeitungen", "Schnittwerkzeuge", "Biegewerkzeuge", "Konstruktionen", "Hartbearbeitungen"]));

    var maschinenbau = new CanvasImage(
        canvas,
        circleRadius,
        hoverfactor,
        "/Content/Img/maschinenbau.jpeg",
        new ImageDescription("Maschinenbau", ["Beschreibung1", "Beschreibung2", "Beschreibung3"]));

    var download = new CanvasImage(
        canvas,
        circleRadius,
        hoverfactor,
        "/Content/Img/download.png",
        new ImageDescription("Download", ["Beschreibung1", "Beschreibung2", "Beschreibung3"]));

    var gewindeformen = new CanvasImage(
        canvas,
        circleRadius,
        hoverfactor,
        "/Content/Img/gewindeformen.jpeg",
        new ImageDescription("Gewindeformen", ["Beschreibung1", "Beschreibung2", "Beschreibung3"]));

    var fuehrungsElemente = new CanvasImage(
        canvas,
        circleRadius,
        hoverfactor,
        "/Content/Img/fuehrungselemente.png",
        new ImageDescription("Führungselemente", ["Beschreibung1", "Beschreibung2", "Beschreibung3"]));

    var montage = new CanvasImage(
        canvas,
        circleRadius,
        hoverfactor,
        "/Content/Img/montage.jpeg",
        new ImageDescription("Montage", ["Beschreibung1", "Beschreibung2", "Beschreibung3"]));

    var canvasImages = [formenbau, werkzeugbau, maschinenbau, download, gewindeformen, fuehrungsElemente, montage];

    var kontakt = new CanvasImage(
        canvas,
        circleRadius,
        hoverfactor,
        "/Content/Img/building.jpeg",
        new ImageDescription("Firma", ["Kontakt", "Team", "Geschichte"]));

    var imageDescriptions = [
    new ImageDescription("Formenbau", ["Beschreibung1", "Beschreibung2", "Beschreibung3"]),
    new ImageDescription("Werkzeugbau", ["Plattenbearbeitungen", "Schnittwerkzeuge", "Biegewerkzeuge", "Konstruktionen", "Hartbearbeitungen"]),
    new ImageDescription("Maschinenbau", ["Beschreibung1", "Beschreibung2", "Beschreibung3"]),
    new ImageDescription("Download", ["Beschreibung1", "Beschreibung2", "Beschreibung3"]),
    new ImageDescription("Gewindeformen", ["Beschreibung1", "Beschreibung2", "Beschreibung3"]),
    new ImageDescription("Führungselemente", ["Beschreibung1", "Beschreibung2", "Beschreibung3"]),
    new ImageDescription("Montage", ["Beschreibung1", "Beschreibung2", "Beschreibung3"])
    ];

    var canvasManager = new CanvasManager(
        canvas,
        circleRadius,
        hoverfactor,
        kontakt,
        canvasImages);
    
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
