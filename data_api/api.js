var https = require('https');
var express = require('express');
var router = express.Router();
var spider = require('./spider')
//https://marketapi.1000mo.cn/sys/set?version=30000
//https://marketapi.1000mo.cn/market/n2lo7y7m/newUser/products?version=30000
//https://marketapi.1000mo.cn/market/n2lo7y7m/guess/products?expand=shop&select=*,shop.*&offset=10&version=30000

//轮播
router.get('/banner', function(req, res){
	spider('/market/n2lo7y7m/ad/banners?version=30000',function(data){
		res.send(data);
	})
})

//背景
router.get('/bg1', function(req, res){
	spider('/market/n2lo7y7m/activityAds?version=30000',function(data){
		res.send(data);
	})
})

router.get('/bg2', function(req, res){
	spider('/sys/set?version=30000',function(data){
		res.send(data);
	})
})

//菜单
router.get('/muen', function(req, res){
	spider('/market/n2lo7y7m/channels?version=30000',function(data){
		res.send(data);
	})
})

router.get('/muen2', function(req, res){
	spider('https://marketapi.1000mo.cn/market/n2lo7y7m/sections?version=30000',function(data){
		res.send(data);
	})
})

//新人专享
router.get('/newperson', function(req, res){
	spider('/market/n2lo7y7m/newUser/products?version=30000',function(data){
		res.send(data);
	})
})

//集市推荐
router.get('/jishi', function(req, res){
	spider('/market/n2lo7y7m/home/products?isRecommend=true&expand=shop&select=*,shop.*&version=30000',function(data){
		res.send(data);
	})
})

//猜你喜欢
router.get('/like', function(req, res){
	spider('/market/n2lo7y7m/guess/products?expand=shop&select=*,shop.*&version=30000',function(data){
		res.send(data);
	})
})

//限量秒杀
router.get('/xianliang', function(req, res){
	var id = req.query.id
	spider('/market/section/'+ id +'/products?expand=shop&select=*,shop.*&orderBy=0&version=30000',function(data){
		res.send(data);
	})
})

//全部列表
router.get('/shoplist', function(req, res){
	spider('/market/n2lo7y7m/categorys?limit=999&version=30000',function(data){
		res.send(data);
	})
})

//列表
router.get('/shoplistchild', function(req, res){
	var id = req.query.id
	spider('/market/n2lo7y7m/list/products?expand=shop&select=*,shop.*&categoryId='+id+'&orderBy=0&version=30000',function(data){
		res.send(data);
	})
})

//详情
router.get('/detail', function(req, res){
	var id = req.query.id;
	console.log(id);
	spider('/product/'+id+'?expand=shop&select=*,shop.*&version=30000',function(data){
		res.send(data);
	})
})

//详情
router.get('/shopcar', function(req, res){
	spider('/market/n2lo7y7m/hot/products?expand=shop&select=*,shop.*&version=30000',function(data){
		res.send(data);
	})
})



module.exports = router


