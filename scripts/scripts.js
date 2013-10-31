

var CENTRAL_SQUARE_SHIFT = 104;
var LAPTOP_SLIDER_WIDTH = 744;
var LAPTOP_SLIDER_HEIGHT = 468;
var TV_SLIDER_WIDTH = 700;
var TV_SLIDER_HEIGHT = 394;

var SLIDER_HEIGHT = 450;
var SLIDER_WIDTH = 900;

// $(function(){
// 	$.stellar({
// 		horizontalScrolling: false,
// 		verticalOffset: 40
// 	});
// });

function scrollToClick(e) {
	var hash = this.hash;
	$('html,body').scrollTo(this.hash, this.hash);
	e.preventDefault();	
}

var rectTurnLeftWidth;
var rectTurnLeftHeight;
var rectPictMarginTop;

var tiles = {};


$( document ).ready(function() {
	// add slow scroll on link click
	$('#menu').delegate('a', 'click', scrollToClick);
	$('#tiles').delegate('a', 'click', scrollToClick);

	
	var center = $(document).width() / 2;
	var left = ($(document).width() - $('#centralSquare').width()) / 2 + CENTRAL_SQUARE_SHIFT;
	$('#centralSquare').css('left', left + 'px');
	
	$('#laptopSlider').slidesjs({
		width: LAPTOP_SLIDER_WIDTH,
		height: LAPTOP_SLIDER_HEIGHT
	});
    
    $('#thirdSlider').slidesjs({
        width: SLIDER_WIDTH,
        height: SLIDER_HEIGHT
    });    

    $('#fourthSlider').slidesjs({
        width: SLIDER_WIDTH,
        height: SLIDER_HEIGHT
    });
	
    $('#fifthSlider').slidesjs({
        width: SLIDER_WIDTH,
        height: SLIDER_HEIGHT
    });
	
    $('#sixthSlider').slidesjs({
        width: TV_SLIDER_WIDTH,
        height: TV_SLIDER_HEIGHT
    });

    $('#seventhSlider').slidesjs({
        width: SLIDER_WIDTH,
        height: SLIDER_HEIGHT
    });

	// remember initial class values
	rectTurnLeftWidth = $('.rectTurnLeft').css("width"); 
	rectTurnLeftHeight = $('.rectTurnLeft').css("height");
	rectPictMarginTop = $('.rectPict').css("margin-top");
	
	
// 	var arr = document.getElementsByClassName('rectPict');
// 	for (i in arr) {
// 		var p = arr[i];
// 		var pics = grayscaleImage(p);
// // 		var name = path(p.src);
// 		tiles[p.id] = pics[0];
// 		tiles[p.id + '_Big'] = pics[1];
// 	}
});

// $( window ).resize(function() {
// 	if ($(window).width() < LAPTOP_SLIDER_WIDTH) {
// 		$('#laptopSlider').slidesjs({
// 			width: $(window).width(),
// 			height: $(window).width() / LAPTOP_SLIDER_WIDTH * LAPTOP_SLIDER_HEIGHT
// 		});
// 	}
// });






var rectTurnLeftLeft;
var rectTurnLeftTop;

function zoomInRect(container) {
	rect = $(container).children('img')[0];		// get child img object
// 	rect.src = tiles[rect.id + "_Big"];
	
	rect.width = 380;
	rect.height = 380;
	
	$(rect).parent().parent().parent().css("width", "260px");
	$(rect).parent().parent().parent().css("height", "260px");

	rectTurnLeftLeft = $(rect).parent().parent().parent().css("left");
	rectTurnLeftTop = $(rect).parent().parent().parent().css("top");
	$(rect).parent().parent().parent().css("left", parseInt(rectTurnLeftLeft) - 50 + "px");
	$(rect).parent().parent().parent().css("top", parseInt(rectTurnLeftTop) - 50 + "px");
	
	$(rect).css("margin-top", "-70px");
	$(rect).parent().parent().parent().css("z-index", "10");
	
	$(rect).siblings().show();
}

function zoomOutRect(container) {
	rect = $(container).children('img')[0];		// get child img object
// 	rect.src = tiles[rect.id];
	
	rect.width = 230;
	rect.height = 230;
	

	$(rect).parent().parent().parent().css("width", rectTurnLeftWidth);
	$(rect).parent().parent().parent().css("height", rectTurnLeftHeight);
	
	$(rect).parent().parent().parent().css("left", rectTurnLeftLeft);
	$(rect).parent().parent().parent().css("top", rectTurnLeftTop);
	
	$(rect).css("margin-top", rectPictMarginTop);
	$(rect).parent().parent().parent().css("z-index", "1");
	
	$(rect).siblings().hide();
}








// TODO 
// Trzeba sprawdzić z nowym google-chromem bo w starej wersji jest błąd przy pobieraniu obiektu Image ze strony
function grayscaleImage(imgObj)
{
	var canvas = document.createElement('canvas');
	var canvasContext = canvas.getContext('2d');
	
	var canvasBig = document.createElement('canvas');
	var canvasContextBig = canvasBig.getContext('2d');
	
	var imgW = 460;// imgObj.width;
	var imgH = 460;// imgObj.height;
	canvas.width = imgW;
	canvas.height = imgH;
	
	canvasBig.width = imgW;
	canvasBig.height = imgH;
	canvasContextBig.drawImage(imgObj, 0, 0);
	
	canvasContext.drawImage(imgObj, 0, 0);
	var imgPixels = canvasContext.getImageData(0, 0, imgW, imgH);
	
	for(var y = 0; y < imgPixels.height; y++){
		for(var x = 0; x < imgPixels.width; x++){
			var i = (y * 4) * imgPixels.width + x * 4;
			var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
			imgPixels.data[i] = avg; 
			imgPixels.data[i + 1] = avg; 
			imgPixels.data[i + 2] = avg;
		}
	}
	
	canvasContext.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
	
// 		imgObj.src = canvas.toDataURL();
//         return canvas.toDataURL();
	return [canvas.toDataURL(), canvasBig.toDataURL()];
}  

