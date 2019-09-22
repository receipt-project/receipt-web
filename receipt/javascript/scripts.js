var REST_ENDPOINT = "/rest";
var RECEIPT_DATETIME_FORMAT = "YYYYMMDDTHHmm";

/**
 * Serializes form and performs request to rest-api to fetch receipt data.
 */
const handleFormSubmit = function () {
  $("#submit").attr('disabled', true);
  setTimeout(function () {
    $("#submit").attr('disabled', false);
  }, 5000);
  $.ajax({
    url: REST_ENDPOINT + `/get?${app.getQueryParameters()}`,
    context: document.body,
    success: function (data) {
      let answer = JSON.parse(data);
      app.items = answer.items;
      app.meta = answer.meta;
      app.currentTab = "TAB_TABLE";
      console.log(JSON.stringify(answer));
    },
    error: function (xhr) {
      alert("Error! Could not perform request");
      let answerString = JSON.stringify(xhr);
      console.log(answerString);
    }
  });
};

/**
 * Serializes form and sets is as query to the address line
 */
const handleShare = function () {
  let url = new URL(window.location.href);
  let link = url.origin + url.pathname + "?" + app.getQueryParameters();
  window.history.pushState(null, null, link);
};

/**
 * Return ajax future
 */
const loadCards = function () {
  return $.ajax({
    url: REST_ENDPOINT + "/report",
    type: 'PUT',
    contentType: 'application/json',
    data: '{"meta":{},"items":{"price_min": 50000}}',
    context: document.body,
    success: function (data) {
      console.log("Received recent receipts ... " + data);
      let answer = JSON.parse(data);
      answer = answer.slice(-100).map(it => it.meta).slice(-12).reverse();
      app.cards = answer;
    },
    error: function (xhr) {
      console.log("Could not receive recent receipts!");
      let errorString = JSON.stringify(xhr);
      console.log(errorString);
    }
  });
};

