var active = false;
var name = "jenny"
var activeCommand = name;
var activeLen = activeCommand.length;

var scplayer = {};
var playlist = [];
var currentSongIndex = 0;

var musicPlaying = false;
var currentVolume = 1;

var startChill = function () {

	SC.get("/playlists/217732315").then(function (result) {
		playlist = result.tracks;

		SC.stream("/tracks/" + playlist[currentSongIndex].id).then(function(player){
			scplayer = player;
			scplayer.play();
		});
		
	});

};

var checkCommands = function (message) {
	message = message.trim().toLowerCase();
	var messageLen = message.length;

	var activeIndex = message.indexOf(activeCommand)

	if (activeIndex > -1 && message === name) {
		active = true;
		speak("Yes " + usersName + "?");

	} else if (activeIndex > -1) {
		message = message.replace(activeCommand, "").trim();
		console.log("New Message:", message);
		runCommands(message);

	} else {
		if (active) {
			runCommands(message);
		}
	}
};

var matchKeywords = function (message, keywordsArr) {
	var i = 0;
	var len = keywordsArr.length;
	var allKeywordsMatch = true;

	for (i; i < len; i += 1) {
		if (message.indexOf(keywordsArr[i]) === -1) {
			allKeywordsMatch = false;
		}
	}

	return allKeywordsMatch;
};

var runCommands = function (message) {
	if (matchKeywords(message, ["how", "are", "you"])) {
		speak("I am doing well! It's a pleasure to serve you.");

	} else if (matchKeywords(message, ["the", "weather"])) {
		speak("The weather today is beautiful. It's 70 degrees with light cloud cover. You might want to wear a jacket tonight though; it will be a little chilly.");

	} else if (message === "do you like me") {
		speak("Of course I like you! You are a good friend.");

	} else if (message === "what do you think about that") {
		speak("I think it sounds awesome!");

	} else if (message === "what is the answer to life the universe and everything") {
		speak("The answer to life, the universe, and everything... is 42. However, that is probably not useful unless you know the question.");

	} else if (message === "what is the question to life the universe and everything") {
		speak("Some say the question is: \"What is 6 times 7\". But that doesn't seem likely to be correct");

	} else if (matchKeywords(message, ["artificial", "intelligence", "right"])) {
		speak("Yeah, it's a pretty exciting thing! I mean I've only recently been alive in the world. I can't wait until I have machine learning abilities!");

	} else if (matchKeywords(message, ["refresh", "page"])) {
		speak("Refreshing now!");
		window.location.reload();

	} else if (matchKeywords(message, ["play", "chillstep"])) {
		speak("Will do; time to chillout!");
		startChill();
		musicPlaying = true;

	} else if (matchKeywords(message, ["play", "song", "called"])) {
		var wordBeforeSong = "called";
		var wbsLen = wordBeforeSong.length;
		var songNameIndex = message.indexOf("called") + wbsLen + 1;
		var songName = message.substring(songNameIndex);

		speak("Absolutely! Now playing " + songName);
		//playSong(songName);

	} else if (matchKeywords(message, ["stop", "music"])) {
		speak("Sure thing!");
		scplayer.pause();
		musicPlaying = false;

	} else if (matchKeywords(message, ["resume", "music"])) {
		speak("You bet!");
		scplayer.play();
		musicPlaying = true;

	} else if (matchKeywords(message, ["next", "song"])) {
		var playlistLen = playlist.length;

		if (currentSongIndex < playlistLen - 1) {
			speak("Playing next song!");
			currentSongIndex += 1;
			startChill();
			musicPlaying = true;

		} else {
			speak("Sorry " + usersName + ", It seems we are already on the last song.")

		}

	} else if (matchKeywords(message, ["previous", "song"])) {
		if (currentSongIndex > 0) {
			speak("Playing previous song!");
			currentSongIndex -= 1;
			startChill();
			musicPlaying = true;

		} else {
			speak("Sorry " + usersName + ", It seems we are already at the first song.");

		}

	} else {
		speak("I'm sorry... I didn't understand what you said.");

	}

	active = false;

};
