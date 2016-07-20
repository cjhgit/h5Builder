// JavaScript Document
/* 控制全屏 */
var isFullScreen = false;

$("#full").click(function () {

    // 如果不是全屏
    if (isFullScreen) {
        isFullScreen = true;
        // 全屏播放
        var docElm = document.documentElement;
        if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
        }
        else if (docElm.msRequestFullscreen) {
            docElm.msRequestFullscreen();
        }
        else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
        }
        else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();
        }

    } else {
        isFullScreen = false;
        // 取消全屏
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
        else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }

    }

});
/*
 $("#teach").click(function() {

 var marioVideo = document.getElementById("toolBar");	// 要全屏的元素
 if (marioVideo.requestFullscreen) {
 marioVideo.requestFullscreen();
 }
 else if (marioVideo.msRequestFullscreen) {
 marioVideo.msRequestFullscreen();
 }
 else if (marioVideo.mozRequestFullScreen) {
 marioVideo.mozRequestFullScreen();
 }
 else if (marioVideo.webkitRequestFullScreen) {
 marioVideo.webkitRequestFullScreen();
 }


 });
 */

/* 取消全屏 */
/*
 var cancelFullScreen = document.getElementById("cancel-fullscreen");
 if (cancelFullScreen) {
 cancelFullScreen.addEventListener("click", function () {
 if (document.exitFullscreen) {
 document.exitFullscreen();
 }
 else if (document.msExitFullscreen) {
 document.msExitFullscreen();
 }
 else if (document.mozCancelFullScreen) {
 document.mozCancelFullScreen();
 }
 else if (document.webkitCancelFullScreen) {
 document.webkitCancelFullScreen();
 }
 }, false);
 }
 */
/* 全屏状态改变事件监听 */
/*
 var fullscreenState = document.getElementById("fullscreen-state");
 if (fullscreenState) {
 document.addEventListener("fullscreenchange", function () {
 fullscreenState.innerHTML = (document.fullscreenElement)? "" : "not ";
 }, false);

 document.addEventListener("msfullscreenchange", function () {
 fullscreenState.innerHTML = (document.msFullscreenElement)? "" : "not ";
 }, false);

 document.addEventListener("mozfullscreenchange", function () {
 fullscreenState.innerHTML = (document.mozFullScreen)? "" : "not ";
 }, false);

 document.addEventListener("webkitfullscreenchange", function () {
 fullscreenState.innerHTML = (document.webkitIsFullScreen)? "" : "not ";
 }, false);
 }
 */
/* 局部全屏 */
/*
 var marioVideo = document.getElementById("mario-video")
 videoFullscreen = document.getElementById("video-fullscreen");

 if (marioVideo && videoFullscreen) {


 }
 }, false);
 }
 });
 */

	