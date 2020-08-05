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
    var postText = $("#post-text-field").val();
    createPost(postText);
});
