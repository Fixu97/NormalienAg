window.CanvasImage = function (canvas, x, y, radius, imgSrc) {
    "use strict";
    
    x = validateNumber(x);
    y = validateNumber(y);
    radius = validateNumber(radius);
    var isHovered = false;

    if (typeof imgSrc !== "string") {
        throw "Parameter imgSrc should be a string!";
    }

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
            circle.draw();
            context.clip();

            var pos = self.getImgPosFromCenter(x, y, prop.width, prop.height);

            context.drawImage(img, pos.x, pos.y, prop.width, prop.height);
            context.stroke();

            // restore contest
            context.restore();
        });
    }
    
    this.getX = function () {
        return x;
    };
    this.getY = function () {
        return y;
    };
    this.draw = function (radiusParam) {
        if (typeof (radiusParam) === "undefined") {
            draw(radius, this);
        } else {
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