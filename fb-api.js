var myFeeds = [];
var loginName = "";

window.fbAsyncInit = function () {
    FB.init({
        appId: '926578834514927',
        cookie: true,
        xfbml: true,
        version: 'v8.0'
    });

    // FB.getLoginStatus(function (response) {
    //     statusChangeCallback(response);
    // });
};

$("#login-btn").click(function () {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
});

function readHomeContent(name) {
    read(document.getElementById('status').innerHTML); // read welcome
    read("Use left and right arrow to navigate between tabs");
}

function testAPI() {
    console.log('Welcome! Fetching your information....');
    FB.api('/me', function (response) {
        loginName = response.name;
        console.log('Successful login for: ' + response.name);
        document.getElementById('status').innerHTML = 'Welcome ' + response.name + '!';
        readHomeContent(response.name);
    });
}

function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    if (response.status === 'connected') {      // logged in
        $("#home-login").hide();                 // hide login section
        testAPI();
        loadMyFeeds();
    } else {                                    // not logged in
        $("#home-login").show();                 // show login section
        document.getElementById('status').innerHTML = 'Please login using Facebook';
    }
}

function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
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
            }
        }
    );
}

function processMyFeedResponse(response) {
    for (var key of Object.keys(response.data)) {
        var postContent = [];

        postContent.id = response.data[key].id;
        postContent.name = loginName;
        postContent.imageLabels = dummyData.labels; // dummy data

        if(response.data[key].message) {
            postContent.text = response.data[key].message;
        }

        if(response.data[key].attachments){
            var attachments = response.data[key].attachments;
            if(attachments.data[0].media && attachments.data[0].media.image) {
                postContent.image = attachments.data[0].media.image.src;
            }
        }
        
        // clean up live data - do not include empty posts
        if(postContent.text && postContent.image) {
            myFeeds.push(postContent);
        }
    }
    
    console.log(myFeeds);
}
