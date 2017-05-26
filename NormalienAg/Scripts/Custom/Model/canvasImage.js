window.CanvasImage = function (canvas, radius, hoverFactor, imgSrc, imgDescription, forwardUrl) {
    "use strict";
    radius = validateNumber(radius);
    hoverFactor = validateNumber(hoverFactor);
    imgSrc = validateString(imgSrc);

    if (!isDefined(imgDescription) || !(imgDescription instanceof ImageDescription)) {
        throw "imgDescription must be of type 'ImageDescription'!";
    }

    forwardUrl = validateString(forwardUrl);

    var isHovered = false;
    var context = canvas.getContext("2d");

    var x = 0;
    var y = 0;

    var draw = function (radius, mouseX, mouseY, self) {
        "use strict";

        // asynchronos call
        getImage(imgSrc, function () {

            // save context
            context.save();

            // in this context, 'this' is the image
            var img = this;
            var diameter = 2 * radius;
            var fillColor = "rgba(150, 150, 150, 0.8)";

            var prop = getNewImgProportion(img, diameter, diameter);

            var circle = new Circle(context, x, y, radius, fillColor);

            var lineWidth;
            if (isHovered) {
                lineWidth = 4;
            }

            circle.draw(lineWidth);
            context.clip();

            var pos = getImgPosFromCenter(x, y, prop.width, prop.height);

            context.drawImage(img, pos.x, pos.y, prop.width, prop.height);
            context.stroke();

            // display description  
            if (isHovered) {
                // save previous fillStyle
                var previousFillStyle = context.fillStyle;

                // set fillStyle
                context.fillStyle = fillColor;

                // fill
                context.fill();

                // reset fillStyle
                context.fillStyle = previousFillStyle;

                imgDescription.print(mouseX, mouseY);
            } else {
                $("#descriptionContainer").empty();
            }

            // restore context
            context.restore();
        });
    };
    var getImgPosFromCenter = function (centerX, centerY, width, height) {
        "use strict";
        
        var pos = {};
        
        pos.x = centerX - 0.5 * width;
        pos.y = centerY - 0.5 * height;
        
        return pos;
    };    
    var getNewImgProportion = function (img, maxWidth, maxHeight) {
        "use strict";
        
        if (!img || typeof img !== "object" || !(img instanceof Image)) {
            throw "Invalid paramteter img!";
        }
        
        maxWidth = validateNumber(maxWidth);
        maxHeight = validateNumber(maxHeight);
        
        var aspectRatio = img.width / img.height,
            newWidth,
            newHeight;

        if (aspectRatio > 1) {
            newHeight = maxHeight;
            newWidth = newHeight * aspectRatio;
        } else {
            newWidth = maxWidth;
            newHeight = newWidth / aspectRatio;
        }
        
        return {width: newWidth, height: newHeight};
    };    
    var getImage = function (src, successHandler, errorHandler) {
        "use strict";
        var img = new Image();
        img.onload = successHandler;
        img.onerror = errorHandler;
        img.src = src;
    };
    
    this.getX = function () {
        return x;
    };
    this.setX = function (posX) {
        x = validateNumber(posX);
        imgDescription.setX(x);
    };
    this.getY = function () {
        return y;
    };
    this.setY = function (posY) {
        y = validateNumber(posY);
        imgDescription.setY(y - radius * 0.5); // First quarter of bubble height
    };
    this.draw = function (mouseX, mouseY) {

        mouseX = validateNumber(mouseX);
        mouseY = validateNumber(mouseY);

        isHovered = this.isAtPosition(mouseX, mouseY);
        var curRadius = radius;
        if (isHovered) {
            curRadius *= hoverFactor;
        }
        draw(curRadius, mouseX, mouseY, this);
    };    
    this.isAtPosition = function (mouseX, mouseY) {

        mouseX = validateNumber(mouseX);
        mouseY = validateNumber(mouseY);

        var newRadius = radius;
        if (isHovered) {
            newRadius *= hoverFactor;
        }

        var correctX = mouseX > x - newRadius && mouseX < x + newRadius;
        var correctY = mouseY > y - newRadius && mouseY < y + newRadius;

        return correctX && correctY;
    };
    this.openSite = function (mouseX, mouseY) {

        var hoveredSubsite = imgDescription.getHoveredSite(mouseX, mouseY);
        var urlToOpen = "#";

        // Decide which url to take for forwarding
        if (hoveredSubsite !== null && isDefined(hoveredSubsite.getUrl())) {
            urlToOpen = hoveredSubsite.getUrl();
        } // else {
        //    urlToOpen = forwardUrl;
        //}
        this.forward(urlToOpen);
    }
};

window.CanvasImage.prototype = Object.create(window.CanvasElementHelper.prototype);