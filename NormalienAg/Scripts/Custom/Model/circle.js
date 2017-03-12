window.Circle = function (c, x, y, radius, color) {
    "use strict";

    if (!isDefined(c)) {
        throw "Parameter c must be defined!";
    }

    x = validateNumber(x);
    y = validateNumber(y);
    radius = validateNumber(radius);
    color = validateString(color);
    
    this.draw = function (lineWidth) {

        if (typeof (lineWidth) === "undefined") {
            lineWidth = 1;
        } else {
            lineWidth = validateNumber(lineWidth);
        }

        var previousLineWidth = c.lineWidth;
        var previousStrokeStyle = c.strokeStyle;

        c.lineWidth = lineWidth;
        c.fillStyle = color;
        c.strokeStyle = color;

        c.beginPath();
        c.arc(x, y, radius, 0, Math.PI * 2, true);
        c.closePath();
        c.fill();
        c.stroke();

        // reset config
        c.lineWidth = previousLineWidth;
    }
};