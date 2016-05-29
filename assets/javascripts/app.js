var recognizing = false;
var finalString = "";

var usersName = "Timothy";

var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
//recognition.interimResults = true;

recognition.onstart = function() {
	recognizing = true;
};

recognition.onerror = function(event) {
	if (event.error == 'no-speech') {
		console.log("No Speech Error:", event);
	}

	if (event.error == 'audio-capture') {
		console.log("Error in audio-capture:", event);
	}

	if (event.error == 'not-allowed') {
		console.log("Error Not Allowed:", event);
	}
};

recognition.onend = function() {
	recognizing = false;
	console.log("Hit End");

	recognition.start();
};

recognition.onresult = function(event) {
	//console.log(event);
	var results = event.results;
	var len = results.length - 1;

	if (results[len].isFinal) {
		// results[len][0].confidence;
		finalString = results[len][0].transcript;

		checkCommands(finalString);

		console.log("You said:", finalString);
	}
} 

var startButton = function (event) {
	recognition[recognizing ? "stop" : "start"]();
};

window.onload = function () {
	recognition.start();
	speak("Welcome back " + usersName + "!");
};
