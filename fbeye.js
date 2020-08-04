$(document).ready(function () {
    hideAllTabs();
    $("#summary-tab").show();
});

$("#summary-tab-btn").click(function () {
    hideAllTabs();
    $("#summary-tab").show();
});

$("#feed-tab-btn").click(function () {
    hideAllTabs();
    $("#feed-tab").show();
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
    postButtonClicked(postText);
});
