
window.CustomImage = function (context, x, y, maxWidth, maxHeight, src) {
    "use strict";
    
    if (!context || typeof (context) !== "object") {
        throw "Invlid parameter 'context'! Expected an object!";
    }
    
    if (x === null || isNaN(x)) {
        throw "Invalid parameter 'x'! Expected a number!";
    }
    
    if (y === null || isNaN(y)) {
        throw "Invalid parameter 'y'! Expected a number!";
    }
    
    if (maxWidth === null || isNaN(maxWidth)) {
        throw "Invalid parameter 'maxWidth'! Expected a number!";
    }
    
    if (maxHeight === null || isNaN(maxHeight)) {
        throw "Invalid parameter 'maxHeight'! Expected a number!";
    }
    
    if (typeof (src) !== "string") {
        throw "Invalid parameter 'src'!";
    }
    
    this.c = context;
    this.x = Number(x);
    this.y = Number(y);
    this.maxWidth = Number(maxWidth);
    this.maxHeight = Number(maxHeight);
    this.imgSrc = src;
    
    
    this.draw = function (completionHandler) {
        var self = this;
        
        this.getImage(src, function () {
            
            // save context
            self.c.save();
            
            // in this context, 'this' is the image
            var img = this,
                prop = self.getNewImgProportion(img, maxWidth, maxHeight),
                pos = self.getImgPosFromCenter(self.x, self.y, prop.width, prop.height);
            
            self.c.drawImage(img, pos.x, pos.y, prop.width, prop.height);
            self.c.stroke();
            
            // restore contest
            self.c.restore();
            
            // call completionHandler
            if (completionHandler && typeof completionHandler === "function") {
                completionHandler(self);
            }
        });
    };
    
};

window.CustomImage.prototype = Object.create(window.ImageHelper.prototype);