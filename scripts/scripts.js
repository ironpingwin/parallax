

var CENTRAL_SQUARE_SHIFT = 104;
var LAPTOP_HALF_WIDTH = 440;
var SLIDER_CENTER_DIST = 600;

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

$( document ).ready(function() {
	$('#aFirst').click(scrollToClick);
	$('#aSecond').click(scrollToClick);
	$('#aThird').click(scrollToClick);
	
	var center = $(document).width() / 2;
	var left = ($(document).width() - $('#centralSquare').width()) / 2 + CENTRAL_SQUARE_SHIFT;
	$('#centralSquare').css('left', left + 'px');
	
	$('#laptopSlider').slidesjs({
		width: 744,
		height: 468
	});
	

	// remember initial class values
	rectTurnLeftWidth = $('.rectTurnLeft').css("width"); 
	rectTurnLeftHeight = $('.rectTurnLeft').css("height");
	rectPictMarginTop = $('.rectPict').css("margin-top");
});




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

Slider.prototype.pageClickByNo = function() {
	var pageNo = this.findPage(this.activePicture_);
	var child = $('#' + this.id_ + "Text .pagination").children()[pageNo];
	this.highlightPage(child);	
}

// click on apriopriate page in slider given as div
Slider.prototype.pageClick = function(clicked) {
	var childNo = 0;
	for (c in $(clicked).parent().children()) {		// find number of clicked page
		if ($(clicked).parent().children()[c] == clicked) {
			break;
		}
		++childNo;
	}
	
	var pictNo = this.findPict(childNo);
	this.activePicture_ = pictNo;
	$('#' + this.id_ + 'Slider' + ' .slidesjs-pagination a')[pictNo].click();
	this.highlightPage(clicked);
}


//TODO trzeba klasę zrobić na te slidery bo będzie ich kilka
// Klasa już jest tylko trzeba ją dobrze uzupełnić o IDki i inne wspólne rzeczy
// już działa tylko jak się klika szybciej niż przewija, to jest błąd...
// prznieść slidera do oddzielnego pliku


/* Number of pictures per single page */
var laptopPictPerPage = {
	0: 2,
	1: 3,
	2: 2,
	3: 1,
};

var laptopSlider = new Slider('laptop', laptopPictPerPage);




var rectTurnLeftLeft;
var rectTurnLeftTop;

function zoomInRect(rect) {
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
	
/*	$(rect).parent().parent().css("width", "400px");
	$(rect).parent().parent().css("height", "400px");	
	
	$(rect).parent().css("width", "400px");
	$(rect).parent().css("height", "400px");	*/	
}

function zoomOutRect(rect) {
	rect.width = 230;
	rect.height = 230;
	
	$(rect).parent().parent().parent().css("width", rectTurnLeftWidth);
	$(rect).parent().parent().parent().css("height", rectTurnLeftHeight);
	
	$(rect).parent().parent().parent().css("left", rectTurnLeftLeft);
	$(rect).parent().parent().parent().css("top", rectTurnLeftTop);
	
	$(rect).css("margin-top", rectPictMarginTop);
	$(rect).parent().parent().parent().css("z-index", "1");
	
}

