'use strict'

var Koa=require('koa')
var sha1=require('sha1')

var config={
  wechat:{
    appID:"wx945dcf353f0db3ac",
    appSecret:"9e8c95f3d2e0fba971a0d6b95b59d10e",
    token:"jiacer"
  }
}

var app=new Koa();

app.use(function *(next) {
  console.log(this.query)

  var token=config.wechat.token;
  var signature=this.query.signature;
  var nonce=this.query.nonce;
  var timestap=this.query.timestamp;
  var echostr=this.query.echostr;

  var str=[token,timestap,nonce].sort().join("")
  var sha=sha1(str)

  if(sha===signature){
    this.body=echostr+""
  }else {
    this.body='wrong'
  }
})

app.listen(1234)

console.log('Listening:1234');