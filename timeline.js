var alreadyReadOutTimelineOptions = 0;

function loadTimeline() {

    // dummy data in case of login failed
    if(!myFeeds.length) {
        myFeeds = dummyData.timeline;
    }
    
    if (contentIndexOfIndividualTab < dummyData.feeds.length) {
        readOutTimelineContent();

        if(!alreadyReadOutTimelineOptions) {
            timelineOptionReader();
        }
    }
}

// ========================================
// up and down key press handler
// ----------------------------------------

$(document).keydown(function(e) {
    if(selectedTab != tabOptions.TIMELINE) {
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
        contentIndexOfIndividualTab %= myFeeds.length;

        readOutTimelineContent();
    }
    else if (e.keyCode == '40') {
        console.log("DOWN");
        cancelRead();

        contentIndexOfIndividualTab += 1;
        contentIndexOfIndividualTab %= myFeeds.length;

        readOutTimelineContent();
    }
    
});

function readOutTimelineContent(){

    var dateAndLocation = myFeeds[contentIndexOfIndividualTab].time + " at " + myFeeds[contentIndexOfIndividualTab].location;

    $("#timeline-name").text(myFeeds[contentIndexOfIndividualTab].name);
    $("#timeline-date-location").text(dateAndLocation);
    $("#timeline-text").text(myFeeds[contentIndexOfIndividualTab].text);
    $("#timeline-image").attr("src",myFeeds[contentIndexOfIndividualTab].image);

    read(dateAndLocation);
    read(myFeeds[contentIndexOfIndividualTab].text);

    var imageContent = "";
    for(var i = 0; i < myFeeds[contentIndexOfIndividualTab].imageLabels.length; i++) {
        imageContent = imageContent + ", " + myFeeds[contentIndexOfIndividualTab].imageLabels[i];
    }

    $("#timeline-image-keywords").text("Image keywords are:" + imageContent.substring(1, imageContent.length));

    read("There is an image here which might contain " + imageContent);
}

function timelineOptionReader() {

    alreadyReadOutTimelineOptions = 1;

    var timelineUpDownCommand = "Use up and down arrow to navigate between your posts";

    read(timelineUpDownCommand);
}

