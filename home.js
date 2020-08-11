var alreadyLoggedIn = false;

function readHomeContent() {
    if (alreadyLoggedIn) {
        $("#home-login").hide();                 // hide login section
        document.getElementById('status').innerHTML = 'Welcome ' + loginName + '!';
        document.getElementById('direction').innerHTML = "Use left and right arrow to navigate between tabs.";
    } else {
        $("#home-login").show();                 // show login section
        document.getElementById('status').innerHTML = 'Please login using Facebook';
        document.getElementById('direction').innerHTML = "";
    }
    read(document.getElementById('status').innerHTML);
    read(document.getElementById('direction').innerHTML);
}

$("#login-btn").click(function () {
    alreadyLoggedIn = true;
    readHomeContent();
});
