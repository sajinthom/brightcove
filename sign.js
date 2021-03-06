function sign(url,options){
	var algorithm = options.algorithm;
	var key = options.key;
	var fieldDelimiter = '~';
	var expiry = options.expiry;
	var startTime = options.startTime;
	var endTime = startTime + ;
	var rawurl = url;
	var acl = url.replace("https://racingvic-i.akamaized.net", "/");
	var acl = acl.replace("index.m3u8", "*"
	
	if (expiry) {
                if (!startTime) {
                    startTime = parseInt(Date.now() / 1000);
                } 
                endTime = parseInt(startTime) + parseInt(expiry);
            } else {
                throw new Error('You must provide endTime or windowSeconds')
    }
	console.log("    Key/Secret      : " + key)
	console.log("    Algo            : " + algorithm)
	console.log("    Start Time      : " + startTime)
	console.log("    Window(seconds) : " + expiry)
	console.log("    End Time        : " + endTime)
	console.log("    Field Delimiter : " + fieldDelimiter)
	console.log("    ACL             : " + acl)
	console.log("    Raw URL         : " + rawurl)

	var newToken = []
	var hashSource = []
    if (startTime) {
		newToken.push("st=" + startTime)
    }
    newToken.push("exp=" + endTime)

	newToken.push("acl=" + acl)
	console.log("    newToken : " + newToken)
	hashSource = newToken.slice();
	key = hexStringToByte(key) //this is the vital part - convert hex string to binary string
	algorithm = algorithm.toLowerCase();
	
	var hmac = forge.hmac.create();
	hmac.start(algorithm, key);
	hmac.update(hashSource.join(fieldDelimiter));

	var hash = hmac.digest().toHex(); 
	newToken.push("hmac=" + hash);
	
	newToken = newToken.join(fieldDelimiter);

	var signedUrl = rawurl + "?hdnea=" + newToken;
	console.log("    signed url  : " + signedUrl);
		
	function hexStringToByte(str) {
	  if (!str) {
		return new Uint8Array();
	  }
	  
	  
	  var key = '';
	  for (var i = 0, len = str.length; i < len; i+=2) {
		key += String.fromCharCode((parseInt(str.substr(i,2),16)));
	  }
	  
	return key;
	}
}

