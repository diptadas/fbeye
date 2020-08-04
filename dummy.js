function loadNewsFeed() {
    console.log('loading news feeds');
    console.log(dummyData.feeds[0].text);

    for(var i = 0; i < dummyData.feeds.length; i++) {
        var newNodeContainer = "<div class='feedObject'><b>" + dummyData.feeds[0].text + "<br><br>";
        var divClose = "</div>";
        $('#feed-tab').append(newNodeContainer + divClose);
      }
}