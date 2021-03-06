var express = require('express');
var app = express();
var port = process.env.PORT || 3000;  
var request = require("request");

var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};

app.use(express.static(__dirname + '/'));

function datenow(){
	var today = new Date();
	var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
	dd = '0'+dd
} 

if(mm<10) {
	mm = '0'+mm
} 

return yyyy + '-' + mm + '-' + dd;
}

app.get('/', function (req, res) {
	res.sendFile("/page.html",{root: __dirname});
});

app.listen(port, function () {
	console.log("ligado");
});

app.get('/apijson', function (req, res) {
	var codes=req.query.codes;
//o

var resp=res;

function onereq(code){
	var date=datenow();
	var date2=datenow();
	date=date.replace(date.split("-")[0],""+(parseInt(date.split("-")[0])-1));

	options = { method: 'GET',
	"rejectUnauthorized": false, 
	url: "https://www.quandl.com/api/v3/datasets/WIKI/"+code+"/data.json?api_key=yZuJL_bzkHHvht37bqqy&start_date="+date+"&end_date="+date2,
	proxy: process.env.HTTP_PROXY
};

return new Promise(function (resolve, reject) {
	request(options, function (error, response, body) {
		if (error) throw new Error(error);

		var jsonobj=JSON.parse(body);

		if(jsonobj.dataset_data){
			var jsonobj=jsonobj.dataset_data.data;
			var array=[];

			for(var i=0;i<jsonobj.length;i++){
				array.push({x: jsonobj[i][0], y: jsonobj[i][1]});
			}

			jsonobj={};
			jsonobj[code]=array;
			resolve(jsonobj)
		//console.log(jsonobj.dataset_data.data);
	}else
	resp.redirect("/apijson?code="+code);

});

})

}


async function multireq(codes,resp) {
	obj={}
	console.log(codes)
	for(var i=0;i<codes.length;i++){
	console.log(codes[i])
	var res=await onereq(codes[i]);

	var key=Object.keys(res)[0];
	obj[key]=res[key];
	
	}

	if(Object.keys(res).length==1)
	console.log(obj)

	resp.json(obj)	
};

multireq(codes,res)

});
