var alreadyReadOutTimelineOptions = 0;
var timelineData = dummyData.feeds; // TODO: use live data

function loadTimeline() {

    // load live data
    // timelineData = loadMyFeed();
    
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

    console.log(selectedTab);

    if (e.keyCode == '38') {
        console.log("UP");
        cancelRead();

        contentIndexOfIndividualTab -= 1;
        if(contentIndexOfIndividualTab < 0) {
            contentIndexOfIndividualTab = 0;
        }
        contentIndexOfIndividualTab %= timelineData.length;

        readOutTimelineContent();
    }
    else if (e.keyCode == '40') {
        console.log("DOWN");
        cancelRead();

        contentIndexOfIndividualTab += 1;
        contentIndexOfIndividualTab %= timelineData.length;

        readOutTimelineContent();
    }
    
});

function readOutTimelineContent(){

    $("#timeline-name").text(timelineData[contentIndexOfIndividualTab].name);
    $("#timeline-text").text(timelineData[contentIndexOfIndividualTab].text);
    $("#timeline-image").attr("src",timelineData[contentIndexOfIndividualTab].image);

    read(timelineData[contentIndexOfIndividualTab].text);

    var imageContent = "";
    for(var i = 0; i < timelineData[contentIndexOfIndividualTab].imageLabels.length; i++) {
        imageContent = imageContent + ", " + timelineData[contentIndexOfIndividualTab].imageLabels[i];
    }

    read("There is an image here which might contain " + imageContent);
}

function timelineOptionReader() {

    alreadyReadOutTimelineOptions = 1;

    var timelineUpDownCommand = "Use up and down arrow to navigate between your posts";

    read(timelineUpDownCommand);
}

