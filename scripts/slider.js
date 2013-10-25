
/* Slider class, maintain proper pagination */
function Slider(id, pictStruct, dark) {
	this.id_ = id;
	this.pictStruct_ = pictStruct;
	this.dark_ = dark;
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
	$(page).siblings().attr( "class", "paginationRect unselectedRect" + (this.dark_ ? "Dark" : "Bright"));
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

var thirdPictPerPage = {
	0: 2,
	1: 2,
	2: 2,
	3: 2,
	4: 4,
	5: 3,
};

/* slider instances */
var laptopSlider = new Slider('laptop', laptopPictPerPage, true);
var thirdSlider = new Slider('third', thirdPictPerPage, false);   //TODO nowa kolejność

