window.Site = function (title, url) {
    "use strict";

    title = validateString(title);
    
    if (typeof (url) !== "string") {
        url = null;
    }

    var x = 0; // horizontal center of text
    var y = 0; // vertical top
    var width = 0;
    var fontSize = 0;
    var font = "Calibri"

    this.getX = function () {
        return x;
    };
    this.setX = function (posX) {
        x = validateNumber(posX);
    };
    this.getY = function () {
        return y;
    };
    this.setY = function (posY) {
        y = validateNumber(posY);
    };
    this.getWidth = function () {
        return width;
    };
    this.setWidth = function (w) {
        width = validateNumber(w);
    };
    this.getFontSize = function () {
        return fontSize;
    };
    this.setFontSize = function (fs) {
        fontSize = validateNumber(fs);
    };

    this.getDisplayTitle = function () {
        return "- " + title;
    };
    this.getUrl = function () {
        return url;
    };
    this.getFont = function () {
        return fontSize + "px " + font;
    }


    this.isAtPosition = function (mouseX, mouseY) {
        mouseX = validateNumber(mouseX);
        mouseY = validateNumber(mouseY);

        var correctX = mouseX >= x - 0.5 * width && mouseX <= x + 0.5 * width;
        var correctY = mouseY >= y - fontSize && mouseY <= y;

        return correctX && correctY;
    };
};