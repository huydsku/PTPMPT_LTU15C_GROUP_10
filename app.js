const express = require('express')
const app = express()
const fetch = require('node-fetch');


//set the template engine ejs
app.set('view engine', 'ejs')

//middlewares
app.use(express.static('public'))

var user = 0
var list_id = []


//routes
app.get('/', (req, res) => {

    fetch('http://api.openweathermap.org/data/2.5/weather?q=Hanoi&APPID=c96240e8d3499ee5e3e1c2c7078ed08c&units=metric')
    .then(response => response.json())
    .then(data => {
            var a = new Date(data.dt)
            var date = a.getDate() + "/" + a.getMonth() + "/" + a.getFullYear()
            var time = a.getHours() + ":" + a.getMinutes() + ":" + a.getMinutes()
            res.render('index',{ 
                dt: date,
                time: time,
                temp: data.main.temp,
                desc: data.weather[0].main,
                feels_like: data.main.feels_like,
                temp_min: data.main.temp_min,
                temp_max: data.main.temp_max,
                pressure: data.main.pressure,
                humidity: data.main.humidity,
            })
        }
    );	
})

app.get('/weather', (req, res) => {
	res.json({ id: user })
})


//Listen on port 3000
server = app.listen(3000)



//socket.io instantiation
const io = require("socket.io")(server)

var process = 0

var exist = false

//listen on every connection
io.on('connection', (socket) => {
    console.log('New user connected')

    socket.on('disconnecting', (reason) => {
        list_id.pop(socket.userID)
    })
    

    socket.on('new_user', (data) => {
        list_id.push(data.userID)
        socket.userID = data.userID
    })
    

    //default username

    setTimeout(function(){ 
        if (process == 0 && list_id.length == 1){
            console.log("1")
            io.sockets.emit('change_process', {userID : list_id[process]});
        } 
    }, 500)

    setTimeout(function(){ 
        socket.on('change_process', (data) => {
            
            if(data.exist != "1"){
                process = process + 1
            }
            if (process + 1 > list_id.length - 1){
                process = 0
            }else{
                process = process + 1
            }
    
            io.sockets.emit('change_process', {userID : list_id[process]});
        })
    }, 1000)
    

    //listen on change_username


    // //listen on new_message
    // socket.on('new_message', (data) => {
    //     //broadcast the new message
    //     io.sockets.emit('new_message', {message : data.message, username : socket.username});
    // })

    // //listen on typing
    // socket.on('typing', (data) => {
    // 	socket.broadcast.emit('typing', {username : socket.username})
    // })
})
