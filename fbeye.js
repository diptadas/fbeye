$(document).ready(function () {
    console.log("ready");

    var url = 'http://www.texashillcountry.com';
    var apiUrl = 'https://graph.facebook.com/?ids=' + url;

    $.ajax({
        url: apiUrl,
        type: "GET",
        success: function (result) {
            console.log(result);

            // $.each(result, function (key, val) {
            //     console.log(key + ' - ' + val['share']['share_count']);
            //     var shareCount = val['share']['share_count'];
            //     console.log(shareCount);
            // });
        },
        error: function (error) {
            console.log(error);
        }
    });
});