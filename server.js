var express = require("express");
var path = require("path");
var app = express();

const port = 3001;

app.use(express.static(path.join(__dirname, "./public/")));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");
});

app.listen(port,function(){
    console.log("listening on *:"+ port);
});