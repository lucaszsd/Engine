var HEIGHT, WIDHT, GRID;
var canvas, ctx;
var frames = 0;;
var gravity;
var friction;
var keys = {
	LEFT:false,
	UP:false,
	RIGHT:false,
	DOWN:false
}

//Setup------------------------------------------
HEIGHT = 400;
WIDHT = 600;
GRID = 10;


canvas = document.createElement("canvas");
canvas.height = HEIGHT;
canvas.width = WIDHT;

ctx = canvas.getContext("2d");

document.body.appendChild(canvas);


//In-game variables-----------------------------
gravity = 1.15;
friction = 0.96;


/*
var section =  [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
*/


//Objetos--------------------------------------

class Bloco{

	constructor(x, y, z, mass, acc, color){
		//temporio
		this.color = color

		//forma
		this.x = x * GRID;
		this.y = y * GRID;
		this.z = z;
		this.height = GRID;
		this.width = GRID;
		this.mass = mass;
		
		//movimento
		this.acc = acc;
		this.speed = 0;
		this.vert_speed = 0;
	}

	update(){
		//Evita que afunde na tela
		//Trocar por colisão
		if(this.y + this.height < HEIGHT){
			this.vert_speed += gravity * this.mass;
		}
	}

	draw(){
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.closePath();
	}
}


class Person extends Bloco{
	constructor(x, y, z, mass, acc, color){
		super(x, y, z, mass, acc, color);
		this.color = "#9C27B0";
		this.max_speed = 10;
		this.jump_force = 5;
		this.in_air = true;
	}

	jump(){
		if(!this.in_air){
			this.vert_speed -= this.jump_force + Math.sqrt(Math.pow(this.speed/10, 2));	
		}
	}



		
	update(){
		//Evita que afunde na tela
		//Trocar por colisão

		if(this.y + this.height < HEIGHT){
			this.vert_speed += gravity * this.mass;
			this.y += this.vert_speed;
		}else{
			this.y = HEIGHT - this.height;
			this.in_air = false;
			this.vert_speed = 0;
		}

		if(keys.LEFT){
			this.speed -= this.acc;
		}

		if(keys.UP){
			this.jump();
			this.in_air = true;
		}

		if(keys.RIGHT){
			this.speed += this.acc;
		}
		
		if(this.speed > 10){
			this.speed = 10;
		}


		if(!colision){
			this.speed *= friction;	
			this.x += this.speed;
			this.y += this.vert_speed;
		}
		
		if(this.y == HEIGHT - this.height){
			this.onfloor = true;
		}
	
		if(this.x < 0){
			this.x = 0;
		}else if(this.x + this.width > WIDHT){
			this.x = WIDHT - this.width;
		}



	
	}

	



}




















click = function(event){
	switch(event.keyCode){
		case 37:
			keys.LEFT = true;
			break;
		case 38:
			keys.UP = true;
			break;
		case 39:
			keys.RIGHT = true;
			break;
		case 40:
			keys.DOWN = true;
			break;
		default:
			break;			
	}

}

unclick = function(event){
	switch(event.keyCode){
		case 37:
			keys.LEFT = false;
			break;
		case 38:
			keys.UP = false;
			break;
		case 39:
			keys.RIGHT = false;
			break;
		case 40:
			keys.DOWN = false;
			break;
		default:
			break;
	}
}



document.addEventListener("keydown", click);
document.addEventListener("keyup", unclick);







//-----------------------------------------








debug = function(c){

	width = WIDHT/6;
	height = width * 2;

	ctx.beginPath();
	ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
	ctx.fillRect(WIDHT - width, 0, WIDHT, height);
	ctx.font = "10pt arial";
	ctx.fillStyle = "rgb(255, 255, 255)"
	ctx.fillText(frames, WIDHT - width + 15, 20);
	ctx.fillText("("+Math.round(c.x)+", "+Math.round(c.y)+", "+Math.round(c.z)+")", WIDHT - width + 15, 40);
	ctx.fillText(Math.round(c.speed), WIDHT - width + 15, 60);
	ctx.fillText(Math.round(c.vert_speed), WIDHT - width + 15, 80);
	
	
	ctx.closePath();


}









var c = new Person(10,10,2, 0.9, 0.5, "#9C27B0");

var d = new Bloco(30,39,10, 15, 1, "#FE5F55");



var tileset = [[30, 39, 10, 15, 1, "#4CAF50"], [30, 38, 10, 15, 1, "#4CAF50"], [30, 37, 10, 15, 1, "#4CAF50"] ];

var blocos = [];











//------------------------------------------



update = function(){
	
	for(var i = 0; i < blocos.length; ++i){
		blocos[i].update();
	}

	c.update();
}

draw = function(){
	
	for(var i = 0; i < blocos.length; ++i){
		blocos[i].draw();
	}
	
	c.draw();
}

loop = function(){

	frames ++;

	ctx.clearRect(0, 0, WIDHT, HEIGHT);

	window.requestAnimationFrame(loop);

	update();
	draw();

	debug(c);
}

main = function(){

	for(var i = 0; i < tileset.length; ++i){
		
		blocos[i] = new Bloco(tileset[i][0], tileset[i][1], tileset[i][2], tileset[i][3], tileset[i][4], tileset[i][5]);
	}

	loop();
}


main();