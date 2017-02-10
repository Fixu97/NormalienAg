window.CanvasImage = function (canvas, radius, imgSrc) {
    "use strict";
    
    radius = validateNumber(radius);

    if (typeof imgSrc !== "string") {
        throw "Parameter imgSrc should be a string!";
    }

    var context = canvas.getContext("2d");
    
    var getCircle = function () {
        var circle = new Circle(context, radius, "red");
        return circle;
    };
    
    this.draw = function (x, y, completionHandler) {
        
        // Get save instance of 'this'
        var self = this;
        
        // asynchronos call
        this.getImage(imgSrc, function () {
            
            // save context
            context.save();
            
            // in this context, 'this' is the image
            var img = this,
                diameter = 2 * radius;

            var prop = self.getNewImgProportion(img, diameter, diameter);
            
            getCircle().draw(x, y);
            context.clip();
            
            var pos = self.getImgPosFromCenter(x, y, prop.width, prop.height);
            
            context.drawImage(img, pos.x, pos.y, prop.width, prop.height);
            context.stroke();
            
            // restore contest
            context.restore();
            
            // call completionHandler
            if (completionHandler && typeof completionHandler === "function"){
                completionHandler(self);
            }
        });
    
    };

    
    this.isClicked = function (x, y) {

        var self = this;

        if (isNaN(x) || isNaN(y)){
            throw "Invalid input parameter!";
        }

        var correctX = x > self.x - self.radius && x < self.x + self.radius;
        var correctY = y > self.y - self.radius && y < self.y + self.radius;

        return correctX && correctY;
    };
};

window.CanvasImage.prototype = Object.create(window.ImageHelper.prototype);