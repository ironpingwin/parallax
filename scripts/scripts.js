

var CENTRAL_SQUARE_SHIFT = 104;
var LAPTOP_HALF_WIDTH = 440;
var SLIDER_CENTER_DIST = 600;
var SLIDER_WIDTH = 744;
var SLIDER_HEIGHT = 468;

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
// do testów te dwa obiekty
var imgGray;
var imgColor;

$( document ).ready(function() {
	// add slow scroll on link click
	$('#menu').delegate('a', 'click', scrollToClick);
	$('#tiles').delegate('a', 'click', scrollToClick);

	
	var center = $(document).width() / 2;
	var left = ($(document).width() - $('#centralSquare').width()) / 2 + CENTRAL_SQUARE_SHIFT;
	$('#centralSquare').css('left', left + 'px');
	
	$('#laptopSlider').slidesjs({
		width: SLIDER_WIDTH,
		height: SLIDER_HEIGHT
	});
    
    $('#thirdSlider').slidesjs({
        width: SLIDER_WIDTH,
        height: SLIDER_HEIGHT
    });    
	

	// remember initial class values
	rectTurnLeftWidth = $('.rectTurnLeft').css("width"); 
	rectTurnLeftHeight = $('.rectTurnLeft').css("height");
	rectPictMarginTop = $('.rectPict').css("margin-top");
	
// 	var imgObj = document.getElementById('pict1');
// 	var arr = grayscaleImage(imgObj);
// 	imgObj.src = arr[0];
// 	imgColor = arr[1];
// 	imgGray = arr[0];
// 	
// 	var arr = document.getElementsByClassName('rectPict');
// 	for (i in arr) {
// 		var p = arr[i];
// 		var pics = grayscaleImage(p);
// 		tiles[p.src] = pics[0];
// 		tiles[p.src + '_Big'] = pics[1];
// 	}
});

// $( window ).resize(function() {
// 	if ($(window).width() < SLIDER_WIDTH) {
// 		$('#laptopSlider').slidesjs({
// 			width: $(window).width(),
// 			height: $(window).width() / SLIDER_WIDTH * SLIDER_HEIGHT
// 		});
// 	}
// });



function Slider(id, pictStruct) {
	this.id_ = id;
	this.pictStruct_ = pictStruct;
	this.activePicture_ = 0;	

	this.pictures_ = 0;
	for (var i in this.pictStruct_) {
		this.pictures_ += this.pictStruct_[i];
	}
}

Slider.prototype.prevPict = function() {
	$('#' + this.id_ + 'SliderLeft' + 'Dummy').click();
	this.activePicture_--;
	if (this.activePicture_ < 0)
		this.activePicture_ = this.pictures_ -1;
	this.pageClickByNo();
	return false;
}

Slider.prototype.nextPict = function() {
	$('#' + this.id_ + 'SliderRight' + 'Dummy').click();
	this.activePicture_++;
	if (this.activePicture_ == this.pictures_)
		this.activePicture_ = 0;
	this.pageClickByNo();
	return false;
}

/* Counts page number per given picture number.
* One page contains few pictures.
*/
Slider.prototype.findPage = function(number) {
	var p = 0;
	var pictNo = 0;
	for (var i in this.pictStruct_) {
		pictNo += this.pictStruct_[i];
		if (number < pictNo)
			break;
		p += 1;
	}

	return p;
}

/* Counts number of picture which represent given page */
Slider.prototype.findPict = function(pageNo) {
	var pictNo = 0;
	for (var i=0; i<pageNo; ++i) {
		pictNo += this.pictStruct_[i];
	}
	return pictNo;
}

Slider.prototype.highlightPage = function(page) {
	$(page).siblings().attr( "class", "paginationRect unselectedRectDark");
	$(page).attr( "class", "paginationRect selectedRect");
}

Slider.prototype.showText = function(page) {
	$('#' + this.id_ + 'Text .descriptions div').each(function(index) {
		if (index == page)
			$( this ).show();
		else
			$(this).hide();
	});	
}

Slider.prototype.pageClickByNo = function() {
	var pageNo = this.findPage(this.activePicture_);
	var child = $('#' + this.id_ + "Text .pagination").children()[pageNo];
	this.highlightPage(child);
	this.showText(pageNo);
}

// click on apriopriate page in slider given as div
Slider.prototype.pageClick = function(clicked) {
	var pageNo = 0;
	for (c in $(clicked).parent().children()) {		// find number of clicked page
		if ($(clicked).parent().children()[c] == clicked) {
			break;
		}
		++pageNo;
	}
	
	var pictNo = this.findPict(pageNo);
	this.activePicture_ = pictNo;
	$('#' + this.id_ + 'Slider' + ' .slidesjs-pagination a')[pictNo].click();
	this.highlightPage(clicked);
	this.showText(pageNo);
}


//TODO trzeba klasę zrobić na te slidery bo będzie ich kilka
// Klasa już jest tylko trzeba ją dobrze uzupełnić o IDki i inne wspólne rzeczy
// już działa tylko jak się klika szybciej niż przewija, to jest błąd...
// prznieść slidera do oddzielnego pliku


/* Number of pictures per single page */
var laptopPictPerPage = {
	0: 2,
	1: 2,
	2: 2,
	3: 2,
	4: 4,
	5: 3,
	6: 4
};

var laptopSlider = new Slider('laptop', laptopPictPerPage);
var thirdSlider = new Slider('third', laptopPictPerPage);   //TODO nowa kolejność



var rectTurnLeftLeft;
var rectTurnLeftTop;

function zoomInRect(container) {
	rect = $(container).children('img')[0];		// get child img object
	
	rect.width = 380;
	rect.height = 380;
	
// 	rect.src = imgColor;
// 	$(rect).attr("src", "pict/rect1.png");
	
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
	
	rect.width = 230;
	rect.height = 230;
	
// 	rect.src = imgGray;

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

