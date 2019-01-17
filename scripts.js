const handleFormSubmit = function () {
    $("#output").val("loading...");

    let parameters = getFormParameters();
    let myurl = "http://receipt.shefer.space/rest/get?" + parameters;
    let response = $.ajax({
        url: myurl,
        context: document.body,
        success: function (data) {
            let answerString = JSON.stringify(JSON.parse(data));
            $("#output").val(answerString);
            setUrlParameters();
        },
        error: function (xhr) {
            alert("Error! Could not perform request");
            let answerString = JSON.stringify(xhr);
            $("#output").val(answerString);
        }
    });
};

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
