
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var ground;
var engine, world;
var boy;
var boyImg, boyCry;
var a1, appleImg
var score=0;
function preload() {
  boyImg = loadImage("boy1.png")
 
  appleImg = loadImage("apple.png")
}

function setup() {
  createCanvas(600, 600);

  engine = Engine.create();
  world = engine.world;
  var options = { isStatic: true }
  ground = Bodies.rectangle(300, 590, 600, 20, options)
  World.add(world, ground);

  boy = createSprite(300, 500, 50, 80)
  boy.addImage("boy", boyImg)

  boy.changeImage("boy")
  boy.scale = 0.4;
  
  boy.setCollider("rectangle",0,0,200,400)
 

 
}


function draw() {
  background(51);
  fill("red");

  Engine.update(engine);
  rectMode(CENTER);
  rect(ground.position.x, ground.position.y, 600, 20)

  if (a1 != null) {
    image(appleImg, a1.position.x, a1.position.y, 40, 40);

  }
 boy.x=mouseX;
 if(boy.x<=25){
  boy.x=25;
 }
 if(boy.x>=575){
  boy.x=375;
 }

  if(a1!=null && a1.position.y>=580)
  {
    World.remove(world,a1);
    a1=null;
     
   }

  if(collide(a1,boy)){
    score+=5;
  }
createApples();
  drawSprites();

  fill("red");
  textSize(25);
  text("Score: "+score,460,100)
}

function collide(body, sprite) {
  if (body != null) {
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
    console.log(d)
    if (d <= 40) {
    
      World.remove(world, a1);
      a1 = null
      return true;
    }
    else {
      return false;
    }
  }
}

function createApples(){
  if(frameCount%70===0){
    var apple_options = { density: 0.001 };
    a1 = Bodies.circle(random(50, 550), random(50, 80), 40, apple_options);
    World.add(world, a1);
    
  
  }
}

