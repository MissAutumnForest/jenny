var speak = function (message, voiceObj, volume, rate, pitch) {
	var msg = new SpeechSynthesisUtterance();

	//msg.voice  = window.speechSynthesis.getVoices()[1];
	msg.lang   = "en-US";
	msg.volume = parseFloat(volume) || 1.0; // 0 - 1
	msg.rate   = parseFloat(rate)   || 1.0; // 0 - 10
	msg.pitch  = parseFloat(pitch)  || 1.0; // 0 - 2
	msg.text   = message            || "You didn't tell me what to say!";

	msg.onstart = function () {
		console.log("Synthesis Started");

		if (musicPlaying) {
			currentVolume = scplayer.getVolume();
			scplayer.setVolume(0.3);
		}
	};

	msg.onend = function () {
		console.log("Synthesis End");

		if (musicPlaying) {
			scplayer.setVolume(currentVolume);
		}
	};

	window.speechSynthesis.speak(msg);
};
