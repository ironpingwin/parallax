

$(function(){
	$.stellar({
		horizontalScrolling: false,
		verticalOffset: 40
	});
});

function scrollToClick(e) {
	var hash = this.hash;
	$('html,body').scrollTo(this.hash, this.hash);
	e.preventDefault();	
}

$( document ).ready(function() {
	$('#aFirst').click(scrollToClick);
	$('#aSecond').click(scrollToClick);
	$('#aThird').click(scrollToClick);
});
