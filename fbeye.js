currentTab = 0;
tabCount = 4;
tabOrder = ["#home-tab-btn", "#timeline-tab-btn", "#feed-tab-btn", "#post-tab-btn"];

const tabOptions = {
    HOME: 1,
    TIMELINE: 2,
    NEWSFEED: 3,
    POST: 4

}
var selectedTab = tabOptions.HOME;

$(document).ready(function () {
    $("#app").hide();
});

function startApplication() {
    $("#setup").hide();
    $("#app").show();

    $("#home-tab-btn").click();

    currentTab = 0;
    selectedTab = tabOptions.HOME;
}

$(document).keydown(function (event) {
    console.log(event.key);
    if (event.key == "ArrowRight") {
        currentTab = (currentTab + 1) % tabCount;
        console.log(currentTab);
        $(tabOrder[currentTab]).click();
    } else if (event.key == "ArrowLeft") {
        currentTab = (currentTab - 1 + tabCount) % tabCount;
        console.log(currentTab);
        $(tabOrder[currentTab]).click();
    }

});


$("#home-tab-btn").click(function () {
    resetTabs();
    $("#home-tab").show();
    read("home");
    readHomeContent();
    
    selectedTab = tabOptions.HOME;

    if(!alreadyLoggedIn) {
        read("type your username and press enter");
        $("#username").focus();
    }
});

$("#timeline-tab-btn").click(function () {
    if (!alreadyLoggedIn) {
        readLogin();
        return;
    }
    resetTabs();
    $("#timeline-tab").show();
    read("timeline")
    loadTimeline();
    selectedTab = tabOptions.TIMELINE;
});

$("#feed-tab-btn").click(function () {
    if (!alreadyLoggedIn) {
        readLogin();
        return;
    }
    resetTabs();
    flag = false;
    $("#feed-tab").show();
    read("News feed");
    loadNewsFeed();
    selectedTab = tabOptions.NEWSFEED;
});

$("#post-tab-btn").click(function () {
    if (!alreadyLoggedIn) {
        readLogin();
        return;
    }
    
    resetTabs();
    $("#post-tab").show();
    read("Post");
    selectedTab = tabOptions.POST;
    read("write something to post and press ENTER to upload")
    $("#post-text-field").focus();

});

function readLogin() {
    read("Please login to continue");
}

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


