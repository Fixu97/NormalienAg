window.ImageDescription = function (canvas, title, subSites) {
    "use strict";

    title = validateString(title);

    var $canvas = $(canvas);
    var context = canvas.getContext("2d");
    var titleFontSize = 35;
    var subSitesFontSize = 22 // titleFontSize / 2;
    var font = "Calibri";

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
    
    // Validate subsites
    for (var i = 0; i < subSites.length; i++) {
        if (!(subSites[i] instanceof Site)){
            throw "SubSite with index " + i + " is not of type Site!";
        }
    }

    var printText = function (text, fontSize, font, posY, isHovered) {
        
        context.lineWidth = 2;
        context.strokeStyle = 'black';
        context.fillStyle = 'white';
        context.textAlign = "center";
        context.font = font;
        context.strokeText(text, x, posY);

        // underline
        if (isHovered) {

            context.save();
            context.font = font;
            width = context.measureText(text).width;
            context.restore();

            var lineY = posY + fontSize * 0.2;

            context.beginPath();
            context.rect(x - 0.5 * width, lineY - 1, width, 2);
            context.stroke();
            context.fill();
        }

        //context.fillStyle = 'white';
        context.fillText(text, x, posY);
    }

    //var isHovered = function (text, fontSize, posY, mouseX, mouseY) {
    //    context.save();

    //    context.font = fontSize + "px " + font;
    //    var width = context.measureText(text).width;

    //    var correctX = mouseX >= x - 0.5 * width && mouseX <= x + 0.5 * width;
    //    var correctY = mouseY >= posY - fontSize && mouseY <= posY;

    //    context.restore();

    //    return correctX && correctY;
    //};

    this.print = function (mouseX, mouseY) {

        mouseX = validateNumber(mouseX);
        mouseY = validateNumber(mouseY);

        context.save();

        // print the title (title is never hovered)
        printText(title, titleFontSize, titleFontSize + "px " + font, y, false);

        var isAnySubSiteHovered = false;

        for (var i = 0; i < subSites.length; i++) {

            var curSite = subSites[i];
            curSite.setFontSize(subSitesFontSize);
            curSite.setX(x);
            curSite.setY(y + (i + 1) * subSitesFontSize * 1.2);

            // width
            context.save();
            context.font = font;
            curSite.setWidth(context.measureText(curSite.getDisplayTitle()).width);
            context.restore();

            // fontSize
            curSite.setFontSize(subSitesFontSize);

            var isHovered = curSite.isAtPosition(mouseX, mouseY)
            isAnySubSiteHovered = isAnySubSiteHovered || isHovered;

            // Print the subsite entry
            printText(
                curSite.getDisplayTitle(),
                curSite.getFontSize(),
                curSite.getFont(),
                curSite.getY(),
                isHovered);
        }

        if (isAnySubSiteHovered) {

            // Change cursor to pointer
            $canvas.css("cursor", "pointer");
        } else {
            $canvas.css("cursor", "default");
        }

        context.restore();
    }

    this.getHoveredSite = function (mouseX, mouseY) {

        for (var i = 0; i < subSites.length; i++) {
             
            var curSite = subSites[i];

            if (curSite.isAtPosition(mouseX, mouseY)) {
                return curSite;
            }
        }

        return null;
    }
}


window.ImageDescription.prototype = Object.create(window.CanvasElementHelper.prototype);