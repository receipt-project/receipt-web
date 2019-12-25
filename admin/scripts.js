const getScriptName = function ()
{
    var str = $("#script_name").val(); 
    
    if (str.match(/^\w+$/g)) {
    	performAction(str);
    } else {
    	$("textarea").html("Неверное имя скрипта! Попробуйте снова ");
    }
}

const performAction = function(action)
	{
		handleAndPrint('https://private.shefer.space/management/' + action); 
	}

const handleAndPrint = function(myurl){

	$.ajax({
        url: myurl,
        context: document.body,
        success: function (data) {
            let answer = data;
            $("textarea").html(answer);
        },
        error: function (xhr) {
            alert("Error! Could not perform request");
            let errorString = JSON.stringify(xhr);
            console.log(errorString);
        }
    });
};
