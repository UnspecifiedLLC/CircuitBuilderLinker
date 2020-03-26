console.log("Injected");
addCss("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css");
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
