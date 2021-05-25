var canyon = {
	x : [],
	width : 70
};
var cloud ={
    x: [],
    y:[]
};
// Initialise arrays of scenery objects.
var tree = {x:[], y:400};

var mountain = {
	x:[], y_pos:432
};

var gameChar_x;
var gameChar_y;
var floorPos_y;
var charState;
var fakeChar_x;

var isLeft;
var isRight;
var isFalling;
var isJumping;

var collectable = {
	x_pos: 450, 
	y_pos: 400, 
	size: 35,
	speedx : 0,
	speedy : 0};
//collectable item
var isFound;
var charging;
var shoot;
var targetx = 0;
var targety = 0;

//scrollPos
var scrollPos;

var boss = {
	x: 2000,
	y: 350,
	ballx: 2000,
	bally: 350,
};

let drawboss = function(boss) {
	fill(255);
	ellipse(boss.x,boss.y,100,100);
};
var eraserball = [];
let bossball = function(collectable,boss) {
	// let speed_ballx = (gameChar_x - boss.x)/abs(gameChar_x - boss.x)*3;
	// let speed_bally = (gameChar_y - boss.y)/1500;
	let speed_ballx = -5;
	let speed_bally = random(-15,15);
	// if (dist(boss.x,boss.y,collectable.x_pos,collectable.y_pos)<=100) {
	if (fakeChar_x-boss.ballx >=0) {
		eraserball.pop();
		boss.ballx = 2000;
		boss.bally = 350;
		// console.log(eraserball.length)
	} 
	else if (frameCount%10==0) {
		eraserball.push([boss.ballx,boss.bally]);
		boss.ballx += speed_ballx;
		boss.bally += speed_bally;
		// console.log(eraserball.length)
	}	

	eraserball.forEach(i => {
		fill(255);
		ellipse(i[0],i[1],50,50);
	}
	);
	
}

let drawMountain = function(mountain) {
    mountain.x.forEach(mountain_x => {
		noStroke();
		fill(139,69,19);
		triangle(mountain_x,mountain.y_pos, mountain_x+50, mountain.y_pos-140,mountain_x+80,mountain.y_pos);
		triangle(mountain_x+30,mountain.y_pos,mountain_x+120, mountain.y_pos-212, mountain_x+220, mountain.y_pos);
		triangle(mountain_x+80, mountain.y_pos,mountain_x+210, mountain.y_pos-170, mountain_x+330, mountain.y_pos);
})};

let drawCloud = function(cloud) {
    noStroke();
	fill(255);
	for (var i=0;i<cloud.x.length;i++) {
    // cloud.x.forEach(cloud.x[i] => {
		ellipse(cloud.x[i], cloud.y[i], 80, 80);
		ellipse(cloud.x[i]-30, cloud.y[i], 65,65);
		ellipse(cloud.x[i]+30, cloud.y[i],65,65);
		cloud.x[i] += random(0.5,1.5);
    }
};

let drawTree = function(tree) {
    tree.x.forEach(i => {
		noStroke();
		fill(85,107,47);
		rect(i,tree.y+20,30,130);
		fill(173,255,47);
        // fill(random(0,255));
		triangle(i-70,tree.y+75,i+20,tree.y-20,i+85,tree.y+75);
		triangle(i-50,tree.y+35,i+10,tree.y-30,i+75,tree.y+35);
		triangle(i-35,tree.y+10,i+10,tree.y-40,i+60,tree.y+10);
    })
};

let drawCanyon = function(canyon) {
    canyon.x.forEach(i => {
		noStroke();
		fill(100, 155, 255);
		rect(i,floorPos_y,canyon.width,144);
		fill(0);
		triangle(i, height, i+10, floorPos_y+45, i +20, height);
		triangle(i+20, height, i+30, floorPos_y+45, i +40, height);
		triangle(i+40, height, i+50, floorPos_y+45, i +60, height);
		// if (fakeChar_x%1000 >=-5 && fakeChar_x%1000 <=5) {
		// 	canyon.x.push(canyon.x[canyon.x.length -1]+1000);
		// 	canyon.x.shift();
		// 	console.log(canyon.x);
		// 	if (i < fakeChar_x-1500) {
		// 		canyon.x.shift()
		// 	}
		// };
	})
};

let notFoundItem = function(collectable) {
    noStroke();
    fill(220,20,60);
    ellipse(collectable.x_pos, collectable.y_pos, collectable.size+15,collectable.size-25);
    ellipse(collectable.x_pos, collectable.y_pos, collectable.size-25,collectable.size+15);
    fill(255,255,0,80);
    ellipse(collectable.x_pos, collectable.y_pos, collectable.size-20,collectable.size-20);
};

