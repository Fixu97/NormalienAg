
window.CanvasManager = function (canvas, pictoRadius, centerImageUrl, imageUrls) {
    "use strict";

    var $canvas = $(canvas);
    var c = canvas.getContext("2d"); // context
    var pictoRadius = validateNumber(pictoRadius);
    
    var scaleCanvas = function () {

        var width = 588;
        var height = 500;

        var parentWidth = $canvas.parent().width();

        var aspectRatio = parentWidth / width;

        if (aspectRatio >= 1) {
            canvas.width = width;
            canvas.height = height;
            return;
        }

        canvas.width = width * aspectRatio;
        canvas.height = height * aspectRatio;

        var c = canvas.getContext("2d");
        c.scale(aspectRatio, aspectRatio);
    }
    var getRadius = function () {

        if (!isDefined(canvas)){
            throw "Parameter canvas must be defined!";
        }

        var width = $canvas.width();
        var height = $canvas.height();
        var diameter = 0;

        if (width > height) {
            diameter = height;
        } else {
            diameter = width;
        }

        return validateNumber(diameter) / 2 - (pictoRadius * 1.5);
    }
    var getCenter = function () {

        if (!isDefined(canvas)) {
            throw "Parameter canvas must be defined!";
        }

        var width = $canvas.width();
        var height = $canvas.height();

        return { x: width / 2, y: height / 2 };
    }

    var validateParams = function (i, nrOfPoints) {
        "use strict";

        if (isNaN(i) || i < 0) {
            throw "Expected parameter i to be a number >= 0!";
        }
        if (isNaN(nrOfPoints) || nrOfPoints < 0) {
            throw "Expected parameter nrOfPoints to be a number >= 0!";
        }

        if (i >= nrOfPoints) {
            throw "Parameter i must be smaller than nrOfPoints!";
        }
    }
    var getAngle = function (i, nrOfPoints) {
        "use strict";

        validateParams(i, nrOfPoints);

        // start at 90 degrees => Math.PI / 2
        // go around counter-clockwise => i * (Math.PI * 2 / nrOfPoints)
        return i * (Math.PI * 2 / nrOfPoints) + Math.PI / 2;

    }

    var getPosX = function (i, nrOfPoints) {
        "use strict";

        validateParams(i, nrOfPoints);
        var angle = getAngle(i, nrOfPoints);
        return Math.cos(angle) * circleRadius + circleCenter.x;
    }
    var getPosY = function (i, nrOfPoints) {
        "use strict";

        validateParams(i, nrOfPoints);
        var angle = getAngle(i, nrOfPoints);
        return Math.sin(angle) * (-1) * circleRadius + circleCenter.y;
    }
    var getPositions = function (i, nrOfPoints) {
        return {
            x: getPosX(i, nrOfPoints),
            y: getPosY(i, nrOfPoints)
        };
    }
    var getCanvasImage = function (x, y, imgUrl) {
        return new CanvasImage(canvas, x, y, pictoRadius, imgUrl);
    }
    var getCanvasImages = function () {

        if (!isArray(imageUrls)) {
            throw "Parameter imageUrls must be an array!";
        }

        var canvasImages = [];
        for (var i = 0; i < imageUrls.length; i++) {

            var pos = getPositions(i, imageUrls.length);

            canvasImages.push(getCanvasImage(pos.x, pos.y, imageUrls[i]));
        }

        return canvasImages;
    }

    // initialize canvas
    scaleCanvas();
    
    var circleRadius = getRadius();
    var circleCenter = getCenter();
    var centerImage = getCanvasImage(circleCenter.x, circleCenter.y, centerImageUrl);
    var canvasImages = getCanvasImages();
    
    this.draw = function() {
        "use strict";

        scaleCanvas();
        c.save();

        for (var i = 0; i < canvasImages.length; i++) {
            var curImg = canvasImages[i];

            c.lineWidth = 2;
            c.beginPath();

            // Set pen on position
            c.moveTo(curImg.getX(), curImg.getY());

            // Move to position
            c.lineTo(
                circleCenter.x,
                circleCenter.y);

            c.closePath();
            c.stroke();

            curImg.draw();
        }
        centerImage.draw();
        c.restore();
    }

    var hoveredImage = null;

    var hoverAction = function (e) {
        "use strict";

        var curHoveredImg = null
        for (var i = 0; i < canvasImages.length; i++) {

            var curImg = canvasImages[i];

            if (!curImg.isAtPosition(e.offsetX, e.offsetY)) {
                continue;
            }
            curHoveredImg = curImg;
        }

        if (curHoveredImg === null && centerImage.isAtPosition(e.offsetX, e.offsetY)) {
            curHoveredImg = centerImage;
        }

        // No image is being hovered
        if (curHoveredImg === null && hoveredImage === null) {
            return;
        }

        // A new img is being hovered
        if (curHoveredImg !== null && (hoveredImage === null || hoveredImage !== curHoveredImg)) {
            curHoveredImg.draw(pictoRadius * 1.2);
            hoveredImage = curHoveredImg;
            return;
        }

        // An img is not hovered anymore
        if (curHoveredImg === null && hoveredImage !== null) {
            hoveredImage = null;
            self.draw() ;
        }
    }
    var clickAction = function (e) {
        "use strict";

        for (var i = 0; i < canvasImages.length; i++) {

            var curImg = canvasImages[i];

            if (!curImg.isAtPosition(e.offsetX, e.offsetY)) {
                continue;
            }
            console.log("CanvasImage is being clicked!");
        }
    }

    // add event listener
    var self = this;
    $(window).on("resize", self.draw);
    $(canvas).mousemove($.proxy(hoverAction, self));
    $(canvas).click($.proxy(clickAction, self));

}