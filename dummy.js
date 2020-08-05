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

    /*
    if (contentIndexOfIndividualTab < dummyData.feeds.length) {
        

        var newNodeContainer = "<div class='feedObject'><b>" + dummyData.feeds[contentIndexOfIndividualTab].text + "<br><br>";

        var imageContainer = "<img class='postImage' width='200px' height='200px' src=\"" + dummyData.feeds[contentIndexOfIndividualTab].image;

        var divClose = "\"</img></div>";
        $('#feed-tab').append(newNodeContainer + imageContainer + divClose);

        contentIndexOfIndividualTab += 1;
    }
    */

    if (contentIndexOfIndividualTab < dummyData.feeds.length) {
        $("#feed-text").text(dummyData.feeds[contentIndexOfIndividualTab].text);
        $("#feed-image").attr("src",dummyData.feeds[contentIndexOfIndividualTab].image);
    }
    
    //contentIndexOfIndividualTab += 1;

    //contentIndexOfIndividualTab %= dummyData.feeds.length;

    read(dummyData.feeds[contentIndexOfIndividualTab].text);
}

$(document).keydown(function(e) { 

    console.log(selectedTab);

    if (e.keyCode == '38') {
        console.log("UP");

        contentIndexOfIndividualTab -= 1;
        contentIndexOfIndividualTab < 0 ? 0 : contentIndexOfIndividualTab;
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
    $("#feed-text").text(dummyData.feeds[contentIndexOfIndividualTab].text);
        $("#feed-image").attr("src",dummyData.feeds[contentIndexOfIndividualTab].image);

        read(dummyData.feeds[contentIndexOfIndividualTab].text);

        var imageContent = "";
        for(var i = 0; i < dummyData.feeds[contentIndexOfIndividualTab].image-tags.length; i++) {
            imageContent = imageContent + " " + dummyData.feeds[contentIndexOfIndividualTab].image-tags[i];
        }

        read("There is an image here which contains " + imageContent);
}