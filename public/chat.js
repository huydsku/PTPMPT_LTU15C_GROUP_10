
$(init());

// async function getData() {
// 	// Default options are marked with *
// 	const response = await fetch('http://localhost:3000/weather')

// 	return response.json(); // parses JSON response into native JavaScript objects
// }

async function init(){
	//make connection
	var socket = io.connect('http://localhost:3000')

	// var data = await getData()

	// console.log(data.id)

	const userID = Date.now()

	socket.emit('new_user', {userID : userID})
	
	socket.on("change_process", (data) => {
		console.log(userID)
		console.log(data.userID)
		if (userID == data.userID){
			myMove(function() {
				socket.emit('change_process', {})
			});
		}
	})

	// //buttons and inputs
	// var message = $("#message")
	// var username = $("#username")
	// var send_message = $("#send_message")
	// var send_username = $("#send_username")
	// var chatroom = $("#chatroom")
	// var feedback = $("#feedback")

	// //Emit message
	// send_message.click(function(){
	// 	socket.emit('new_message', {message : message.val()})
	// })

	// //Listen on new_message
	// socket.on("new_message", (data) => {
	// 	feedback.html('');
	// 	message.val('');
	// 	chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
	// })

	// //Emit a username
	// send_username.click(function(){
	// 	socket.emit('change_username', {username : username.val()})
	// })

	// //Emit typing
	// message.bind("keypress", () => {
	// 	socket.emit('typing')
	// })

	// //Listen on typing
	// socket.on('typing', (data) => {
	// 	feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
	// })
 
}

function myMove(callback) {
    var elem = document.getElementById("animate"); 
    var width = $(".icon").width();
    var pos = 0;
    var animate = setInterval(frame, 2);
    function frame() {
      if (pos == (width-200)) {
		clearInterval(animate);
		callback();
      } else {
        pos++; 
        elem.style.left = pos + "px"; 
      } 
    }
  }


