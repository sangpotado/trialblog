/*

The Game Project

Week 3

Game interaction

*/

var canyon = {
	x_pos : 120,
	width : 70
};
var gameChar_x;
var gameChar_y;
var floorPos_y;
var charState;

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

var isFound;
var charging;
var shoot;
var targetx = 0;
var targety = 0;


function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	gameChar_x = width/2;
	gameChar_y = floorPos_y;
	charState = '';
	isFound = false;
	charging = false;
}

function draw()
{

	///////////DRAWING CODE//////////

	background(100,155,255); //fill the sky blue


	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground
	// charState
	push();
	fill(0);
	textSize(20);
	text(charState, 20, 20);
	text('isFound ' + isFound + '--charging '+charging+'--shoot '+shoot, 20,40);
	text(`target ${targetx} ${targety}`,20,60);
	pop();

	//draw the canyon
	noStroke();
	fill(100, 155, 255);
	// text("canyon", 100, 480);
	rect(canyon.x_pos,floorPos_y,canyon.width,144);
	fill(0);
	triangle(canyon.x_pos, height, canyon.x_pos+10, floorPos_y+45, canyon.x_pos +20, height);
	triangle(canyon.x_pos+20, height, canyon.x_pos+30, floorPos_y+45, canyon.x_pos +40, height);
	triangle(canyon.x_pos+40, height, canyon.x_pos+50, floorPos_y+45, canyon.x_pos +60, height);

	// collectible item
	
	if (dist(gameChar_x,gameChar_y,collectable.x_pos,collectable.y_pos) <= 50) {
		isFound = true;
		// console.log(isFound)
	};
	noStroke();
	fill(220,20,60);
	ellipse(collectable.x_pos, collectable.y_pos, collectable.size+15,collectable.size-25);
	ellipse(collectable.x_pos, collectable.y_pos, collectable.size-25,collectable.size+15);
	fill(255,255,0,80);
	ellipse(collectable.x_pos, collectable.y_pos, collectable.size-20,collectable.size-20);


	//the game character
	if(isLeft && isFalling)
	{
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

	}
	else if(isRight && isFalling)
	{
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

	}
	else if(isLeft)
	{
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
	else if(isRight)
	{
		// add your walking right code
		gameChar_x += 2;
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

	}
	else if(isFalling || isJumping)
	{
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
	else
	{
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
	};


	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here
	if (gameChar_y >= floorPos_y) {
		// gameChar_y = floorPos_y;
		isFalling = false;
		// isJumping = false;
		// gameChar_y += 7;
	};

	if (isJumping) {
		isFalling = false;
		gameChar_y -= 7;
	};
	if (isFalling) {
		isJumping = false;
		gameChar_y += 7;
	};
	if (isLeft) {gameChar_x -= 5};
	if (isRight) {gameChar_x += 5};
	
	// collectable movement
	if (isFound) {
		collectable.x_pos += collectable.speedx;
		collectable.y_pos += collectable.speedy;
	};

	if (charging) {
		collectable.speedx *= 1.1;
		collectable.speedx *=1.1;
		shoot = false;
	};

	let xdis = gameChar_x - collectable.x_pos;
	let ydis = gameChar_y -20 - collectable.y_pos;
	if (!shoot) {
		if (xdis > 30) {collectable.speedx = xdis/20}
		else if (xdis <-30) {collectable.speedx = xdis/20};
		if (ydis<=-30) {collectable.speedy = ydis/20} else if (ydis>=30) {collectable.speedy = ydis/20};
	};

	let xshoot = targetx - collectable.x_pos;
	let yshoot = targety - collectable.y_pos;
	if (shoot) {
		if (xshoot >5) {collectable.speedx = xshoot/15}
		else if (xshoot <-5) {collectable.speedx = xshoot/15} else {shoot=false};
		// else if (xshoot>=-5 && xshoot<=5) {shoot=false};
		if (yshoot <5) {collectable.speedy = yshoot/15} 
		else if (yshoot>-5) {collectable.speedy = yshoot/15} else {shoot=false}
	}

	// if character hit the canyon
	if (gameChar_x >= canyon.x_pos && gameChar_x <= (canyon.x_pos + canyon.width) && gameChar_y >= floorPos_y) {
		push();
		fill(0);
		textSize(40);
		text('game over', 50, 100);
		gameChar_y+=7;
		triangle(canyon.x_pos, height, canyon.x_pos+10, floorPos_y+45, canyon.x_pos +20, height);
		triangle(canyon.x_pos+20, height, canyon.x_pos+30, floorPos_y+45, canyon.x_pos +40, height);
		triangle(canyon.x_pos+40, height, canyon.x_pos+50,floorPos_y+45, canyon.x_pos +60, height);

	};

}


function keyPressed()
{
	// if statements to control the animation of the character when
	// keys are pressed.
	if (keyCode == 65) {
		isLeft = true;
		charState = 'pressing A, facing left'
	} else if (keyCode == 68) {
		isRight = true;
		charState = 'pressing D, facing right'
	} else if (keyCode == 87) {
		isJumping = true;
		charState = 'pressing W, jumping';
	} else if (keyCode == 83) {
		charging = true;
		charState = 'pressing S, charging'
	} else {
		isFalling = true;
		charState = 'falling or facing straight'
	}

	//open up the console to see how these work
	// console.log("keyPressed: " + key);
	// console.log("keyPressed: " + keyCode);
};

function keyReleased()
{
	// if statements to control the animation of the character when
	// keys are released.
	if (keyCode == 65) {
		isLeft = false;
		charState = ''
	} else if (keyCode == 68) {
		isRight = false;
		charState = ''
	} else if (keyCode == 87) {
		isJumping = false;
		charState = '';
		isFalling = true;
		charState = 'falling';
	} else if (keyCode == 83) {
		charging = false;
		charState = ''
	} else {}
	// console.log("keyReleased: " + key);
	// console.log("keyReleased: " + keyCode);
}
function mousePressed() {
	targetx = mouseX;
	targety = mouseY;
}
function mouseReleased() {
	if (isFound) {
		shoot = true;	
	}
}