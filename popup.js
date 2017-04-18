
var base_url = 'https://wt-a60565eb9177ca77ab4ed49dd4bd62d9-0.run.webtask.io/stats?url=';

function callApi(url, done) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		var res = '';

	    if (this.readyState == 4 && this.status == 200) {
	       // Typical action to be performed when the document is ready:
	       // document.getElementById("demo").innerHTML = xhttp.responseText;
	       res = xhttp.responseText;
	    }

	    done(res);
	};
	xhttp.open("GET", base_url + url, true);
	xhttp.send();

	// d = document;

	// var f = d.createElement('form');
	// f.action = base_url + url;
	// f.method = 'post';
	// d.body.appendChild(f);
	// f.submit();
}

document.addEventListener('DOMContentLoaded', function() {
	var updateStats = document.getElementById('updateStats');
  	var stat = document.getElementById('stat');

    updateStats.addEventListener('click', function() {

    	stat.innerHTML = '<img src="load.gif" height="32" width="32" />';	
    	chrome.tabs.getSelected(null, function(tab) {

    		callApi(tab.url, function(res) {
    			if (res) {
    				var json = JSON.parse(res);

    				stat.innerHTML = '<p>Url: <b>' + json.url + 
    					'</b></p> has been saved <b>' + json.count + '</b> time' + 
    					(json.count > 1 ? 's' : '');	
    			}
    		});

    	});
  	}, false);
}, false);
