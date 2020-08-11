var fbSetupDone = false;

$("#setup-dummy-btn").click(function () {
    loadDummyNameAndFeed();
    startApplication();
});

$("#setup-gcloud-btn").click(function () {
    if (fbSetupDone) {
        apiKey = $("#setup-api-key").val();
        imageLabelsForFeeds();
    } else {
        alert("Please login to Facebook first.")
    }
});

function loadDummyNameAndFeed() {
    console.log("using dummy name and feeds");
    loginName = JSON.parse(JSON.stringify(dummyData.loginName));
    myFeeds = JSON.parse(JSON.stringify(dummyData.timeline));
}

function imageLabelsForFeeds() {
    var imageContents = [];
    var count = 0;

    myFeeds.forEach(function (item, i) {
        toBase64Image(item.image, function (myBase64) {
            imageContents[i] = myBase64.split("base64,")[1];
            count++;

            if (count == myFeeds.length) {
                // done converting all images
                console.log(imageContents);
                getImageLabels(imageContents);
            }
        });
    });
}

function onGCloudSuccess() {
    for (i in myFeeds) {
        myFeeds[i].imageLabels = gcloudImageLabels[i];
    }
    console.log(myFeeds);
    startApplication();
}

function toBase64Image(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}
