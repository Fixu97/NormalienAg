window.CanvasImage = function (canvas, x, y, radius, imgSrc, imgDescription/*, forwardUrl*/) {
    "use strict";
    
    x = validateNumber(x);
    y = validateNumber(y);
    radius = validateNumber(radius);
    imgSrc = validateString(imgSrc);
    //forwardUrl = validateString(forwardUrl);

    var isHovered = false;
    var context = canvas.getContext("2d");

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

            var circle = new Circle(context, x, y, radius, "green");

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
    this.getY = function () {
        return y;
    };
    this.draw = function (radiusParam, hovered) {
        if (typeof (radiusParam) === "undefined") {
            isHovered = false;
            draw(radius, this);
        } else {
            isHovered = hovered;
            draw(radiusParam, this);
        }
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