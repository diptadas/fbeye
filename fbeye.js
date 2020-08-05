$(document).ready(function () {
    $("#summary-tab-btn").click();
});

$("#summary-tab-btn").click(function () {
    hideAllTabs();
    $("#summary-tab").show();
    selectedTab = tabOptions.SUMMARY;
    contentIndexOfIndividualTab = 0;
});

$("#timeline-tab-btn").click(function () {
    hideAllTabs();
    $("#timeline-tab").show();
    loadMyFeed();
    selectedTab = tabOptions.TIMELINE;
    contentIndexOfIndividualTab = 0;
});

$("#feed-tab-btn").click(function () {
    hideAllTabs();
    $("#feed-tab").show();
    read("News feed");
    loadNewsFeed();
    selectedTab = tabOptions.NEWSFEED;
    contentIndexOfIndividualTab = 0;
});

$("#post-tab-btn").click(function () {
    hideAllTabs();
    $("#post-tab").show();
    read("Post");
    selectedTab = tabOptions.POST;
    contentIndexOfIndividualTab = 0;
    read("write something to post and press ENTER to upload")
    $("#post-text-field").focus();

});


$("#post-text-field").keypress(function(event) {
    if(event.key == "Enter"){
        $("#post-button").click();
    }else{
        read(event.key);
    }
});


function hideAllTabs() {
    $(".tab").hide();
}

// sound and beep
var sound = true;

function read(msg) {
	if(sound) {
		window.speechSynthesis.speak(new SpeechSynthesisUtterance(msg));
	}
}

function beep() {
	if(sound) {
		new Audio('http://www.soundjay.com/button/beep-07.wav').play();
	}	
}

//================================================
// Post button action
//------------------------------------------------
$("#post-button").click(function(){
    read($("#post-text-field").val());
    var postText = $("#post-text-field").val();
    read("A post is uploading");
    $("#post-text-field").val(null);
    setTimeout(function(){
            beep();
            read("A Post has been uploaded successfully");
        }, 4000);

    
    
});
