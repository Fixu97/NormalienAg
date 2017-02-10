
window.CanvasManager = function (canvas) {
    "use strict";

    var $canvas = $(canvas);
    var c = canvas.getContext("2d"); // context
    var circleRadius = 250;
    var circleCenter = { x: circleRadius, y: circleRadius };

    this.getCircleCenter = function() {
        return circleCenter;
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

    var validateCanvasImages = function(canvasImages) {
        "use strict";

        if (Object.prototype.toString.call(canvasImages) !== "[object Array]") {
            throw "Parameter canvasImages must be an array!";
        }

        for (var i = 0; i < canvasImages.length; i++) {
            if (!(canvasImages[i] instanceof window.CanvasImage)) {
                throw "Element at position " + i + " is not a canvasImage!";
            }
        }
    }

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
        return Math.cos(angle) * circleRadius + circleRadius;
    }

    var getPosY = function (i, nrOfPoints) {
        "use strict";

        validateParams(i, nrOfPoints);
        var angle = getAngle(i, nrOfPoints);
        return Math.sin(angle) * (-1) * circleRadius + circleRadius;
    }

    var getPositions = function(i, nrOfPoints) {
        return {
            x: getPosX(i, nrOfPoints), 
            y: getPosY(i, nrOfPoints)
        };
    }

    this.draw = function(canvasImages) {
        "use strict";

        validateCanvasImages(canvasImages);

        scaleCanvas();
        c.save();

        for (var i = 0; i < canvasImages.length; i++) {
            var curImg = canvasImages[i];

            c.lineWidth = 2;
            c.beginPath();

            var pos = getPositions(i, canvasImages.length);

            // Set pen on position
            c.moveTo(pos.x, pos.y);

            // Move to position
            c.lineTo(
                circleCenter.x,
                circleCenter.y);

            c.closePath();
            c.stroke();

            curImg.draw(pos.x, pos.y);
        }
        c.restore();
    }

    // add event listener
    $(window).on("resize", scaleCanvas);

}