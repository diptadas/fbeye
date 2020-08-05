const tabOptions = {

    SUMMARY: 1,
    TIMELINE: 2,
    NEWSFEED: 3,
    POST: 4

}
var selectedTab = tabOptions.SUMMARY;
var contentIndexOfIndividualTab = 0;

function loadNewsFeed() {
    
    console.log('loading news feeds');
    console.log(dummyData.feeds[0].text);

    

    if (contentIndexOfIndividualTab < dummyData.feeds.length) {
        readOutFeedContent();
        optionReader();
    }
}

$(document).keydown(function(e) { 

    console.log(selectedTab);

    if (e.keyCode == '38') {
        console.log("UP");

        contentIndexOfIndividualTab -= 1;
        if(contentIndexOfIndividualTab < 0) {
            contentIndexOfIndividualTab = 0;
        }
        contentIndexOfIndividualTab %= dummyData.feeds.length;

        readOutFeedContent();

    }

    else if (e.keyCode == '40') {
        
        console.log("DOWN");

        contentIndexOfIndividualTab += 1;
        contentIndexOfIndividualTab %= dummyData.feeds.length;

        readOutFeedContent();
        
    }
});

function readOutFeedContent(){

    $("#feed-name").text(dummyData.feeds[contentIndexOfIndividualTab].name);
    $("#feed-text").text(dummyData.feeds[contentIndexOfIndividualTab].text);
    $("#feed-image").attr("src",dummyData.feeds[contentIndexOfIndividualTab].image);

    read("This is a post from" + dummyData.feeds[contentIndexOfIndividualTab].name);
    read(dummyData.feeds[contentIndexOfIndividualTab].text);

    var imageContent = "";
    for(var i = 0; i < dummyData.feeds[contentIndexOfIndividualTab].imageLabels.length; i++) {
        imageContent = imageContent + " " + dummyData.feeds[contentIndexOfIndividualTab].imageLabels[i];
    }

    read("There is an image here which might contains " + imageContent);

    
}

function optionReader() {

    var postEndDownCommand = "Press down arrow for hearing the next content in this tab";
    var postEndUpCommand = "Press up arrow for hearing the previous content in this tab";
    var postEndLikeCommand = "Press L for liking this post";
    var postEndCommentCommand = "Press C for making comment in this post";
    var postEndRepeatCommand = "Press R for repeating the options";

    read(postEndDownCommand);
    read(postEndUpCommand);
    read(postEndLikeCommand);
    read(postEndCommentCommand);
    read(postEndRepeatCommand);

}


$(document).keypress(function(e) {

    console.log("CHECK");
    if (e.key == "L" || e.key == 'l') {
        likePost();
        console.log("L Pressed");
    } else if (e.key == "R" || e.key == "r") {
        repeatOptions();
        console.log("R Pressed");
    } else if (e.which == "C" || e.key == "c") {
        makeComment();
        console.log("C Pressed");
    }
});

function likePost() {
    var postLike = "You have successfully liked this post";
    read(postLike);
}

function repeatOptions() {
    optionReader();
}

function makeComment() {
    //var postComment = "You have successfully made a ";
}

$("#comment-text-field").keypress(function(event) {
    if(event.key == "Enter"){
        $("#post-button").click();
    }else{
        read(event.key);
    }
});

$("#comment-button").click(function(){
    read($("#comment-text-field").val());
    var postText = $("#comment-text-field").val();
    read("Your comment is uploading");
    
    $("#comment-text-field").val(null);
    setTimeout(function(){
            beep();
            read("Your comment has been uploaded successfully");
        }, 4000);    
    
});