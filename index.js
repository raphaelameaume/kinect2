const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const Kinect2 = require('kinect2');

const kinect = new Kinect2();

if ( kinect.open() ) {
    console.log('kinect connected');

    kinect.on('bodyFrame', ( bodyFrame ) => {
        console.log('bodyFrame', bodyFrame.bodies.length);
    });

    kinect.openBodyReader();

    setTimeout( () => {
        kinect.close();
    }, 10000);
}

app.get('/', ( req, res ) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

http.listen(3008, () => {
    setInterval( () => {
        io.emit('message', 'Coucou');
    }, 2000);

    console.log('Server listening on 3008');
});