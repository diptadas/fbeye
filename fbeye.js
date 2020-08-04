$(document).ready(function () {
    $("#summary-tab-btn").click();
});

$("#summary-tab-btn").click(function () {
    hideAllTabs();
    $("#summary-tab").show();
});

$("#timeline-tab-btn").click(function () {
    hideAllTabs();
    $("#timeline-tab").show();
    loadMyFeed();
});

$("#feed-tab-btn").click(function () {
    hideAllTabs();
    $("#feed-tab").show();
    loadNewsFeed();
});

$("#post-tab-btn").click(function () {
    hideAllTabs();
    $("#post-tab").show();
});

function hideAllTabs() {
    $(".tab").hide();
}

//================================================
// Post button action
//------------------------------------------------
$("#post-button").click(function(){
    var postText = $("#post-text-field").val();
    createPost(postText);
});
