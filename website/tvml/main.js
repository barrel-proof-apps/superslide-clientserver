function getDocument(url, cb) {
	var templateXHR = new XMLHttpRequest();
	templateXHR.responseType = "document";
	templateXHR.addEventListener("load", function() {
		cb(templateXHR.responseXML);
	}, false);
	templateXHR.open("GET", url, true);
	templateXHR.send();
	return templateXHR;
}

function pushDoc(document) {
	navigationDocument.pushDocument(document);
}

function showAlert() {
	getDocument("https://barrelproofapps.com/tvml/alertTemplate.tvml", function(doc) {
		pushDoc(doc)
	});
}
App.onLaunch = function(options) {
	// var templateURL = 'http://barrelproofapps.com/tvml/alertTemplate.tvml';
	// var templateURL = 'http://barrelproofapps.com/tvml/paradeTemplate.tvml';
	var templateURL = 'http://barrelproofapps.com/tvml/showcaseTemplate.tvml';
	// var templateURL = 'http://barrelproofapps.com/tvml/menuBar.tvml';
	getDocument(templateURL, function(doc){
		pushDoc(doc)
		var button = doc.getElementsByTagName("button").item(0)
		button.addEventListener("select", function(e) {
			var target = e.currentTarget;
			var texts = target.getElementsByTagName("text");
			if (texts.length > 0) {
				var name = texts.item(0).innerHTML;
			}
			var carousel = doc.getElementsByTagName("carousel").item(0)
			showAlert()
		})
	});
	// showAlert()
}

App.onExit = function() {
	console.log('App finished');
}
