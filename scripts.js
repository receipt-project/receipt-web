const handleFormSubmit = function () {
    $("#output").val("loading...");

    let parameters = getFormParameters();
    let myurl = "http://receipt.shefer.space/rest/get?" + parameters;
    let response = $.ajax({
        url: myurl,
        context: document.body,
        success: function (data) {
            let answer = JSON.parse(data);
            $("#output").val(JSON.stringify(answer));
            printToTable(answer);
            setUrlParameters();
        },
        error: function (xhr) {
            alert("Error! Could not perform request");
            let answerString = JSON.stringify(xhr);
            $("#output").val(answerString);
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
        let row = `<tr><th scope="row">${id}</th><td>${text}</td><td>${price}</td><td>${amount}</td></tr>`
        tbody.append(row);
    }
}

const handleOutputCopy = function () {
    $("#output").select();
    document.execCommand("copy");
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

function getFormParameters() {
    return $("form.main").serialize();
}

const setUrlParameters = function () {
    let location = new URL(window.location.href);
    let link = location.origin + location.pathname + "?" + getFormParameters();
    history.pushState(null, null, link);
}
