const handleFormSubmit = function () {
    let parameters = getFormParameters();
    let myurl = "http://receipt.shefer.space/rest/get?" + parameters;
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
    //for (let key of parameters.keys()) {
    $("input#" + "fn").val(parameters.get("fn"));
 	$("input#" + "i").val(parameters.get("i"));
 	$("input#" + "fp").val(parameters.get("fp"));
 	$("input#" + "s").val(parameters.get("s"));

 	var n = parameters.get("t").length;
 	var time = parameters.get("t").substr(n-4,2) + ":" + parameters.get("t").substr(n-2,2);
 	var date = parameters.get("t").substr(0,4) + "-" + parameters.get("t").substr(4,2) + "-" +parameters.get("t").substr(6,2); 
 	
 	$("input#" + "t").val(time);
 	$("input#" + "d").val(date);
};

$(document).ready(function () {
    loadParameters();
});

const getFormParameters = function () {

	var FN = document.querySelector('#fn');
	var FD = document.querySelector('#i');
	var FP = document.querySelector('#fp');
	var S  = document.querySelector('#s'); 
	var Time = document.querySelector('#t');
	var DateF = document.querySelector('#d');
	let parameters = "fn=" + FN.value + "&i=" + FD.value + "&fp=" + FP.value + 	"&s=" + S.value + 
	"&t=" + DateF.value.split('-').join('') + "T" + Time.value.split(':').join('');
	
    return parameters;
};

const handleShare = function () {
    let location = new URL(window.location.href);
    let link = location.origin + location.pathname + "?" + getFormParameters();
    history.pushState(null, null, link);
};
