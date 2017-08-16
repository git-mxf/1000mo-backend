var express = require('express');
var router = express.Router();
var User = require("../models/userM.js");
var mongoose = require('mongoose');
var md5 = require('md5');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/regist4ajax', function(req, res, next) {
  //接收数据
  let username = req.body.username;
  let psw = md5(req.body.psw);
  var result = {
    code:0,
    msg:"注册失败了"
  }

  //生成model对象
  var UserModel = mongoose.model('user', User);

    UserModel.findOne({username: username},function(err, userItem){
      if(userItem){
        var result = {
          code:0,
          msg:"用户名已被占用"
        }
        res.send(JSON.stringify(result));
        return;
      } else {
          UserModel.create({username: username, psw: psw, date:new Date()},function(err){
            if(err){
              console.log(err);
              res.send(JSON.stringify(result));
              return;
            }
            result = {
              code:1,
              msg:"注册成功了"
            }
            res.send(JSON.stringify(result));
          })
      }
    })
});

router.post('/login4ajax', function(req, res, next) {
//接收数据
  let username = req.body.username;
  let psw = md5(req.body.psw);

  var UserModel = mongoose.model('user', User);
    UserModel.findOne({username: username, psw: psw},function(err, userItem){
        if(err){
          var result = {
              code:0,
              msg:"登录失败了"
              }
          res.send(JSON.stringify(result));
          return;
        }
        if(userItem) {
            var result = {
                code:1,
                msg:"登录成功了"
                }
          res.send(JSON.stringify(result));
        } else{
            var result = {
                code:0,
                msg:"您的用户名或密码不对。"
                }
          res.send(JSON.stringify(result));
        }
    })

})

module.exports = router;
