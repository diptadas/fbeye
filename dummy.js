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



    $("#feed-text").text(dummyData.feeds[contentIndexOfIndividualTab].text);
    $("#feed-image").attr("src",dummyData.feeds[contentIndexOfIndividualTab].image);
    contentIndexOfIndividualTab += 1;

    contentIndexOfIndividualTab %= dummyData.feeds.length;
}