let FoundItem = function(collectable) {
    noStroke();
    fill(random(0,255),70);
    ellipse(collectable.x_pos, collectable.y_pos, collectable.size+15,collectable.size-15);
    ellipse(collectable.x_pos, collectable.y_pos, collectable.size-15,collectable.size+15);
    fill(0);
    ellipse(collectable.x_pos, collectable.y_pos, collectable.size-20,collectable.size-20);
};

let charLeftandFall = function() {
    // add your jumping-left code
		fill(240);//head
		ellipse(gameChar_x, gameChar_y -50, 40);
		fill(0);//eye
		ellipse(gameChar_x-5, gameChar_y - 55, 7,10);
		// ellipse(gameChar_x + 10, gameChar_y -55, 5,10);
		noFill();
		stroke(0);//smile
		line(gameChar_x -15, gameChar_y-38, gameChar_x, gameChar_y-43);
		fill(255,0,200);//body
		noStroke();
		rect(gameChar_x-7, gameChar_y -33, 15,20);
		fill(0,150,255);
		beginShape(); //right leg
		vertex(gameChar_x-2,gameChar_y-15);
		vertex(gameChar_x-15, gameChar_y-15);
		vertex(gameChar_x-11, gameChar_y-2);
		vertex(gameChar_x-5, gameChar_y-2);
		vertex(gameChar_x-9,gameChar_y-10);
		vertex(gameChar_x-2, gameChar_y-10);
		endShape(CLOSE);
		
		beginShape(); //left leg
		vertex(gameChar_x+7,gameChar_y-15);
		vertex(gameChar_x+7, gameChar_y-9);
		vertex(gameChar_x+15, gameChar_y-12);
		vertex(gameChar_x+14, gameChar_y-4);
		vertex(gameChar_x+2, gameChar_y-2);
		vertex(gameChar_x+2, gameChar_y-15);
		endShape(CLOSE);
};

let charRightandFall = function() {
    // add your jumping-right code
		fill(240);//head
		ellipse(gameChar_x, gameChar_y -50, 40);
		fill(0);//eye
		// ellipse(gameChar_x-5, gameChar_y - 55, 10,10);
		ellipse(gameChar_x + 5, gameChar_y -55, 7,10);
		noFill();
		stroke(0);//smile
		line(gameChar_x +15, gameChar_y-38, gameChar_x, gameChar_y-43);
		fill(255,0,200);//body
		noStroke();
		rect(gameChar_x-7, gameChar_y -33, 15,20);
		fill(0,150,255);
		beginShape(); //right leg
		vertex(gameChar_x+2,gameChar_y-15);
		vertex(gameChar_x+15, gameChar_y-15);
		vertex(gameChar_x+11, gameChar_y-2);
		vertex(gameChar_x+5, gameChar_y-2);
		vertex(gameChar_x+9,gameChar_y-10);
		vertex(gameChar_x+2, gameChar_y-10);
		endShape(CLOSE);
		
		beginShape(); //left leg
		vertex(gameChar_x-7,gameChar_y-15);
		vertex(gameChar_x-7, gameChar_y-9);
		vertex(gameChar_x-15, gameChar_y-12);
		vertex(gameChar_x-14, gameChar_y-4);
		vertex(gameChar_x-2, gameChar_y-2);
		vertex(gameChar_x-2, gameChar_y-15);
		endShape(CLOSE);
};

let charLeft = function() {
    // add your walking left code
		fill(240);//head
		ellipse(gameChar_x, gameChar_y -50, 40);
		fill(0);//eye
		ellipse(gameChar_x-5, gameChar_y - 55, 7,10);
		// ellipse(gameChar_x + 10, gameChar_y -55, 5,10);
		noFill();
		stroke(0);//smile
		line(gameChar_x -15, gameChar_y-38, gameChar_x, gameChar_y-43);
		fill(255,0,200);//body
		noStroke();
		rect(gameChar_x-7, gameChar_y -33, 15,20);
		fill(0,150,255);
		beginShape(); //left leg
		vertex(gameChar_x-7,gameChar_y-15);
		vertex(gameChar_x-7, gameChar_y-5);
		vertex(gameChar_x-4, gameChar_y+3);
		vertex(gameChar_x+5, gameChar_y+3);
		vertex(gameChar_x-2, gameChar_y-2);
		vertex(gameChar_x-2, gameChar_y-15);
		endShape(CLOSE);
		beginShape(); //right leg
		vertex(gameChar_x+7,gameChar_y-15);
		vertex(gameChar_x+7, gameChar_y-9);
		vertex(gameChar_x+15, gameChar_y-12);
		vertex(gameChar_x+14, gameChar_y-4);
		vertex(gameChar_x+2, gameChar_y-2);
		vertex(gameChar_x+2, gameChar_y-15);
		endShape(CLOSE);
}

