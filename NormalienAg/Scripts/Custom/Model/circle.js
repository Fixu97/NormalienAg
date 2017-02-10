window.Circle = function (c, radius, color) {
    "use strict";

    this.c = c;
    this.radius = validateNumber(radius);
    this.color = color;
    
    this.draw = function (x, y) {

        x = validateNumber(x);
        y = validateNumber(y);

        c.beginPath();
        c.arc(x, y,this.radius, 0, Math.PI * 2, true);
        c.closePath();
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
    }
};