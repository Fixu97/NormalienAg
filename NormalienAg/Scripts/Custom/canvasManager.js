
window.CanvasManager = function (canvas, pictoRadius, hoverFactor, centerImage, canvasImages) {
    "use strict";

    var $canvas = $(canvas);
    var c = canvas.getContext("2d"); // context
    pictoRadius = validateNumber(pictoRadius);
    hoverFactor = validateNumber(hoverFactor);
    
    var scaleCanvas = function () {

        var width = 750;
        var height = 750;

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

        return validateNumber(diameter) / 2 - (pictoRadius * hoverFactor);
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

    // initialize canvas
    scaleCanvas();
    
    var circleRadius = getRadius();
    var circleCenter = getCenter();

    var setCanvasImagesPositions = function () {

        // Input validation
        if (!isDefined(centerImage) || !(centerImage instanceof CanvasImage)) {
            throw "centerImage is not defined or of the wrong type!";
        }

        if (!isDefined(canvasImages) || !isArray(canvasImages)) {
            throw "canvasImages is not defined or not an array!";
        }

        // Set position of center image
        centerImage.setX(circleCenter.x);
        centerImage.setY(circleCenter.y);

        // Set position of circle images
        for (var i = 0; i < canvasImages.length; i++) {
            var curCImage = canvasImages[i];

            var curPos = getPositions(i, canvasImages.length);
            curCImage.setX(curPos.x);
            curCImage.setY(curPos.y);
        }
    }
    
    this.draw = function() {
        "use strict";

        scaleCanvas();
        c.save();

        for (var i = 0; i < canvasImages.length; i++) {
            var curImg = canvasImages[i];

            c.lineWidth = 0.5;
            c.beginPath();

            // Set pen on position
            c.moveTo(
                curImg.getX(),
                curImg.getY());

            // Move to position
            c.lineTo(
                circleCenter.x,
                circleCenter.y);

            c.closePath();
            c.stroke();

            // Pass impossible coordinates so nothing will get hovered
            curImg.draw(Number.MIN_VALUE, Number.MIN_VALUE);
        }
        centerImage.draw(Number.MIN_VALUE, Number.MIN_VALUE);
        c.restore();
    }

    var hoveredImage = null;

    var hoverAction = function (e) {
        "use strict";

        var curHoveredImg = null;
        var curHoveredImgIndex = 0;
        for (var i = 0; i < canvasImages.length; i++) {

            var curImg = canvasImages[i];

            if (!curImg.isAtPosition(e.offsetX, e.offsetY)) {
                continue;
            }
            curHoveredImg = curImg;
            curHoveredImgIndex = i;
            break;
        }
        
        var position = null;
        if (curHoveredImg === null && centerImage.isAtPosition(e.offsetX, e.offsetY)) {
            curHoveredImg = centerImage;
            position = circleCenter;
        } else {
            position = getPositions(curHoveredImgIndex, canvasImages.length);
        }

        // No image is being hovered
        if (curHoveredImg === null && hoveredImage === null) {
            return;
        }

        // The same img is being hovered
        if (curHoveredImg !== null && hoveredImage !== null && hoveredImage === curHoveredImg) {
            curHoveredImg.draw(e.offsetX, e.offsetY);
            return;
        }

        // An img is not hovered anymore
        if (curHoveredImg === null || curHoveredImg !== null && hoveredImage !== null && curHoveredImg !== hoveredImage) {
            hoveredImage = null;
            self.draw();
            $canvas.css("cursor", "default");
            return;
        }

        // A new img is being hovered
        if (curHoveredImg !== null && (hoveredImage === null || hoveredImage !== null && curHoveredImg !== hoveredImage)) {

            curHoveredImg.draw(e.offsetX, e.offsetY);
            $canvas.css("cursor", "pointer");
            hoveredImage = curHoveredImg;

            return;
        }
    }
    var clickAction = function (e) {
        "use strict";

        var clickedImg = null;
        for (var i = 0; i < canvasImages.length; i++) {

            var curImg = canvasImages[i];

            if (curImg.isAtPosition(e.offsetX, e.offsetY)) {
                console.log("CanvasImage is being clicked!");
                curImg.openSite(e.offsetX, e.offsetY);
                return;
            }
        }

        if (centerImage.isAtPosition(e.offsetX, e.offsetY)) {
            console.log("CenterImage is being clicked!");
            centerImage.openSite(e.offsetX, e.offsetY);
        }
    }

    // set position of images on canvas
    setCanvasImagesPositions();

    // add event listener
    var self = this;
    $(window).on("resize", self.draw);
    $(canvas).mousemove($.proxy(hoverAction, self));
    $(canvas).click($.proxy(clickAction, self));

}