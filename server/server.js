const cors = require('cors');

const express = require('express');
const bodyParser = require('body-parser');

const PORT = 3000;
const loginApi = require('./routes/login-api')
const groupsApi = require('./routes/groups-api')
const roomsApi = require('./routes/rooms-api')
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/login', loginApi)
app.use('/groups', groupsApi)
app.use('/rooms', roomsApi)

app.get('/', function(req, res){
  res.send('hello from server')
})

app.post('/post-test', (req, res) => {
  console.log('Got body:', req.body);
  res.send("Got: " + req.body.username);
});

const http = require('http').Server(app);
const io = require('socket.io')(http);
const sockets = require('./socket.js');

sockets.connect(io, PORT);

http.listen(PORT, function(){
  console.log('server running on localhost:' + PORT)
})
