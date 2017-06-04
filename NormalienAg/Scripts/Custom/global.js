$(window).on("load", function () {
    
    // Get canvas
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    resizeDescriptionContainer();

    var circleRadius = 70;
    var hoverfactor = 2;

    var canvasImages = getImages(canvas, circleRadius, hoverfactor,
        [
            "/Content/Img/Index/formenbau.jpeg",
            "/Content/Img/Index/werkzeugbau.jpeg",
            "/Content/Img/Index/maschinenbau.jpeg",
            "/Content/Img/Index/download.png",
            "/Content/Img/Index/gewindeformen.jpeg",
            "/Content/Img/Index/fuehrungselemente.png",
            "/Content/Img/Index/montage.jpeg"
        ],
        [
            "#",
            "#",
            "#",
            "#",
            "#",
            "#",
            "#"
        ],
        [
            new ImageDescription(canvas, "Formenbau", [new Site("Beschreibung1"), new Site("Beschreibung2"), new Site("Beschreibung3")]),
            new ImageDescription(canvas, "Werkzeugbau", [new Site("Plattenbearbeitungen", "#"), new Site("Schnittwerkzeuge", "#"), new Site("Biegewerkzeuge", "#"), new Site("Konstruktionen", "#"), new Site("Hartbearbeitungen", "#")]),
            new ImageDescription(canvas, "Maschinenbau", [new Site("Beschreibung1"), new Site("Beschreibung2"), new Site("Beschreibung3")]),
            new ImageDescription(canvas, "Download", [new Site("Beschreibung1"), new Site("Beschreibung2"), new Site("Beschreibung3")]),
            new ImageDescription(canvas, "Gewindeformen", [new Site("Beschreibung1"), new Site("Beschreibung2"), new Site("Beschreibung3")]),
            new ImageDescription(canvas, "Führungselemente", [new Site("Normführungselemente", "/Fuehrungselemente"), new Site("Spezialanfertigungen", "/Fuehrungselemente/Spezialanfertigungen"), new Site("Preislisten", "/Fuehrungselemente/Preislisten")]),
            new ImageDescription(canvas, "Montage", [new Site("Beschreibung1"), new Site("Beschreibung2"), new Site("Beschreibung3")])
        ]);

    var kontakt = new CanvasImage(
        canvas,
        circleRadius,
        hoverfactor,
        "/Content/Img/Index/building.jpeg",
        new ImageDescription(canvas, "Firma", [new Site("Kontakt", "/Firma/Kontakt"), new Site("Team", "/Firma/Team"), new Site("Geschichte", "/Firma/Geschichte")]),
        "/Firma/Kontakt");

    var canvasManager = new CanvasManager(
        canvas,
        circleRadius,
        hoverfactor,
        kontakt,
        canvasImages);
    
    // Draw elements
    canvasManager.draw();

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

getImages = function (canvas, radius, hoverFactor, imgLinks, forwardUrls, imgDescriptions) {

    if (!isArray(imgLinks) || !isArray(forwardUrls) || !isArray(imgDescriptions)) {
        throw "links, urls and descriptions must be arrays!";
    }

    if (imgLinks.length !== imgDescriptions.length || imgLinks.length !== forwardUrls.length) {
        throw "link-, url- and description list must have the same length!";
    }

    var retList = [];
    for (var i = 0; i < imgLinks.length; i++) {
        retList.push(new CanvasImage(canvas, radius, hoverFactor, imgLinks[i], imgDescriptions[i], forwardUrls[i]));
    }

    return retList;
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
