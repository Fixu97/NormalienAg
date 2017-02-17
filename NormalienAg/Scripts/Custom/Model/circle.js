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
            lineWidth = 2;
        } else {
            lineWidth = validateNumber(lineWidth);
        }

        var previousLineWidth = c.lineWidth;

        c.lineWidth = lineWidth;
        c.beginPath();
        c.arc(x, y, radius, 0, Math.PI * 2, true);
        c.closePath();
        c.fillStyle = color;
        c.fill();
        c.stroke();
        c.lineWidth = previousLineWidth;
    }
};