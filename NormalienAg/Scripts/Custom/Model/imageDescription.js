window.ImageDescription = function (canvas, title, subSites) {
    "use strict";

    title = validateString(title);
    var context = canvas.getContext("2d");
    var titleFontSize = 35;
    var subSitesFontSize = 22 // titleFontSize / 2;

    var x = 0;
    var y = 0;

    this.setX = function (posX) {
        x = validateNumber(posX);
    }
    this.setY = function (posY) {
        y = validateNumber(posY);
    }
        
    if (!isArray(subSites)) {
        throw "Parameter subSites must be an array!";
    }

    var printText = function (text, fontSize, posY) {

        context.textAlign = "center";
        context.font = fontSize + "px Calibri";
        context.lineWidth = 2;

        context.strokeStyle = 'black';
        context.strokeText(text, x, posY);

        // clip the stroked text so it can be filled
        context.clip();

        context.fillStyle = 'white';
        context.fillText(text, x, posY);
    }

    this.print = function () {

        context.save();

        // print the title
        printText(title, titleFontSize, y);

        for (var i = 0; i < subSites.length; i++) {
            printText(
                " - " + subSites[i],
                subSitesFontSize,
                y + (i + 1) * subSitesFontSize * 1.2)
        }

        context.restore();
    }
}