$("#post-text-field").keypress(function(event) {
    if(event.key == "Enter"){
        $("#post-button").click();
    }else{
        cancelRead();
        read(event.key);
    }
});

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
