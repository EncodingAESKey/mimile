function createCookie(key,value,expires,domain,secure){
	var cookieText = encodeURIComponent(key) + "=" + encodeURIComponent(value) + ";path=/";
	if(typeof expires == "number"){
		var date = new Date();
		date.setDate(date.getDate() + expires);
		cookieText += ";expires=" + date;
	}
	if(domain){
		cookieText += ";domain=" + domain;
	}
	if(secure){
		cookieText += ";secure";
	}
	document.cookie = cookieText;
}

function getCookie(key){
	var arr = document.cookie.split("; ");
	for(var i = 0; i < arr.length; i ++){
		var list = arr[i].split("=");
		if(list[0] == encodeURIComponent(key)){
			return decodeURIComponent(list[1]);
		}
	}
}
