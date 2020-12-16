
$(init());



async function init(){
	
	var socket = io.connect('http://localhost:8080')

	

	

	const userID = Date.now()

	socket.emit('new_user', {userID : userID})
	
	socket.on("change_process", (data) => {
		if (userID == data.userID){
			myMove(function() {
				socket.emit('change_process', {})
				var elem = document.getElementById("animate"); 
				elem.style.display = "none";
			});
		}
	})

	
 
}

function myMove(callback) {
	var elem = document.getElementById("animate"); 
	elem.style.display = "block";
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


