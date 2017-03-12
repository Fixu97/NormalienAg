window.CanvasImage = function (canvas, radius, hoverFactor, imgSrc, imgDescription/*, forwardUrl*/) {
    "use strict";
    radius = validateNumber(radius);
    hoverFactor = validateNumber(hoverFactor);
    imgSrc = validateString(imgSrc);

    if (!isDefined(imgDescription) || !(imgDescription instanceof ImageDescription)) {
        throw "imgDescription must be of type 'ImageDescription'!";
    }

    //forwardUrl = validateString(forwardUrl);

    var isHovered = false;
    var context = canvas.getContext("2d");

    var x = 0;
    var y = 0;

    var draw = function (radius, self) {
        "use strict";

        // asynchronos call
        self.getImage(imgSrc, function () {

            // save context
            context.save();

            // in this context, 'this' is the image
            var img = this;
            var diameter = 2 * radius;
            var fillColor = "rgba(150, 150, 150, 0.8)";

            var prop = self.getNewImgProportion(img, diameter, diameter);

            var circle = new Circle(context, x, y, radius, fillColor);

            var lineWidth;
            if (isHovered) {
                lineWidth = 4;
            }

            circle.draw(lineWidth);
            context.clip();

            var pos = self.getImgPosFromCenter(x, y, prop.width, prop.height);

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

                imgDescription.print();
            } else {
                $("#descriptionContainer").empty();
            }

            // restore context
            context.restore();
        });
    }
    
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
        imgDescription.setY(y);
    };
    this.draw = function (hovered) {

        isHovered = validateBool(hovered);
        var curRadius = radius;
        if (isHovered) {
            curRadius *= hoverFactor;
        }
        draw(curRadius, this);
    };    
    this.isAtPosition = function (mouseX, mouseY) {

        mouseX = validateNumber(mouseX);
        mouseY = validateNumber(mouseY);

        var correctX = mouseX > x - radius && mouseX < x + radius;
        var correctY = mouseY > y - radius && mouseY < y + radius;

        return correctX && correctY;
    };
};

window.CanvasImage.prototype = Object.create(window.ImageHelper.prototype);