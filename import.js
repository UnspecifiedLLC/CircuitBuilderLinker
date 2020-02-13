console.log("Injected");
function get(url) {
    console.log("inside get");
    url = atob(url);
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    var template;
    fetch(url, requestOptions)
    .then(response => response.text())
    .then(result => {
        template = result;
        ImportDesigner(result);
    })
    .catch(error => {
        console.log("Trying to import again, got an error", error);
        setTimeout(()=>{get(btoa(url))},2000);
    });
}
$(".apply-button").hide();
var oldSetState = setState;
setState = (value, noChange)=>{
	!noChange && value && changedTab();
    $('#designerstate').html(value);
    $('.body').find('.apply-button').tclass('blink', value ? true : false);
	value && setTimeout(()=>{EMIT('flow.apply')}, 500);
}
setTimeout(()=>{$("button.exec.onlyicon.red").hide()}, 2000);
