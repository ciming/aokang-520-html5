var express = require('express');
var fs=require("fs");
var router = express.Router();

var http = require('http');
var wechat_cfg = require('../config/wechat');
var cache = require('memory-cache');
var sha1 = require('sha1'); 

var signature = require('../controller/signature');


/* GET home page. */
router.get('/', function(req, res, next) {
    var url = req.protocol + "://" + req.get('Host') + req.url //获取当前url
	signature.sign(url,function(signatureMap){
		signatureMap.appId = wechat_cfg.appid;
		console.log(signatureMap)
		res.render('index',signatureMap);
	});
});



router.get('/pic/:picId', function(req, res, next){
	
	var url = req.protocol + "://" + req.get('Host') + req.url; //获取当前url
	var picId="/images/"+req.params.picId+".jpg";
	signature.sign(url,function(signatureMap){
		signatureMap.appId = wechat_cfg.appid;
		signatureMap.picUrl=picId
		res.render('pic',signatureMap);
	});
})

router.post('/pic', function(req, res, next) {
	var imgData = req.body.imgData;
	//过滤data:URL
	var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
	var dataBuffer = new Buffer(base64Data, 'base64');
	var timemap=new Date().getTime();
	fs.writeFile("./public/images/"+timemap+".jpg", dataBuffer, function(err) {
		if(err){
		  res.send(err);
		}else{
		  res.send({"id":timemap});
		}
	});
});



module.exports = router;
