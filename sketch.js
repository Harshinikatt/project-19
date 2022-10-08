var space,rocket,cash,diamonds,jwellery,gun;
var spaceImg,rocketImg,cashImg,diamondsImg,jwelleryImg,gunImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,gunGroup;

var restart, restartImg;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  spaceImg = loadImage("SPACE.jpeg");
  rocketImg = loadAnimation("redrocket.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  gunImg = loadImage("gun.png");
  restartImg = loadImage("restart.png")
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
//create a canvas

 createCanvas(700,650);

// Moving background

space=createSprite(width/2,200);
space.addImage(spaceImg);
space.velocityY = 4;


//creating boy running
rocket = createSprite(width/2,height-20,20,20);
rocket.addAnimation("rocketflying",rocketImg);
rocket.scale=0.6;
  
 restart = createSprite(width/2,height/2);
 restart.addImage(restartImg);
 restart.scale = 0.1;
 restart.visible = false;
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
gunGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  rocket.x = World.mouseX;
  
  edges= createEdgeSprites();
  rocket.collide(edges);
  
   if(space.y > height ){
     space.y = height/2;
   }
     
   restart.visible = false;

    createCash();
    createDiamonds();
    createJwellery();
    createGun();

    if (cashG.isTouching(rocket)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection + 50;
    }
    else if (diamondsG.isTouching(rocket)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection + 100;
      
    }else if(jwelleryG.isTouching(rocket)) {
      jwelleryG.destroyEach();
      treasureCollection= treasureCollection + 150;
      
    }else{
      if(gunGroup.isTouching(rocket)) {
        gameState=END;
        
        rocket.addAnimation("SahilRunning",endImg);
        rocket.x=width/2;
        rocket.y=height/2;
        rocket.scale=0.6;
        
        cashG.destroyEach();
        diamondsG.destroyEach();
        jwelleryG.destroyEach();
        gunGroup.destroyEach();
        
        cashG.setVelocityYEach(0);
        diamondsG.setVelocityYEach(0);
        jwelleryG.setVelocityYEach(0);
        gunGroup.setVelocityYEach(0);
     
        restart.visible = true;

        if(touches.length>0 || keyDown("SPACE") || mousePressedOver(restart)) {      
          restart();
          touches = []
        }
    }
  }

  
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,width-150,30);
  }

}

function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(50, width-50),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 5;
  cash.lifetime = 200;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(50, width-50),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 5;
  diamonds.lifetime = 200;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
  var jwellery = createSprite(Math.round(random(50, width-50),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 5;
  jwellery.lifetime = 200;
  jwelleryG.add(jwellery);
  }
}

function createGun(){
  if (World.frameCount % 530 == 0) {
  var gun = createSprite(Math.round(random(50, width-50),40, 10, 10));
  gun.addImage(gunImg);
  gun.scale=0.10;
  gun.velocityY = 4;
  gun.lifetime = 200;
  gunGroup.add(gun);
  }
}

function restart(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  cashG.destroyEach();
  diamondsG.destroyEach();
  jwelleryG.destroyEach();
  gunGroup.destroyEach();
  
  treasureCollection = 0;
  
}