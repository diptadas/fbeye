$(document).ready(function () {
    console.log("ready");
    $("#tab1").show();
    $("#tab2").hide();
    $("#tab3").hide();
});

$("#tab1-btn").click(function () {
    $("#tab1").show();
    $("#tab2").hide();
    $("#tab3").hide();
});

$("#tab2-btn").click(function () {
    $("#tab1").hide();
    $("#tab2").show();
    $("#tab3").hide();
    loadNewFeed();
    loadPostContent("3407441709301226_3378085995570131");
});

$("#tab3-btn").click(function () {
    $("#tab1").hide();
    $("#tab2").hide();
    $("#tab3").show();
});

//================================================
// Post button action
//------------------------------------------------
$("#post-button").click(function(){
    var postText = $("#post-text-field").val();
    postButtonClicked();
});
