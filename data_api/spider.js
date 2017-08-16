var https = require('https');
var express = require('express');
var router = express.Router();



function spider(path,callback){
		var options = {
		hostname:'marketapi.1000mo.cn',
		port:443,
		path:path,
		method:'GET'
	};

	var req = https.request(options,function(res){
		var data='';
		res.on('data',function(msg){
			data+=msg;
		})
		res.on('end',function(){
			callback(data)
		})
	})
	req.end();
}

module.exports = spider


