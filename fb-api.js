var myFeeds = [];
var loginName = "";

window.fbAsyncInit = function () {
    FB.init({
        appId: '926578834514927',
        cookie: true,
        xfbml: true,
        version: 'v8.0'
    });
};

function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    if (response.status === 'connected') {      // logged in
        loadName();
    } else {                                    // not logged in
        alert("Login failed, please try again or use dummy data.")
    }
}

function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}

function loadName() {
    console.log('Welcome! Fetching your information....');
    FB.api('/me', function (response) {
        if (response && !response.error) {
            console.log('Successful login for: ' + response.name);
            loginName = response.name;
            loadMyFeeds();
        } else {
            console.error(response.error);
            alert("Failed to load profile data, please try again or use dummy data.")
        }
    });
}

function loadMyFeeds() {
    console.log('loading my feeds');
    FB.api(
        "me/feed?fields=attachments{media},message",
        function (response) {
            if (response && !response.error) {
                console.log(response);
                processMyFeedResponse(response);
            } else {
                console.error(response.error);
                alert("Failed to load timeline data, please try again or use dummy data.")
            }
        }
    );
}

function processMyFeedResponse(response) {
    for (var key of Object.keys(response.data)) {
        // populate missing fields with dummy data
        var postContent = JSON.parse(JSON.stringify(dummyData.timeline[key]));;

        postContent.id = response.data[key].id;
        postContent.name = loginName;

        if (response.data[key].message) {
            postContent.text = response.data[key].message;
        }

        if (response.data[key].attachments) {
            var attachments = response.data[key].attachments;
            if (attachments.data[0].media && attachments.data[0].media.image) {
                postContent.image = attachments.data[0].media.image.src;
            }
        }

        // clean up live data - do not include empty posts
        if (postContent.text && postContent.image) {
            myFeeds.push(postContent);
        }
    }

    console.log(myFeeds);

    // done facebook setup
    fbSetupDone = true;
    document.getElementById('fb-setup-status').innerHTML = 'Login completed. Data loaded for ' + loginName + '!';
}
