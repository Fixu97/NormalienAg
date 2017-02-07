window.Circle = function (c, x, y, radius, color) {
    
    'use strict';
    this.c = c;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    
    this.top = y - radius;
    this.right = x + radius;
    this.bottom = y + radius;
    this.left = x - radius;
    
    this.draw = function(){
        c.beginPath();
        c.arc(x, y,this.radius, 0, Math.PI * 2, true);
        c.closePath();
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
    }
};