/*

The Game Project

Week 3

Game interaction

*/




function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	gameChar_x = width/2;
	fakeChar_x = width/2;
	gameChar_y = floorPos_y;
	charState = '';
	isFound = false;
	charging = false;
	scrollPos=0;
	tree.y = height/2;
	// generating random x values for cloud, mountain, canyon
	for (var i=-10;i<200;i++) {
		cloud.x.push(i*random(1,3)*100);
		cloud.y.push(abs(random(0,1)*200));
	};
	canyon.x = [154, 1124,1194,2154];
	tree.x = [50, 300, 500, 600];
	mountain.x = [400,800,1400,1500];
}

function draw()
{

	///////////DRAWING CODE//////////

	background(100,155,255); //fill the sky blue
	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground

	// moving/scrolling the background
	push();
	translate(scrollPos,0);

	// mountains
	drawMountain(mountain);

	//cloud
	drawCloud(cloud);
	
	//treee
	drawTree(tree);

	//canyon
	drawCanyon(canyon);

	//boss
	drawboss(boss);
	bossball(collectable,boss);

	// collectible item
	if (dist(fakeChar_x,gameChar_y,collectable.x_pos,collectable.y_pos) <= 50) {
		isFound = true;
	};
	if (!isFound) {
		notFoundItem(collectable);
	};
	pop();

	// when collectable item is found
	if (isFound) {
		FoundItem(collectable)
	};

	// charstate text 
	push();
	fill(0);
	textSize(20);
	text(` ${charState}, timeframe ${frameCount}`, 20, 20);
	text('isFound ' + isFound + '--charging '+charging+'--shoot '+shoot, 20,40);
	text(`realChar_x-${fakeChar_x} target ${targetx} ${targety}`,20,60);
	text(`gameChar_x-${gameChar_x} scrollPos(${scrollPos})`,20,80);
	pop();
	//drawing more tree, canyon, moutain
	// for (var i=1000;i<=20000;i+=1000) {
	// for (var j=0;j<4;j++) {
	// 	if (fakeChar_x>=canyon.x[3] && fakeChar_x<=canyon.x[3]+10) {
	// 		mountain.x[j] += 2000;
	// 		canyon.x[j] += 2000;
	// 		tree.x[j] += 2000;
	// 		console.log(mountain.x)
	// 	} else if (fakeChar_x>=canyon.x[0] && fakeChar_x<=canyon.x[0]+10) {
	// 		mountain.x[j] -= 2000;
	// 		canyon.x[j] -= 2000;
	// 		tree.x[j] -= 2000;
	// 		console.log(mountain.x)
	// 	}
	// };
	//the game character
	if(isLeft && isFalling)
	{
		charLeftandFall();
	}
	else if(isRight && isFalling)
	{
		charRightandFall();

	}
	else if(isLeft)
	{
		charLeft();
	}
	else if(isRight)
	{
		charRight();
	}
	else if(isFalling || isJumping)
	{
		charFallorJump();
	}
	else
	{
		charStand();
	};


	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here
	if (gameChar_y >= floorPos_y) {
		// gameChar_y = floorPos_y;
		isFalling = false;
		// gameChar_y += 7;
	};

	if (isJumping) {
		// isFalling = false;
		if (gameChar_y <=280 ) {
			isJumping=false
		} else {gameChar_y -= 7}
	};
	if (isFalling) {
		isJumping = false;
		gameChar_y += 7;
	};
	if(isLeft)
	{
		fakeChar_x -= 5;
		if(gameChar_x > width * 0.2)
		{
			gameChar_x -= 5;
		}
		else
		{
			scrollPos += 5;
			// console.log(scrollPos);
		}
	};
	if(isRight)
	{
		fakeChar_x += 5;
		if(gameChar_x < width * 0.6)
		{
			gameChar_x  += 5;
		}
		else
		{
			scrollPos -= 5; // negative for moving against the background
		}

	};
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
	for (var i=0;i<canyon.x.length;i++) {
		if (fakeChar_x >= canyon.x[i] && fakeChar_x <= (canyon.x[i]+ canyon.width) && gameChar_y >= floorPos_y) {
			push();
			fill(0);
			textSize(60);
			text('Plumetting', 100, 200);
			gameChar_y+=10;
			pop();
		}
	}
	
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
	// } else if (keyCode == 87 && gameChar_y >= 280) {
	// 	isJumping = false;
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