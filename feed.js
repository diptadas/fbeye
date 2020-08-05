var contentIndexOfIndividualTab = 0;
var alreadyReadOutOptions = 0;

function loadNewsFeed() {
    
    if (contentIndexOfIndividualTab < dummyData.feeds.length) {

        if(isCommentSectionSelected) {
            readOutCommentContent();
        } else {
            readOutFeedContent();
            if(!alreadyReadOutOptions) {
                postOptionReader();
            }
        }
    }
}

// ========================================
// up and down key press handler
// ----------------------------------------

$(document).keydown(function(e) {
    if(selectedTab != tabOptions.NEWSFEED) {
        return;
    } 

    console.log(selectedTab);

    if (e.keyCode == '38') {
        console.log("UP");
        cancelRead();

        contentIndexOfIndividualTab -= 1;
        if(contentIndexOfIndividualTab < 0) {
            contentIndexOfIndividualTab = 0;
        }
        contentIndexOfIndividualTab %= dummyData.feeds.length;

        commentIndex -= 1;
        if(commentIndex < 0) {
            commentIndex = 0;
        }
        commentIndex %= dummyData.feeds[contentIndexOfIndividualTab].comments.length;


        if(isCommentSectionSelected) {
            readOutCommentContent();
        } else {
            readOutFeedContent();
        }
    }

    else if (e.keyCode == '40') {
        console.log("DOWN");
        cancelRead();

        contentIndexOfIndividualTab += 1;
        contentIndexOfIndividualTab %= dummyData.feeds.length;

        commentIndex += 1;
        commentIndex %= dummyData.feeds[contentIndexOfIndividualTab].comments.length;

        if(isCommentSectionSelected) {
            readOutCommentContent();
        } else {
            readOutFeedContent();
        }
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
        imageContent = imageContent + ", " + dummyData.feeds[contentIndexOfIndividualTab].imageLabels[i];
    }

    read("There is an image here which might contain " + imageContent);
}

function postOptionReader() {

    alreadyReadOutOptions = 1;

    var postEndUpDownCommand = "Use up and down arrow to navigate between posts";
    var postEndLikeCommand = "Press L to like this post";
    var postEndCommentCommand = "Press C to comment on this post";
    var postEndReadCommentCommand = "Press A to read all the comments";
    var postEndRepeatCommand = "Press R to repeat the options";

    read(postEndUpDownCommand);
    read(postEndLikeCommand);
    read(postEndCommentCommand);
    read(postEndReadCommentCommand);
    read(postEndRepeatCommand);
}

// ========================================
// news feed key press handler
// ----------------------------------------

$(document).keypress(function(e) {
    // do not switch option when posting comment
    if(makeCommentFlag) {
        return;
    }

    // do not switch option when reading comments
    // except A to return back to post
    if(isCommentSectionSelected && !(e.key == "A" || e.key == "a")) {
        return;
    }

    if (e.key == "L" || e.key == 'l') {
        likePost();
        console.log("L Pressed");
    } else if (e.key == "R" || e.key == "r") {
        repeatPostOptions();
        console.log("R Pressed");
    } else if (makeCommentFlag == false && (e.key == "C" || e.key == "c")) {
        makeComment();
        console.log("C Pressed");
    } else if (e.key == "A" || e.key == "a"){
        selectDeselectCommentSection();
        console.log("A Pressed");
    }
});


// ========================================
// news feed options implementation
// ----------------------------------------

function likePost() {
    var postLike = "You have successfully liked this post";
    read(postLike);
}

function selectDeselectCommentSection() {

    $("#feed-comment").text("");
    if(isCommentSectionSelected){
        read("Now you are back again in post section");
        isCommentSectionSelected = 0;
    } else {
        readAllCommentsOptions();
        isCommentSectionSelected = 1;
    }
    
    loadNewsFeed();
}

function repeatPostOptions() {
    postOptionReader();
}

