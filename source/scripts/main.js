var scroll_duration = 1000;
var slide_index = 1;
window.onscroll = function() {scrollEvent()};
window.onload = function(){
	document.getElementById("home_link").addEventListener("click", smoothScrollEventHead);
	document.getElementById("contact_link").addEventListener("click", smoothScrollEventContact);
	document.getElementById("about_link").addEventListener("click", smoothScrollEventAbout);
	document.getElementById("videos_link").addEventListener("click", smoothScrollEventVideos);
	showSlides(slide_index);
	document.getElementById("prev_button").addEventListener("click", prevSlides);
	document.getElementById("modal_pic_btn").addEventListener("click", displayModal);
	document.getElementsByClassName("close_modal")[0].addEventListener("click", closeModal);
	document.getElementbyId("next_button").addEventListener("click", nextSlides);
}

function scrollEvent(){
	var videosLocation = document.getElementById("videos").getBoundingClientRect().top + window.scrollY;
	var aboutLocation = document.getElementById("about").getBoundingClientRect().top + window.scrollY;
	var contactLocation = document.getElementById("contact").getBoundingClientRect().top + window.scrollY;
	if (document.body.scrollTop > 0 )
	{
		for(var i = 0; i < 4; i++){
			document.getElementsByTagName("li")[i].style.padding= "10px 40px 5px 40px";
			document.getElementsByTagName("li")[i].style.fontSize= "15px";
		}

		if(document.body.scrollTop + 150 >= videosLocation && document.body.scrollTop +150 < aboutLocation){
			document.getElementsByTagName("li")[2].style.borderBottom = "3px solid #ccc";
			document.getElementsByTagName("li")[1].style.borderBottom = "";
			document.getElementsByTagName("li")[0].style.borderBottom = "";
		}
		else if(document.body.scrollTop+150 >= aboutLocation && document.body.scrollTop + 150 < contactLocation){
			document.getElementsByTagName("li")[1].style.borderBottom = "3px solid #ccc";
			document.getElementsByTagName("li")[0].style.borderBottom = "";
			document.getElementsByTagName("li")[2].style.borderBottom = "";
		}
		else if(document.body.scrollTop + 150 >= contactLocation){
			document.getElementsByTagName("li")[0].style.borderBottom = "3px solid #ccc";
			document.getElementsByTagName("li")[1].style.borderBottom = "";
			document.getElementsByTagName("li")[2].style.borderBottom = "";
		}
	}
	else
	{
		for(var i = 0; i < 4; i++){
			document.getElementsByTagName("li")[i].style.padding= "";
			document.getElementsByTagName("li")[i].style.fontSize= "";
		}
		document.getElementsByTagName("li")[0].style.borderBottom = "";
		document.getElementsByTagName("li")[1].style.borderBottom = "";
		document.getElementsByTagName("li")[2].style.borderBottom = "";
	}
}
function smoothScrollEventHead(){
	smoothScrollEvent(document.getElementById("head"));
}
function smoothScrollEventContact(){
	smoothScrollEvent(document.getElementById("contact"));
}
function smoothScrollEventAbout(){
	smoothScrollEvent(document.getElementById("about"));
}
function smoothScrollEventVideos(){
	smoothScrollEvent(document.getElementById("videos"));
}

//Implementation took inspiration from 
//https://coderwall.com/p/hujlhg/smooth-scrolling-without-jquery
function smoothScrollEvent(id){
	var currentPos = document.body.scrollTop;
	var idLocation = id.getBoundingClientRect().top + window.scrollY;
    var end_time = Date.now() + scroll_duration;
    var distance = idLocation - currentPos;
    smoothScroll(Date.now(), end_time, currentPos, distance);
}

//interpolation taken from wikipedia http://en.wikipedia.org/wiki/Smoothstep
function smooth_step(start, end, point){
	if(point <= start) { 
		return 0; 
	}
    else if(point >= end) { 
    	return 1; 
    }
    var x = (point - start) / (end - start);
    return x*x*(3 - 2*x);
}
function smoothScroll(start_time, end_time, currentPos, distance){
	var previous_top = document.body.scrollTop;
        var scroll_frame = function() {
            if(document.body.scrollTop != previous_top) {
                return;
            }
            var now = Date.now();
            var point = smooth_step(start_time, end_time, now);
            var frameTop = Math.round(currentPos + (distance * point));
            document.body.scrollTop = frameTop;
            if(now >= end_time) {
                return;
            }
            if(document.body.scrollTop === previous_top
                && document.body.scrollTop !== frameTop) {
                return;
            }
            previous_top = document.body.scrollTop;
            setTimeout(scroll_frame, 0);
        }
    setTimeout(scroll_frame, 0);
}

function nextSlides(){
  showSlides(slide_index += 1);
}

function prevSlides() {
  showSlides(slide_index += -1);
}

function showSlides(n){
  var i;
  var slides = document.getElementsByTagName("video");
  if (n > slides.length) {
  	slide_index = 1
  }    
  else if (n < 1) {
  	slide_index = slides.length
  }
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  slides[slide_index-1].style.display = "block";  
}

function displayModal(){
	document.getElementById('modal_pic').style.display = "block";
}

function closeModal(){
	document.getElementById('modal_pic').style.display = "none";
}
