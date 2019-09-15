var REST_ENDPOINT = "/rest";

const timestampToDate = function (timestamp) {
  let date = new Date();
  date.setTime(timestamp * 1000);
  return date;
};

/**
 * Gets datetime in format yyyymmddThhmm and parse it into Date object
 * @param receiptTime string containing date and time in format yyyymmddThhmm
 * @returns {null|Date}
 */
const receiptTimeToDate = function (receiptTime) {
  let date = new Date();
  if (receiptTime != null && receiptTime.match(/^\d{4}\d{2}\d{2}T\d{2}\d{2}$/g)) {
    let year = parseInt(receiptTime.substr(0, 4));
    let month = parseInt(receiptTime.substr(4, 2)) - 1;// 0-based month required
    let day = parseInt(receiptTime.substr(6, 2));
    let hour = parseInt(receiptTime.substr(receiptTime.length - 4, 2));
    let minute = parseInt(receiptTime.substr(receiptTime.length - 2, 2));
    date.setFullYear(year, month, day);
    date.setHours(hour, minute);
    return date;
  } else {
    return null;
  }
};

/**
 * Gets Date object and serializes it into string containing date and time in format yyyymmddThhmm
 * @param date The instance of Date class
 * @returns string containing date and time in format yyyymmddThhmm
 */
const dateToReceiptTime = function (date) {
  let year = date.getFullYear().toString();
  let month = (date.getMonth() + 1).toString().padStart(2, 0);
  let day = date.getDate().toString().padStart(2, 0);
  let hour = date.getHours().toString().padStart(2, 0);
  let minute = date.getMinutes().toString().padStart(2, 0);
  return `${year}${month}${day}T${hour}${minute}`;
};

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

