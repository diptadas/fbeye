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

    read("There is an image here which contains " + imageContent);
}