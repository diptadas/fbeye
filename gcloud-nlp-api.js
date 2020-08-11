function getTextEntities(text) {
  var url = "https://language.googleapis.com/v1/documents:analyzeEntities?key=" + apiKey;

  var nlpRequest = {
    "document": {
          "type": "PLAIN_TEXT",
          "content": ""
        }
  }

  nlpRequest.document.content = text;
  console.log(nlpRequest);

  var textEntities = [];

  $.ajax({
    url: url,
    type: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(nlpRequest),

    success: function (data) {
      console.log(data);
      for (i in data.entities) {
        textEntities[i] = data.entities[i].name;
      }
      console.log(textEntities);
    },

    error: function (request) {
      console.error(request.responseJSON.error);
      alert("Failed to load gcloud data, please try again or use dummy data.");
    }
  });
}
