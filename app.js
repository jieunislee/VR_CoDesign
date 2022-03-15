//For Camera
var fs = require('fs'); //file system
const options = {
	key: fs.readFileSync('./keys/key.pem'),
	cert: fs.readFileSync('./keys/cert.pem')
};

// Server Setting
var express = require('express');
var app = express();
var server = require('https').Server(options, app);
server.listen(8080, function(){
    console.log("Server Started at :8080");
});

app.get('/',function(req,res){
   res.render('index')
});

app.get('/sketch',function(req,res){
   res.render('sketch')
});

app.get('/mobile',function(req,res){
   res.render('mobile')
});
//
 app.get('/gyro',function(req,res){
    res.render('gyro')
 });

// Views
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname));


var io = require('socket.io')(server);

io.on('connection',function (socket) {
  console.log("We have a new client: " + socket.id);
  socket.on('mouse',function(data) {
      console.log("Received: 'mouse' " + data.x + " " + data.y + " ");
      io.emit('mouse', data);
		});

	socket.on('circle', function(data){
		console.log(data)
    io.emit('circle', data)
  });

	socket.on('test', function(data){
		console.log(data)
		io.emit('test', data)
	});
});
