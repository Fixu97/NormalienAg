window.CanvasImage = function (canvas, radius, hoverFactor, imgSrc, imgDescription/*, forwardUrl*/) {
    "use strict";
    radius = validateNumber(radius);
    hoverFactor = validateNumber(hoverFactor);
    imgSrc = validateString(imgSrc);
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
            var img = this,
                diameter = 2 * radius;

            var prop = self.getNewImgProportion(img, diameter, diameter);

            var circle = new Circle(context, x, y, radius, "rgba(150, 150, 150, 0.8)");

            var lineWidth;
            if (isHovered) {
                lineWidth = 4;
            }

            circle.draw(lineWidth);
            context.clip();

            var pos = self.getImgPosFromCenter(x, y, prop.width, prop.height);

            context.drawImage(img, pos.x, pos.y, prop.width, prop.height);
            context.stroke();

            // restore contest
            context.restore();

            // display description  
            if (isHovered) {
                imgDescription.print();
            } else {
                $("#descriptionContainer").empty();
            }
        });
    }
    
    this.getX = function () {
        return x;
    };
    this.setX = function (posX) {
        x = validateNumber(posX);
    };
    this.getY = function () {
        return y;
    };
    this.setY = function (posY) {
        y = validateNumber(posY);
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