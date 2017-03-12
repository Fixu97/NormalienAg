window.CanvasConfig = function () {

    this.width = 750; // width of the canvas
    this.height = 750; // height of the canvas

    this.pictoRadius = (this.width < this.height ? this.width / 10 : this.height / 10); // the radius of the bubbles (images)
    this.hoverFactor = 2; // the expansion-factor for the hovered bubbles

    this.borderWidth = 2; // the width of the bubble borders
    this.borderHoveredWidth = 4;
    this.borderColor = "rgba(150, 150, 150, 0.8)";

    this.pictoHoverColor = "rgba(150, 150, 150, 0.8)";
    this.descriptionTextBorderColor = "black";
    this.descriptionTextFillColor = "white";


}