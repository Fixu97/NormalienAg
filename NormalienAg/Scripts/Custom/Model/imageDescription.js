window.ImageDescription = function (title, subSites) {
    "use strict";

    title = validateString(title);
    var $descContainer = $("#descriptionContainer");
    
    if (!isArray(subSites)) {
        throw "Parameter subSites must be an array!";
    }

    this.print = function(){

        $descContainer.empty();

        $descContainer.append("<h3>" + title + "</h3>");
        var $list = $("<ul style='list-style-type:none'></ul>");

        for (var i = 0; i < subSites.length; i++){
            $list.append("<li> - " + subSites[i] + "</li>");
        }

        $descContainer.append($list);
    }
}