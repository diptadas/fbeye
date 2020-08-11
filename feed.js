var contentIndexOfIndividualTab = 0;

function loadNewsFeed() {
    resetCommentSection();

    if (contentIndexOfIndividualTab < dummyData.feeds.length) {
        readOutFeedContent();
        readOutHelpOptions();
    }
}

// ========================================
// up and down key press handler
// ----------------------------------------

$(document).keydown(function (e) {
    if (selectedTab != tabOptions.NEWSFEED) {
        return;
    }

    console.log(selectedTab);

    if (e.keyCode == '38') {
        console.log("UP");
        cancelRead();

        if (isCommentSectionSelected) {
            commentIndex -= 1;
            if (commentIndex < 0) {
                commentIndex = 0;
            }
            commentIndex %= dummyData.feeds[contentIndexOfIndividualTab].comments.length;
            readOutCommentContent();

        } else {
            contentIndexOfIndividualTab -= 1;
            if (contentIndexOfIndividualTab < 0) {
                contentIndexOfIndividualTab = 0;
            }
            contentIndexOfIndividualTab %= dummyData.feeds.length;
            readOutFeedContent();
        }
    }

    else if (e.keyCode == '40') {
        console.log("DOWN");
        cancelRead();

        if (isCommentSectionSelected) {
            commentIndex += 1;
            commentIndex %= dummyData.feeds[contentIndexOfIndividualTab].comments.length;
            readOutCommentContent();
        } else {
            contentIndexOfIndividualTab += 1;
            contentIndexOfIndividualTab %= dummyData.feeds.length;
            readOutFeedContent();
        }
    }
});

function readOutFeedContent() {

    $("#feed-name").text(dummyData.feeds[contentIndexOfIndividualTab].name);
    $("#feed-text").text(dummyData.feeds[contentIndexOfIndividualTab].text);
    $("#feed-image").attr("src", dummyData.feeds[contentIndexOfIndividualTab].image);

    read("This is a post from" + dummyData.feeds[contentIndexOfIndividualTab].name);

    var postTextContent = "";
    for (var i = 0; i < dummyData.feeds[contentIndexOfIndividualTab].keywords.length; i++) {
        postTextContent = postTextContent + ", " + dummyData.feeds[contentIndexOfIndividualTab].keywords[i];
    }

    //read(dummyData.feeds[contentIndexOfIndividualTab].text);

    read("Post keywords are: " + postTextContent);
    $("#feed-text-keywords").text("Post keywords are:" + postTextContent.substring(1, postTextContent.length));

    var imageContent = "";
    for (var i = 0; i < dummyData.feeds[contentIndexOfIndividualTab].imageLabels.length; i++) {
        imageContent = imageContent + ", " + dummyData.feeds[contentIndexOfIndividualTab].imageLabels[i];
    }

    read("There is an image here which might contain " + imageContent);
    $("#feed-image-keywords").text("Image keywords are:" + imageContent.substring(1, imageContent.length));

    read("This post contains " + dummyData.feeds[contentIndexOfIndividualTab].likes + "likes and "
        + dummyData.feeds[contentIndexOfIndividualTab].comments.length + "comments");

    $("#feed-like-comment").text("Likes: " + dummyData.feeds[contentIndexOfIndividualTab].likes + " " + "Comments: "
        + dummyData.feeds[contentIndexOfIndividualTab].comments.length);

    //var helpOptionsForFeed = "Press H for all options.";
    //read(helpOptionsForFeed);

}

function readOutHelpOptions() {
    read("Press H to learn about shortcuts.");
}

function postOptionReader() {
    var postEndUpDownCommand = "Use up and down arrow to navigate between posts";
    var fullTextCommand = "Press R to read full post";
    var postEndLikeCommand = "Press L to like this post";
    var postEndCommentCommand = "Press C to comment on this post";
    var postEndReadCommentCommand = "Press A to read all the comments";

    read(postEndUpDownCommand);
    read(fullTextCommand);
    read(postEndLikeCommand);
    read(postEndCommentCommand);
    read(postEndReadCommentCommand);

}

// ========================================
// news feed key press handler
// ----------------------------------------

$(document).keypress(function (e) {
    // do not switch option when posting comment

    if (selectedTab != tabOptions.NEWSFEED) {
        return;
    }

    if (makeCommentFlag) {
        return;
    }

    // do not switch option when reading comments
    // except A to return back to post
    if (isCommentSectionSelected && !(e.key == "A" || e.key == "a")) {
        return;
    }

    if (e.key == "L" || e.key == 'l') {
        likePost();
        console.log("L Pressed");
    } else if (e.key == "R" || e.key == "r") {
        readFullText();
        console.log("R Pressed");
    } else if (makeCommentFlag == false && (e.key == "C" || e.key == "c")) {
        makeComment();
        console.log("C Pressed");
    } else if (e.key == "A" || e.key == "a") {
        selectDeselectCommentSection();
        console.log("A Pressed");
    } else if (e.key == "H" || e.key == "h") {

        postOptionReader();
        console.log("H Pressed");
    } else if (e.key == "Y" || e.key == "y") {

        read("Your comment has been uploaded successfully");

    } else if (e.key == "N" || e.key == "n") {

        read("Your comment has not been uploaded");
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

    if (isCommentSectionSelected) {
        isCommentSectionSelected = 0;
        resetCommentSection();
        read("Now you are back again in post section");
    } else {
        isCommentSectionSelected = 1;
        readAllCommentsOptions();
        readOutCommentContent();
    }
}

function resetCommentSection() {
    $("#feed-comment").text("");
    commentIndex = 0;
}

function readFullText() {
    read(dummyData.feeds[contentIndexOfIndividualTab].text);
}
