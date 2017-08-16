var express = require('express');
var router = express.Router();
var Cart = require('../models/CartM');
var mongoose = require('mongoose');
var md5 = require('md5');

/* GET home page. */
// router.get('/', function(req, res, next) {
// 	// 判断用户是否登录了
// 	var username = req.cookies["username"];
// 	var sign = req.cookies["sign"];
// 	if(username == null || sign == null || sign != md5(username)) {
// 		res.redirect("/users/login");
// 		return;
// 	}

// 	res.render("cart");
// });

router.get('/list', function(req, res, next) {
	var username = req.query.username;

	var CartModel = mongoose.model('cart', Cart);
	CartModel.find({username:username}, function(err, items){
		res.send(JSON.stringify(items));
	})
});

router.get('/add', function(req, res, next) {
	var username = req.query.username;
	var goodsname = req.query.goodsname;
	var price = req.query.price;
	var count = req.query.count;

	var result = {
		code: 0,
		msg: "添加购物车失败了"
	}
	var CartModel = mongoose.model('cart', Cart);
	CartModel.findOne({username:username, goodsname:goodsname}, function(err, cartItem){
		if(cartItem) {
			cartItem.count += count;
			cartItem.save(function(err){
				result = {
				  	code: 1,
				  	msg: "添加购物车成功了"	
				}
				res.send(JSON.stringify(result));
			})
		} else {
			CartModel.create({username: username, goodsname: goodsname, price:price, count:count }, function(err) {
				if(err) {
					console.log(err);
					res.send(JSON.stringify(result));
					return;
				}
				result = {
				  	code: 1,
				  	msg: "添加购物车成功了"	
				}
				res.send(JSON.stringify(result));
			})
		}
	})
});

router.get('/remove', function(req, res, next) {

});

module.exports = router;
