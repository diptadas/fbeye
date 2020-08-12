var makeCommentFlag = false;
var commentIndex = 0;
var isCommentSectionSelected = 0;

function readOutCommentContent() {

    var comment = dummyData.feeds[contentIndexOfIndividualTab].comments[commentIndex];
    $("#feed-comment").text(comment.name + ": " + comment.text);

    read("This is a comment from" + comment.name);
    read(dummyData.feeds[contentIndexOfIndividualTab].comments[commentIndex].text);
}

function readAllCommentsOptions() {

    var postEndCommentEnterCommand = "Now you have entered in comment section";
    var postEndUpDownCommentCommand = "Press up and down arrow arrow to navigate between comments";
    var postEndCommentFinish = "Press A again to return to the post section";

    read(postEndCommentEnterCommand);
    read(postEndUpDownCommentCommand);
    read(postEndCommentFinish);

}

var enterPressedToPublishComment = false;
function makeComment() {
    // var postComment = "You have successfully made a ";
    cancelRead();
    setTimeout(function () {
        $("#comment-text-field").focus();
        makeCommentFlag = true;
        read("Write a comment and press enter to upload");
    }, 100);


    $("#comment-text-field").keypress(function (event) {
        console.log(makeCommentFlag);
        if (makeCommentFlag == true) {
            if (event.key == "Enter") {
                $("#comment-button").click();
            } else {
                cancelRead();
                read(event.key);
            }
        }
    });
}

$("#comment-button").click(function () {

    read($("#comment-text-field").val());
    var postText = $("#comment-text-field").val();
    read("Press Y for uploading the comment or press N for canceling the comment");
    enterPressedToPublishComment = true;
    $("#comment-text-field").blur();
});

$(document).keydown(function (event) {
    console.log(event.key);
    if (!enterPressedToPublishComment) {
        return;
    }
    var btnPrs = event.key;
    if (btnPrs == "Y" || btnPrs == "y") {
        enterPressedToPublishComment = false;
        cancelRead();
        read("Your comment is uploading");

        $("#comment-text-field").val(null);
        

        setTimeout(function () {
            beep();
            read("comment has been uploaded successfully");
        }, 4000);
        makeCommentFlag = false;

    } else if (btnPrs == "N" || btnPrs == "n") {
        enterPressedToPublishComment = false;
        cancelRead();
        read("your comment has not uploaded");
        $("#comment-text-field").val(null);
        makeCommentFlag = false;
    }

});
