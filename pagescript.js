
	function ShowHideDIV(el) {
		if (document.getElementById && document.all) {
		document.previewimg.src = 'file:///'+el.value; 
			if (el.value == "") {
				document.getElementById("previewdiv").style.display = "none";
			} else {
				document.getElementById("previewdiv").style.display = "block";
			}
		}
		return true;
	}
	function FixedPoint(value, places) {
		valuestring = value.toString();
		decimalpos = valuestring.indexOf(".");
		if (decimalpos == -1) {
			valuestring += ".";
			decimalpos = valuestring.indexOf(".");
		}
		while ((valuestring.length - decimalpos) <= places) {
			valuestring += "0";
		}
		valuestring = valuestring.substr(0, decimalpos) + valuestring.substr(decimalpos, places + 1);
		return valuestring;
	}
	function IsValidImageSize() {
		if ((document.previewimg.fileSize * 0) != 0) {
			// most browsers other than IE don't return a value for filesize
			// so just let them through and let PHP catch it on the other side
			return true;
		}
		if (navigator.userAgent.indexOf("Mac")!=-1)
		return true;
		if (document.previewimg.fileSize == -1) {
			// file types that the browser doesn't understand won't create a
			// valid image and therefore probably return a "-1" filesize
			return true;
		}
		actualsize = FixedPoint(document.previewimg.fileSize / 1048576, 3);
		maxsize    = FixedPoint(rawmaxsize / 1048576, 3);
		unit = 'MB';

		if ((document.previewimg.fileSize > 0) && (document.previewimg.fileSize < rawmaxsize)) {
			return true;
		}
		alert('This image is too large! \n\nThis image you selected to upload is ' + actualsize + " " + unit + ' \nThe maximum allowed size is ' + maxsize + " "+ unit);
		return false;


	}
	function IsValidImageType(filename) {
		if (filename == "") {
			alert('Please choose a picture to use for the icon first');
			return false;
		}
		var reg = /(gif|png|jpe?g|bmp|tiff?)$/i;
		if (!reg.test(filename)) {
			alert('Only JPEG, PNG, GIF, BMP and TIFF files can be used');
			return false;
		}
		return IsValidImageSize();
	}

///// DD added functions for tooltip ///////////////

var themsg="Checking the below options <b>increases</b> the file size of the generated icon. Only select them if you need the icon to contain additional images for the purposes described."

document.write('<div id="dhtmltooltip" style="font-size: 90%"></div>')

var offsetxpoint=-60 //Customize x offset of tooltip
var offsetypoint=20 //Customize y offset of tooltip
var ie=document.all
var ns6=document.getElementById && !document.all
var enabletip=false
if (ie||ns6)
var tipobj=document.all? document.all["dhtmltooltip"] : document.getElementById? document.getElementById("dhtmltooltip") : ""

function ietruebody(){
return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
}

function ddrivetip(thetext, thecolor, thewidth){
if (ns6||ie){
if (typeof thewidth!="undefined") tipobj.style.width=thewidth+"px"
if (typeof thecolor!="undefined" && thecolor!="") tipobj.style.backgroundColor=thecolor
tipobj.innerHTML=thetext
enabletip=true
return false
}
else
alert(themsg)
}

function positiontip(e){
if (enabletip){
var curX=(ns6)?e.pageX : event.x+ietruebody().scrollLeft;
var curY=(ns6)?e.pageY : event.y+ietruebody().scrollTop;
//Find out how close the mouse is to the corner of the window
var rightedge=ie&&!window.opera? ietruebody().clientWidth-event.clientX-offsetxpoint : window.innerWidth-e.clientX-offsetxpoint-20
var bottomedge=ie&&!window.opera? ietruebody().clientHeight-event.clientY-offsetypoint : window.innerHeight-e.clientY-offsetypoint-20

var leftedge=(offsetxpoint<0)? offsetxpoint*(-1) : -1000

//if the horizontal distance isn't enough to accomodate the width of the context menu
if (rightedge<tipobj.offsetWidth)
//move the horizontal position of the menu to the left by it's width
tipobj.style.left=ie? ietruebody().scrollLeft+event.clientX-tipobj.offsetWidth+"px" : window.pageXOffset+e.clientX-tipobj.offsetWidth+"px"
else if (curX<leftedge)
tipobj.style.left="5px"
else
//position the horizontal position of the menu where the mouse is positioned
tipobj.style.left=curX+offsetxpoint+"px"

//same concept with the vertical position
if (bottomedge<tipobj.offsetHeight)
tipobj.style.top=ie? ietruebody().scrollTop+event.clientY-tipobj.offsetHeight-offsetypoint+"px" : window.pageYOffset+e.clientY-tipobj.offsetHeight-offsetypoint+"px"
else
tipobj.style.top=curY+offsetypoint+"px"
tipobj.style.visibility="visible"
}
}

function hideddrivetip(){
if (ns6||ie){
enabletip=false
tipobj.style.visibility="hidden"
tipobj.style.left="-1000px"
tipobj.style.backgroundColor=''
tipobj.style.width=''
}
}

document.onmousemove=positiontip
