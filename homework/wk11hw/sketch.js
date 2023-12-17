let seed, canvas;
let angle_c;
let colors = [];
let c0 = "467EB2-A7CCEE-65B5FF-65FFFF".split("-").map((a) => "#" + a);
let c7 = "fefefe-292929-ffffff-222222-202020".split("-").map((a) => "#" + a);
let c8 = "8c75ff-c553d2-2dfd60-2788f5-23054f-f21252-8834f1-c4dd92-184fd3-f9fee2-2E294E-541388-F1E9DA-FFD400-D90368-e9baaa-ffa07a-164555-ffe1d0-acd9e7-4596c7-6d8370-e45240-21d3a4-3303f9-cd2220-173df6-244ca8-a00360-b31016".split("-").map((a) => "#" + a);
let c11 = "025159-3E848C-7AB8BF-C4EEF2-A67458".split("-").map((a) => "#" + a);
let c12 = "10454F-506266-818274-A3AB78-BDE038".split("-").map((a) => "#" + a);
var color_setup1, color_setup2;
let color_bg;
let branch;
let revolution;
let angle;


function setup() {
	canvas = min(720, 720);
	createCanvas(canvas, canvas);
	seed = int(random(200));
	colorMode(HSB, 360, 100, 100, 100);
	color_setup1 = c7;
	color_setup2 = random([c8,c11,c12]);
	color_bg = "#101B25";
	background(color_bg);
	angle_c = 0;
	branch = int(random(4, 10));
	colors[0] = random(c0);
	colors[1] = random(color_setup1);
	colors[2] = random(color_setup1);
	colors[3] = random(color_setup2);
	revolution = canvas;
	angle = random(TAU);
}

function draw() {
	randomSeed(seed);
	drawingContext.shadowColor = str(random(color_setup1)) + "00";
	drawingContext.shadowOffsetX = 0;
	drawingContext.shadowOffsetY = 0;
	drawingContext.shadowBlur = 0;
	translate(width / 2, height / 2);
	let vol_m = 1;
	rotate(angle+angle_c );
	for (let i = 0; i < 2; i++) {

		colors[4] = random(color_setup2);
		push();
		translate(width / 30 , height / 30 );
		rotate(random(TAU));
		circleForm(0,0, revolution * .75 * (i + 1) / 2);
		pop();
	}
	if (frameCount % 500 == 0 && branch < 100) {
		branch += vol_m * int(random(1,5));
		revolution += vol_m*3;
		angle_c += TAU / 360;
	} else if (branch >= 100) {
		branch = 6;
		frameCount = 0;
	}
	if(angle_c > TAU-random(PI/2)){
		noLoop();
	}
		
	
}

function circleForm(x, y, d) {
	let ang = TAU / branch;
	let angles = [];
	for (let i = 0; i < branch; i++) {
		angles.push(ang * (i + iteration(0.1, 0.25)));
	}
	for (let i = 0; i < branch; i++) {
		let ang1 = angles[i];
		let ang2 = angles[(i + int(random(6))) % angles.length];
		let dd = d * iteration(0.1, 1);
		noFill();
		drawingContext.shadowColor = random(color_setup1);
		drawingContext.shadowOffsetX = 1;
		drawingContext.shadowOffsetY = 1;
		drawingContext.shadowBlur = 0;
		stroke(colors[random([0, 1, 2, 3, 4])]);
		strokeWeight(random(1));
		arc(x,y, dd, dd, ang1, ang2);
	}
}

function iteration(s, e) {
	let t = random(100, 1000);
	let v = random(0.001, 0.01);
	return map(cos(t + frameCount * v), -1, 1, s, e);
}