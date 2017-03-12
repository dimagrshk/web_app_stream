window.onload=function () {
    document.getElementById("link").onchange=function () {
        getImg();
        document.getElementById('start').onclick=send;
    }
}

function getImg() {
    var stream=document.getElementById("stream");
    var img=new Image();
    var src=document.getElementById("link").value;
    img.src=src;
    img.onload=function(){
	    img.style.width=img.naturalWidth*stream.clientWidth/1092+'px';
    	img.style.height=img.naturalHeight*stream.clientHeight/614+'px';
    	img.border=1;
    	img.style.borderColor='black';
    	img.style.zIndex=2;
    	img.style.position='absolute';
    	img.style.top=stream.offsetTop+'px';
    	img.style.left=stream.offsetLeft+'px';
    	img.setAttribute('id','picture');
    	var elemImg=document.body.appendChild(img);
    	elemImg.addEventListener('mousedown',function (event) {
        	dragPicture(this,event);
    	})
    	countCoordinates();
    }
}

function countCoordinates() {
    var elemImg=document.getElementById('picture');
    var stream=document.getElementById('stream');
    document.getElementById("x").value=Math.round((elemImg.offsetLeft-stream.offsetLeft)*1092/stream.clientWidth);
    document.getElementById('y').value=Math.round((elemImg.offsetTop-stream.offsetTop)*614/stream.clientHeight);
}

function send() {
    $.ajax({
        url:'/from_grin',
        data: $('form').serialize(),
        type: 'POST',
        success: function(response) {
            var responseText=JSON.parse(response);
            alert(responseText.answer);
        },
        error: function(error) {
            //alert('ooooops, sorry')
        }
    });
}

function dragPicture(elementToDrag,event) {
    var startX = event.clientX,
        startY = event.clientY;

    var origX = elementToDrag.offsetLeft,
        origY = elementToDrag.offsetTop;

    var deltaX = startX - origX,
        deltaY = startY - origY;

    document.addEventListener("mousemove", moveHandler, true);
    document.addEventListener("mouseup", upHandler, true);

    function moveHandler(e) {
        if (!e) e = window.event;

        //fixing borders
        var left=e.clientX - deltaX;
        var top=e.clientY - deltaY;

        var stream=document.getElementById('stream');
        var leftValidation=left>=stream.offsetLeft && (stream.offsetLeft+stream.clientWidth)>=(left+elementToDrag.clientWidth);
        var topValidation=top>=stream.offsetTop && (stream.offsetTop+stream.clientHeight)>=(top+elementToDrag.clientHeight);

        if(leftValidation && topValidation) {
            elementToDrag.style.left = left + "px";
            elementToDrag.style.top = top + "px";
        }
        else
            upHandler(e);
        countCoordinates();
    }

    function upHandler(e) {
        if (!e) e = window.event;

        document.removeEventListener("mouseup", upHandler, true);
        document.removeEventListener("mousemove", moveHandler, true);
    }
}
