const handleFormSubmit = function () {
    $("#output").val("loading...");

    let parameters = $("form.main").serialize();
    let myurl = "http://receipt.shefer.space/rest/get?" + parameters;
    let response = $.ajax({
        url: myurl,
        context: document.body,
        success: function (data) {
            let answerString = JSON.stringify(JSON.parse(data));
            $("#output").val(answerString);
        },
        error: function (xhr) {
            alert(JSON.stringify(xhr));
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