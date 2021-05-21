var express = require('express');
var request = require('request');
var app = express();
var path = require('path');

app.set('view engine','hbs');
app.use(express.urlencoded());
// app.use(express.static(staticpath));
// respond with "hello world" when a GET request is made to the homepage

app.get('/',function (req, res) {
    res.render('index.hbs');
});   



app.post('/',function(req,res){
    let place=req.body.place;
    request("http://api.weatherapi.com/v1/current.json?key=bf1181a0894e4bd49a7183037210905&q=${place}",function(err,response,body){
    result=JSON.parse(body);
    console.log(result);
    console.log(result.current.temp_c)
    let ntemp=result.current.temp_c;
    let con=result.current.condition.text;
    res.render('index.hbs',{temp : ntemp ,'condition':con});
    // console.log(body);
    // console.log(result);
    // console.log(result.current.temp_c);
    // res.send(result);
    });
});

app.get('/',function (req, res) {
    res.render('index.hbs');  
});

app.listen(8000,function (){
    console.log("port running on 8000");
});