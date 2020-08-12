var alreadyLoggedIn = false;
var firstTimeLogin = true;

function readHomeContent() {
    cancelRead();

    if (alreadyLoggedIn) {
        document.getElementById('home-heading').innerHTML = "Home";
        $("#home-login").hide();                 // hide login section

        document.getElementById('status').innerHTML = 'Welcome ' + loginName + '!';
        document.getElementById('direction').innerHTML = "Use left and right arrow to navigate between tabs.";

        if (firstTimeLogin) {
            read('Welcome ' + loginName + " to Facebook assistant. This application is developed by Dipta Das, Nurul Karim Rafi and Rofiqul Islam at Baylor University");
            firstTimeLogin = false;
        }

        read("Use left and right arrow to navigate between tabs.");
    } else {
        document.getElementById('home-heading').innerHTML = "Login";
        $("#home-login").show();                 // show login section

        document.getElementById('status').innerHTML = 'Please login to continue';
        document.getElementById('direction').innerHTML = "";

        read("Please login to continue");
    }
}

$("#login-btn").click(function () {
    if (document.getElementById('username').value != "" && document.getElementById('password').value != "") {
        alreadyLoggedIn = true;
        readHomeContent();
    } else {
        cancelRead();
        beep();
        read("Invalid username or password. Please try again.");
        setTimeout(function () {
            $("#home-tab-btn").click();
        }, 5000);
    }
});

$("#username").keypress(function (event) {
    if (event.key == "Enter") {
        $("#password").focus();
        read("type your password and press enter");
    } else {
        cancelRead();
        read(event.key);
    }
});

$("#password").keypress(function (event) {
    if (event.key == "Enter") {
        $("#login-btn").focus();
        read("press Enter to login");
    }
});
