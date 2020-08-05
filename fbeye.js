currentTab =0;
$(document).ready(function () {
    $("#summary-tab-btn").click();
    currentTab=0;
});

tabOrder = ["#summary-tab-btn","#timeline-tab-btn","#feed-tab-btn","#post-tab-btn"];

tabCount = 4;

$(document).keydown(function(event) {
    console.log(event.key);
    if(event.key == "ArrowRight"){
        currentTab = (currentTab+1)%tabCount;
        console.log(currentTab);
        $(tabOrder[currentTab]).click();
    }else if(event.key == "ArrowLeft"){
        currentTab = (currentTab-1)%tabCount;
        console.log(currentTab);
        $(tabOrder[currentTab]).click();
    }
    
});


$("#summary-tab-btn").click(function () {
    resetTabs();
    $("#summary-tab").show();
    read("summary");
    selectedTab = tabOptions.SUMMARY;
});

$("#timeline-tab-btn").click(function () {
    resetTabs();
    $("#timeline-tab").show();
    read("timeline")
    loadMyFeed();
    selectedTab = tabOptions.TIMELINE;
});

$("#feed-tab-btn").click(function () {
    resetTabs();
    flag = false;
    $("#feed-tab").show();
    read("News feed");
    loadNewsFeed();
    selectedTab = tabOptions.NEWSFEED;
});

$("#post-tab-btn").click(function () {
    resetTabs();
    $("#post-tab").show();
    read("Post");
    selectedTab = tabOptions.POST;
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


function resetTabs() {
    $(".tab").hide();
    cancelRead();
    contentIndexOfIndividualTab = 0;
}

function read(msg) {
	window.speechSynthesis.speak(new SpeechSynthesisUtterance(msg));
}

function cancelRead() {
    window.speechSynthesis.cancel();
}

function beep() {
	new Audio('http://www.soundjay.com/button/beep-07.wav').play();	
}

//================================================
// Post button action
//------------------------------------------------
$("#post-button").click(function(){
    read($("#post-text-field").val());
    var postText = $("#post-text-field").val();
    read("Your post is uploading");
    
    $("#post-text-field").val(null);
    setTimeout(function(){
            beep();
            read("Your Post has been uploaded successfully");
        }, 4000);    
    
});
