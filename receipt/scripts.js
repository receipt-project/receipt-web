const handleFormSubmit = function () {
  let parameters = getFormParameters();
  let myurl = "http://receipt.shefer.space/rest/get?" + parameters;
  $("#submit").attr('disabled', true);
  setTimeout(function () {
    $("#submit").attr('disabled', false);
  }, 5000);
  $.ajax({
    url: myurl,
    context: document.body,
    success: function (data) {
      let answer = JSON.parse(data);
      printToTable(answer);
      console.log(JSON.stringify(answer));
    },
    error: function (xhr) {
      alert("Error! Could not perform request");
      let answerString = JSON.stringify(xhr);
      console.log(answerString);
    }
  });
};

const printToTable = function (data) {
  const tbody = $("#result-table tbody");
  tbody.empty();
  const items = data.items;
  for (let i = 0; i < items.length; i++) {
    let id = i + 1;
    let text = items[i].text;
    let price = items[i].price;
    let amount = items[i].amount;
    let row = `<tr><th scope="row">${id}</th><td>${text}</td><td>${price}</td><td>${amount}</td></tr>`;
    tbody.append(row);
  }
  const tmetabody = $("#result-meta-table tbody");
  tmetabody.empty();
  const meta = data.meta;
  for (let property in meta) {
    if (meta.hasOwnProperty(property)) {
      let row = `<tr><th scope="row">${property}</th><td>${meta[property]}</td></tr>`;
      tmetabody.append(row);
    }
  }
};

const loadParameters = function () {
  let url = new URL(window.location.href);
  let parameters = url.searchParams;
  $("input#fn").val(parameters.get("fn"));
  $("input#i").val(parameters.get("i"));
  $("input#fp").val(parameters.get("fp"));
  $("input#s").val(parameters.get("s"));
  var n = parameters.get("t").length;
  var time = parameters.get("t").substr(n - 4, 2) + ":" + parameters.get("t").substr(n - 2, 2);
  var date = parameters.get("t").substr(0, 4) + "-" + parameters.get("t").substr(4, 2) + "-" + parameters.get("t").substr(6, 2);
  $("input#time").val(time);
  $("input#date").val(date);
};

$(document).ready(function () {
  setDefaultTime();
  loadParameters();
});

const getFormParameters = function () {
  let fn = document.querySelector('#fn');
  let fd = document.querySelector('#i');
  let fp = document.querySelector('#fp');
  let s = document.querySelector('#s');
  let time = document.querySelector('#time');
  let dateF = document.querySelector('#date');
  return "fn=" + fn.value +
    "&i=" + fd.value +
    "&fp=" + fp.value +
    "&s=" + s.value +
    "&t=" + dateF.value.split('-').join('') +
    "T" + time.value.split(':').join('');
};

const handleShare = function () {
  if (dataIsValid()) {
    let location = new URL(window.location.href);
    let link = location.origin + location.pathname + "?" + getFormParameters();
    history.pushState(null, null, link);
  }
};

const setDefaultTime = function () {
  var timeField = document.querySelector('#time');
  var dateField = document.querySelector('#date');
  var date = new Date();
  timeField.value =
    (date.getHours().toString().length < 2 ? ("0" + date.getHours().toString()) : date.getHours().toString()) +
    ':' + (date.getMinutes().toString().length < 2 ? ("0" + date.getMinutes().toString()) : date.getMinutes().toString());
  dateField.value =
    date.getFullYear().toString() +
    '-' + (date.getMonth() + 1).toString().padStart(2, 0) +
    '-' + date.getDate().toString().padStart(2, 0);
};

const dataIsValid = function () {
  let parameters = ['#fn', '#i', '#fp', '#s'];
  var checked = 0;
  for (let i in parameters) {
    if (document.querySelector(parameters[i]).value.match(/^\d+$/g)) {
      checked += 1;
    }
  }
  var time = document.querySelector('#time').value.split(':').join('');
  if (time[0] < "3" && time[2] < "6" && time.match(/^\d+$/g)) {
    checked += 1;
  } else {
    alert("Проверьте значение времени!");
  }
  if (checked == 5) {
    return true;
  } else {
    alert("Проверьте правильность введенных данных! Значения полей должны содержать только цифры!");
    return false;
  }
};
