const express = require('express')
const app = express()


//set the template engine ejs
app.set('view engine', 'ejs')

//middlewares
app.use(express.static('public'))

var user = 0
var list_id = []

//routes
app.get('/', (req, res) => {
	res.render('index')
})

app.get('/weather', (req, res) => {
	res.json({ id: user })
})


//Listen on port 3000
server = app.listen(3000)



//socket.io instantiation
const io = require("socket.io")(server)

var process = 0

//listen on every connection
io.on('connection', (socket) => {
    console.log('New user connected')
    

    socket.on('new_user', (data) => {
        list_id.push(data.userID)
        console.log(list_id)
    })
    

    //default username

    setTimeout(function(){ 
        if (process == 0 && list_id.length == 1){
            console.log("1")
            io.sockets.emit('change_process', {userID : list_id[process]});
        } 
    }, 500)

    setTimeout(function(){ 
        socket.on('change_process', () => {
            // socket.process = data.process + 1
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
