var app = require('express')();

const server = app.listen(3001, function () {
    console.log('server running on port 3001');
});

const io = require('socket.io')(server);

var data = {
    username: "username test",
    address: "123456789",
    fullname: "123",
    phone: "asdasd",
    access_token: "112233",
    refresh_token: "xczczx"
}

var users = [{
    socket_id: 1,
    username: "username test",
}]

exports.broadcast_all_staff = data => {
    console.log("Boreadcast to all staff connected: ");
    console.log(data);
    socket_io.to("staff_room").emit('UPDATE', data);
}

exports.broadcast_driver = (username, data) => {
    console.log("Boreadcast to driver connected: " + username);
    console.log(data);
    var socketid = "";
    users.forEach(user => {
        if (user.username == username)
            socketid = user.socket_id;
    });

    console.log("socket ID: " + socketid);

    socket_io.to(socketid).emit('UPDATE', data);
}

var socket_io = io.on('connection', function (socket) {
    console.log('a user connected: ' + socket.id);
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    socket.on('REGISTER', function (data) {
        console.log("REGISTER: socket.id: " + socket.id);
        console.log(data);

        if (data.role == "admin") {
            console.log("Socket " + socket.id + " joined admin rom");

            socket.join('admin_room');
            var user = {
                socket_id: socket.id,
                username: data.username,
            }
            users.push(user);

        } else if (data.role == "staffs") {
            console.log("Socket " + socket.id + " joined staff rom");

            socket.join("staff_room");
            var user = {
                socket_id: socket.id,
                username: data.username,
            }
            users.push(user);

        } else if (data.role == "driver") {
            console.log("Socket " + socket.id + " joined driver rom");

            socket.join("driver_room");
            var user = {
                socket_id: socket.id,
                username: data.username,
            }
            users.push(user);

        } else console.log("Error: Unknow user role: " + data.role);
    });

    //io.to(room).emit(data);
    /*
    socket.emit('UPDATE', {
        username: data.username,
        address: "123456789",
        fullname: "123",
        phone: "asdasd",
        access_token: "112233",
        refresh_token: "xczczx"
    });
    */
});