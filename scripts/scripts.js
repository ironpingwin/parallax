

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
	
	$('#laptopSliderLeft').click(function() {
		$('#laptopSliderLeftDummy').click();
		return false;
    });
	
	$('#laptopSliderRight').click(function() {
		$('#laptopSliderRightDummy').click();
		return false;
    });

});

// click on apriopriate page in slider given as div
function pageClick(div, number, clicked) {
	$('#' + div + ' .slidesjs-pagination a')[number].click();
	$(clicked).siblings().attr( "class", "paginationRect unselectedRectDark");
	$(clicked).attr( "class", "paginationRect selectedRect");
}

