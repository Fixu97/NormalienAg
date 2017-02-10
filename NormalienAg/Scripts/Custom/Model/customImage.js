
window.CustomImage = function (context, maxWidth, maxHeight, src) {
    "use strict";
    
    if (!context || typeof (context) !== "object") {
        throw "Invlid parameter 'context'! Expected an object!";
    }
    
    if (typeof (src) !== "string") {
        throw "Invalid parameter 'src'!";
    }
    
    this.c = context;
    this.maxWidth = validateNumber(maxWidth);
    this.maxHeight = validateNumber(maxHeight);
    this.imgSrc = src;
    
    
    this.draw = function (x, y, completionHandler) {
        var self = this;
        
        this.getImage(src, function () {
            
            // save context
            self.c.save();
            
            // in this context, 'this' is the image
            var img = this,
                prop = self.getNewImgProportion(img, maxWidth, maxHeight),
                pos = self.getImgPosFromCenter(x, y, prop.width, prop.height);
            
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