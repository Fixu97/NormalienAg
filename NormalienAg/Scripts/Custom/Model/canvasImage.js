window.CanvasImage = function (context, x, y, radius, imgSrc) {
    'use strict';
    
    this.c = context;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.imgSrc = imgSrc;
    
    this.getCircle = function () {
        var circle = new Circle(this.c, this.x, this.y, this.radius, "red");
        return circle;
    };
    
    this.draw = function (completionHandler) {
        
        // Get save instance of 'this'
        var self = this;
        
        // asynchronos call
        this.getImage(this.imgSrc, function () {
            
            // save context
            self.c.save();
            
            // in this context, 'this' is the image
            var img = this,
                diameter = 2 * self.radius;
            
            var prop = self.getNewImgProportion(img, diameter, diameter)
            
            self.getCircle().draw();
            self.c.clip();
            
            var pos = self.getImgPosFromCenter(self.x, self.y, prop.width, prop.height);
            
            self.c.drawImage(img, pos.x, pos.y, prop.width, prop.height);
            self.c.stroke();
            
            // restore contest
            self.c.restore();
            
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