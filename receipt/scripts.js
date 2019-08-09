const handleFormSubmit = function () {
    let parameters = getFormParameters();
    let myurl = "http://receipt.shefer.space/rest/get?" + parameters;
    $("#submit").attr('disabled', true); 
    setTimeout(function() { 
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
    for (let key of parameters.keys()) {
        $("input#" + key).val(parameters.get(key));
    }
};

$(document).ready(function () {
    loadParameters();
});

const getFormParameters = function () {
    return $("form.main").serialize();
};

const handleShare = function () {
    let location = new URL(window.location.href);
    let link = location.origin + location.pathname + "?" + getFormParameters();
    history.pushState(null, null, link);
};
