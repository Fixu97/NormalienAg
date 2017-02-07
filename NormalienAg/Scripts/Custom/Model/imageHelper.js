window.ImageHelper = function () {
    "use strict";
    
};

window.ImageHelper.prototype = {
    
    getImgPosFromCenter: function (centerX, centerY, width, height) {
        "use strict";
        
        var pos = {};
        
        pos.x = centerX - 0.5 * width;
        pos.y = centerY - 0.5 * height;
        
        return pos;
    },
    
    getNewImgProportion: function (img, maxWidth, maxHeight) {
        "use strict";
        
        if (!img || typeof img !== "object" || !(img instanceof Image)) {
            throw "Invalid paramteter img!";
        }
        
        if (isNaN(maxWidth)) {
            throw "Invalid parameter maxWidth!";
        }
        maxWidth = Number(maxWidth);
        
        if (isNaN(maxHeight)) {
            throw "Invalid parameter maxHeight!";
        }
        maxHeight = Number(maxHeight);
        
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
    },
    
    getImage: function (src, successHandler, errorHandler) {
        "use strict";
        var img = new Image();
        img.onload = successHandler;
        img.onerror = errorHandler;
        img.src = src;
    }
};