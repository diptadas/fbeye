$("#post-text-field").keypress(function (event) {
    if (event.key == "Enter") {
        $("#post-button").click();
    } else {
        cancelRead();
        read(event.key);
    }
});

//================================================
// Post button action
//------------------------------------------------

$("#post-button").click(function () {

    $("#post-text-field").blur();
    read($("#post-text-field").val());
    var postText = $("#post-text-field").val();
    read("Press Y for uploading the post or press N for canceling the post");
    $(document).keydown(function (event) {
        console.log(event.key);
        if (event.key == "Y" || event.key == "y") {
            read("Your post is uploading");

            $("#post-text-field").val(null);

            setTimeout(function () {
                beep();
                read("Your Post has been uploaded successfully");
            }, 4000);
            setTimeout(function (){
                $("#post-tab-btn").click();
            }, 8000);


        } else if (event.key == "N" || event.key == "n") {
            cancelRead();
            read("Your post has not been uploaded")
            $("#post-text-field").val(null);
            setTimeout(function (){
                $("#post-tab-btn").click();
            }, 3000);

        }

    });

});
