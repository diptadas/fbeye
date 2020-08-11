apiKey = "";
gcloudImageLabels = [];

function getImageLabels(imageContents) {
  var url = "https://vision.googleapis.com/v1/images:annotate?key=" + apiKey;

  var requestData =
  {
    "requests": [
    ]
  };

  var requestTemplate = {
    "image": {
      "content": ""
    },
    "features": [
      {
        "type": "LABEL_DETECTION",
        "maxResults": 3
      }
    ]
  }

  // add image urls to request data
  for (i in imageContents) {
    singleRequest = JSON.parse(JSON.stringify(requestTemplate))
    singleRequest.image.content = imageContents[i];
    requestData.requests.push(singleRequest);
  };

  console.log(requestData);

  var failedLoadingImageLabels = false;

  $.ajax({
    url: url,
    type: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(requestData),

    success: function (data) {
      console.log(data);

      for (i in data.responses) {
        var response = data.responses[i];

        if (response && !response.error) {
          var labels = [];
          for (var key of Object.keys(response.labelAnnotations)) {
            labels[key] = response.labelAnnotations[key].description;
          }
          gcloudImageLabels.push(labels);
        } else {
          failedLoadingImageLabels = true;
          break;
        }
      };
    },

    error: function (request) {
      failedLoadingImageLabels = true;
      console.error(request.responseJSON.error);
    },

    complete: function (request) {
      if (failedLoadingImageLabels) {
        gcloudImageLabels = [];
        alert("Failed to load gcloud data, please try again or use dummy data.");
      } else {
        // done loading image labels
        onGCloudSuccess();
      }
    }
  });
}

function getKeywords(text) {

}