
// from CodeCourse
(function() {
	var video = document.getElementById('video'),
		vendorUrl = window.URL || window.webkitURL;

	navigator.getMedia =	navigator.getUserMedia ||
							navigator.webkitGetUserMedia ||
							navigator.mozGetUserMedia ||
							navigator.msGetUserMedia;

	// Capyure video
	navigator.getMedia({
		video: true,
		audio: false
	}, function(stream) {
	   

//navigator.webkitGetUserMedia({ video: true, audio: false}, function(stream) {
	
	var Peer = require('simple-peer')
	var peer = new Peer( {
		initiator: location.hash === '#init',
		trickle: false,
		stream: stream
	})

	peer.on('signal', function(data) {
		document.getElementById('yourId').value = JSON.stringify(data)
	})

	 document.getElementById('connect').addEventListener('click', function() {
	 	var otherId = JSON.parse(document.getElementById('otherId').value)
	 	peer.signal(otherId)
	 })

	 document.getElementById('send').addEventListener('click', function() {
	 	var yourMessage = document.getElementById('yourMessage').value
	 	peer.send(yourMessage)
	 })

	 peer.on('data', function(data) {
	 	document.getElementById('messages').textContent += data + '\n'

	 })

	 peer.on('stream', function(stream) {
	 	//var video = document.createElement('video')
	 	//document.body.appendChild(video)

	 	//video.src = window.URL.createObjectURL(stream)
	 	//video.play()

	 	video.src = vendorUrl.createObjectURL(stream);
	    video.play();
	
	 })
}, function (err) {
	console.error(err)
})
})();