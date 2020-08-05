function getImageLabels(imageUri) {
    var url = "https://vision.googleapis.com/v1/images:annotate?key=YOUR_API_KEY";
    var requestData = 
    {
        "requests": [
          {
            "image": {
              "source": {
                "imageUri": ""
              }
            },
            "features": [
              {
                "type": "LABEL_DETECTION",
                "maxResults": 5
              }
            ]
          }
        ]
    };

    requestData.requests[0].image.source.imageUri = imageUri;

    $.ajax({
        url: url,
        type: "POST",
        headers: {
            'Content-Type':'application/json'
        },
        data: JSON.stringify(requestData),
        success: function(data) {
            var labels = [];
            var annotations = data.responses[0].labelAnnotations;
            for (var key of Object.keys(annotations)) {
                labels[key] = annotations[key].description;
            }
            console.log(labels);
            return labels;
        },
        error: function (request) {
            console.error(request.responseJSON.error);
        }
    });
}

function getKeywords(text) {

}