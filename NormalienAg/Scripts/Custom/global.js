$(window).on("load", function () {
    
    // Get canvas
    canvas = document.getElementById("canvas");
    $canvas = $(canvas);

    canvasManager = new CanvasManager(canvas);
    
    // Draw elements
    drawCanvas();
});

drawCanvas = function () {

    var circleRadius = 50;
    var cImages = [
            new CanvasImage(canvas, circleRadius, "/Content/Img/drehbank.jpg"),
            new CanvasImage(canvas, circleRadius, "/Content/Img/cnc.jpg"),
            new CanvasImage(canvas, circleRadius, "/Content/Img/team.jpg"),
            new CanvasImage(canvas, circleRadius, "/Content/Img/werkzeuge.jpg"),
            new CanvasImage(canvas, circleRadius, "/Content/Img/teil1.jpg"),
            new CanvasImage(canvas, circleRadius, "/Content/Img/building.jpg")
    ];

    canvasManager.draw(cImages);

    return;
    //resizeCanvas();
    
    //var canvas = canvas.getContext("2d");
    //scaleCanvas();
    //canvas.save();
        
    //var circleRadius = 50;
    //var cImages = [
    //        new CanvasImage(canvas, 294, 50, circleRadius, "/Content/Img/drehbank.jpg"),
    //        new CanvasImage(canvas, 538, 174, circleRadius, "/Content/Img/cnc.jpg"),
    //        new CanvasImage(canvas, 439, 450, circleRadius, "/Content/Img/team.jpg"),
    //        new CanvasImage(canvas, 149, 450, circleRadius, "/Content/Img/werkzeuge.jpg"),
    //        new CanvasImage(canvas, 51, 174, circleRadius, "/Content/Img/teil1.jpg"),
    //        new CanvasImage(canvas, 294, 250, circleRadius, "/Content/Img/building.jpg")
    //    ];
    
    //    for(var i = 0; i < cImages.length; i++){
    //        var curImg = cImages[i];
            
    //        canvas.lineWidth = 2;
    //        canvas.beginPath();
    //        canvas.moveTo(curImg.x, curImg.y);
    //        canvas.lineTo(294,250);
    //        canvas.closePath();
    //        canvas.stroke();
                
    //        curImg.draw();
    //    }
    
    //canvas.restore();
}


validateNumber = function (nr) {
    "use strict";

    if (isNaN(nr)) {
        throw "Expected parameter to be a number!";
    }

    return Number(nr);
}