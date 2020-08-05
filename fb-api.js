window.fbAsyncInit = function () {
    FB.init({
        appId: '926578834514927',
        cookie: true,
        xfbml: true,
        version: 'v8.0'
    });

    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
};

function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function (response) {
        console.log('Successful login for: ' + response.name);
        document.getElementById('status').innerHTML =
            'Thanks for logging in, ' + response.name + '!';
    });
}

function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    if (response.status === 'connected') {      // logged in
        $("#login-btn").hide();                 // hide login button
        testAPI();
    } else {                                    // not logged in
        $("#login-btn").show();                 // show login button
        document.getElementById('status').innerHTML = 'Please log into this webpage.';
    }
}

function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}

var myFeeds = [];

function loadMyFeed() {
    console.log('loading my feeds');
    FB.api(
        "/me/feed",
        function (response) {
            if (response && !response.error) {
                console.log(response);
                processMyFeedResponse(response);
            } else {
                console.error(response.error);
            }
        }
    );
}

function processMyFeedResponse(response) {
    for (var key of Object.keys(response.data)) {
        myFeeds[key] = [];
        myFeeds[key].id = response.data[key].id;
        myFeeds[key].text = response.data[key].message;
        loadImageForPost(key)
    }
}

function loadImageForPost(key) {
    console.log('loading image of post');
    FB.api(
        "/" + myFeeds[key].id + "/attachments?fields=media",
        function (response) {
            if (response && !response.error && response.data[0] && response.data[0].media.image) {
                console.log(response);
                myFeeds[key].image = response.data[0].media.image.src;
            } else {
                console.error(response.error);
            }
        }
    );
}
