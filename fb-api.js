window.fbAsyncInit = function () {
    FB.init({
        appId: '926578834514927',
        cookie: true,                     // Enable cookies to allow the server to access the session.
        xfbml: true,                     // Parse social plugins on this webpage.
        version: 'v7.0'           // Use this Graph API version for this call.
    });

    FB.getLoginStatus(function (response) {   // Called after the JS SDK has been initialized.
        statusChangeCallback(response);        // Returns the login status.
    });
};

function testAPI() {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function (response) {
        console.log('Successful login for: ' + response.name);
        document.getElementById('status').innerHTML =
            'Thanks for logging in, ' + response.name + '!';
    });
}

function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
    console.log('statusChangeCallback');
    console.log(response);                   // The current login status of the person.
    if (response.status === 'connected') {   // Logged into your webpage and Facebook.
        $("#login-btn").hide();             // hide login button
        testAPI();
    } else {                                 // Not logged into your webpage or we are unable to tell.
        $("#login-btn").show();             // show login button
        document.getElementById('status').innerHTML = 'Please log ' +
            'into this webpage.';
    }
}

function checkLoginState() {               // Called when a person is finished with the Login Button.
    FB.getLoginStatus(function (response) {   // See the onlogin handler
        statusChangeCallback(response);
    });
}

function postButtonClicked(postText) {
    console.log(postText);

    FB.api('/me/feed', 'post', { message: body }, function(response) {
        if (!response || response.error) {
          alert('Error occurred');
        } else {
          alert('Post ID: ' + response.id);
        }
      });
}

function loadNewFeed() {
    console.log('loading news feed');
    FB.api(
        "/me/feed",
        function (response) {
          if (response && !response.error) {
            console.log(response);
          }
        }
    );
}

function loadPostContent(id) {
    console.log('loading post ' + '/' + id);
    FB.api(
        "/" + id,
        function (response) {
          if (response && !response.error) {
            console.log(response);
          }
        }
    );
}