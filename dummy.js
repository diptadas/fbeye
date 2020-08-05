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

    for(var i = 0; i < dummyData.feeds.length; i++) {
        var newNodeContainer = "<div class='feedObject'><b>" + dummyData.feeds[i].text + "<br><br>";

        var imageContainer = "<img width=100px height=100px src=\"" + dummyData.feeds[i].image;

        var divClose = "\"</img></div>";
        $('#feed-tab').append(newNodeContainer + imageContainer + divClose);
      }
}