let charRight = function() {
    // add your walking right code
		fill(240);//head
		ellipse(gameChar_x, gameChar_y -50, 40);
		fill(0);//eye
		// ellipse(gameChar_x-5, gameChar_y - 55, 10,10);
		ellipse(gameChar_x + 5, gameChar_y -55, 7,10);
		noFill();
		stroke(0);//smile
		line(gameChar_x +15, gameChar_y-38, gameChar_x, gameChar_y-43);
		fill(255,0,200);//body
		noStroke();
		rect(gameChar_x-7, gameChar_y -33, 15,20);
		fill(0,150,255);
		beginShape(); //left leg
		vertex(gameChar_x+7,gameChar_y-15);
		vertex(gameChar_x+7, gameChar_y-5);
		vertex(gameChar_x+4, gameChar_y+3);
		vertex(gameChar_x-5, gameChar_y+3);
		vertex(gameChar_x+2, gameChar_y-2);
		vertex(gameChar_x+2, gameChar_y-15);
		endShape(CLOSE);
		beginShape(); //right leg
		vertex(gameChar_x-7,gameChar_y-15);
		vertex(gameChar_x-7, gameChar_y-9);
		vertex(gameChar_x-15, gameChar_y-12);
		vertex(gameChar_x-14, gameChar_y-4);
		vertex(gameChar_x-2, gameChar_y-2);
		vertex(gameChar_x-2, gameChar_y-15);
		endShape(CLOSE);
};

let charFallorJump = function() {
    // add your jumping facing forwards code
		fill(240);//head
		ellipse(gameChar_x, gameChar_y -50, 40);
		fill(0);//eye
		ellipse(gameChar_x -10, gameChar_y - 55, 5,10);
		ellipse(gameChar_x + 10, gameChar_y -55, 5,10);
		noFill();
		stroke(0);//smile
		curve(gameChar_x - 15, gameChar_y -45, gameChar_x -5, gameChar_y -40, gameChar_x + 5,gameChar_y-40,gameChar_x+15, gameChar_y-45);
		fill(255,0,200);//body
		noStroke();
		rect(gameChar_x-7, gameChar_y -33, 15,20);
		fill(0,150,255);
		beginShape(); //left leg
		vertex(gameChar_x-7,gameChar_y-15);
		vertex(gameChar_x-7, gameChar_y-9);
		vertex(gameChar_x-15, gameChar_y-12);
		vertex(gameChar_x-14, gameChar_y-4);
		vertex(gameChar_x-2, gameChar_y-2);
		vertex(gameChar_x-2, gameChar_y-15);
		endShape(CLOSE);
		beginShape(); //right leg
		vertex(gameChar_x+7,gameChar_y-15);
		vertex(gameChar_x+7, gameChar_y-9);
		vertex(gameChar_x+15, gameChar_y-12);
		vertex(gameChar_x+14, gameChar_y-4);
		vertex(gameChar_x+2, gameChar_y-2);
		vertex(gameChar_x+2, gameChar_y-15);
		endShape(CLOSE);
}

let charStand = function() {
    // add your standing front facing code
		fill(240);
		ellipse(gameChar_x, gameChar_y -50, 40);
		fill(0);
		ellipse(gameChar_x -10, gameChar_y - 55, 5,10);
		ellipse(gameChar_x + 10, gameChar_y -55, 5,10);
		noFill();
		stroke(0);
		curve(gameChar_x - 15, gameChar_y -45, gameChar_x -5, gameChar_y -40, gameChar_x + 5,gameChar_y-40,gameChar_x+15, gameChar_y-45);
		fill(255,0,200);
		noStroke();
		rect(gameChar_x-7, gameChar_y -33, 15,20);
		fill(0,150,255);
		beginShape();
		vertex(gameChar_x-7,gameChar_y-15);
		vertex(gameChar_x-7, gameChar_y+3);
		vertex(gameChar_x-2, gameChar_y+3);
		vertex(gameChar_x-2, gameChar_y-15);
		endShape(CLOSE);
		beginShape();
		vertex(gameChar_x+7,gameChar_y-15);
		vertex(gameChar_x+7, gameChar_y+3);
		vertex(gameChar_x+2, gameChar_y+3);
		vertex(gameChar_x+2, gameChar_y-15);
		endShape(CLOSE);
}

