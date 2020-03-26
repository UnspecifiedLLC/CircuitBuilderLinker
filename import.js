console.log("Injected");
addCss("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css");
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
function getIcons() {
	// var classes = document.styleSheets[0].rules || document.styleSheets[0].cssRules;
	var classes = Array();
	Array.prototype.slice.call(document.styleSheets).forEach(function(sheet){
		classes = classes.concat(Array.prototype.slice.call(sheet.cssRules));
	});
	var icons = {};
	for (var x = 0; x < classes.length; x++) {
		var cls = classes[x];
		var sel = cls.selectorText;

		if (sel && sel.substring(0, 4) == '.fa-') {
			sel = sel.split(',');
			var val = cls.cssText ? cls.cssText : cls.cssText.style.cssText;
			var a = val.match(/[^\x00-\x7F]+/);
			if (a)
				sel.forEach(function(s){
					s = s.trim();
					s = s.substring(4, s.indexOf(':')).trim();
					icons[s] = a.toString();
				});
		}
	}
	// console.log(icons);
	return icons;
}

function addCss(fileName) {

  var head = document.head;
  var link = document.createElement("link");

  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = fileName;

  head.appendChild(link);
}

var script = document.createElement('script');
script.setAttribute('src', 'https://www.googletagmanager.com/gtag/js?id=UA-114416830-4');
script.setAttribute('type', 'text/javascript');
document.getElementsByTagName('head')[0].appendChild(script);
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-114416830-4');
