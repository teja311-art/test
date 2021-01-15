//server.js

//Import all dependencies

var express = require('express');
var app     = express();
var server  = require('http').Server(app);
var io      = require('socket.io')(server);

//tell express where to serve static files from
app.use(express.static(__dirname+ '/public'));

server.listen(9999);
console.log('its going down in 9999');

//allow CORS
app.all('*', function(req, res, next)
{
    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control_Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control_Allow-Header', 'Content-type,Accept,X-Access-Token,X-Key');
    if(req.method == 'OPTIONS')
    {
        res.status(200).end();
    }
    else
    {
        next();
    }
});

app.get('/',function(req, res)
{
    //send the index.html in our public directory
    res.sendfile('index.html');
});

//Listen for connection
io.on('connection',function(socket)
{
    socket.on('chat message', function(msg)
    {
        io.emit('chat message',msg);
    });
});