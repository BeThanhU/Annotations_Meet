let classifier;
let imageModeURL = 'https://teachablemachine.withgoogle.com/models/O0IbZu_o5/';

let video;
let flippedVideo;

let label = '';

let pic;
let hello;

function preload(){
	classifier = ml5.imageClassifier(imageModeURL + 'model.json');
	pic = loadImage("pics.png");
	hello = loadImage("hello.png");
}

function setup(){
	createCanvas(1024, 920);

	video = createCapture(VIDEO);
	video.size(width, height);
	video.hide();

	flippedVideo = ml5.flipImage(video);

	classifyVideo();
}

function draw(){
	background(0, 255, 0);

	image(flippedVideo, 0, 0);

	if(label == 'Chill picture'){

		image(pic, 0, 0);
	}else if(label == 'Hello'){
		image(hello, 0, 0);
	}

	fill(255);
	textSize(16);
	textAlign(CENTER);
	text(label, width/2, height-4);
}

function classifyVideo(){
	flippedVideo = ml5.flipImage(video);
	classifier.classify(flippedVideo, gotResult);
}

function gotResult(error, results){
	label = results[0].label;
	classifyVideo();
}