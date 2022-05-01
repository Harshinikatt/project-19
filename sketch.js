var spaceImg, space;
var rocketImg, rocket;
var meteorImg, meteor, meterogroup;
var restartImg, restart;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){

spaceImg = loadImage("space.png");
rocketImg = loadImage("redrocket.png");
meteorImg = loadImage("meteor.png");
restartImg = loadImage("restart.png");

}

function setup() {
    createCanvas(600,600);
    space = createSprite(300,300);
    space.addImage("space",spaceImg);
    space.velocity = 1;
   
   
   meteor = new Group();
   invisibleBlockGroup = new Group();

   rocket = createSprite(200,400,50,50);
   rocket.addImage(rocketImg);
   rocket.scale = 0.5;
   rocket.velocityY = 1;

   restart = createSprite(width/2,height/2);
   restart.addImage(restartImg);
   
}

function draw() {
  background(0);

  space.velocityY = 3

  if (gameState = "play") {
     if(space.y > 400){
     space.y = 350;
 }

       rocket.x = World.mouseX
 
      if(meterogroup.istouching(rocket)){
      rocket.destroy();
       gameState= "end";
      }

       if(invisibleBlockGroup.isTouching(rocket)|| rocket.y > 600){
       rocket.destroy();
      gameState= "end";
 }

    spawnMeteor();

  }

    if (gamestate==="end"){
      textSize(30);
      fill("pink");
      text("game over",130,150); 

        restart.visible = true;
      if( keydown('SPACE') || mousePressedOver(restart)){
       reset();
    
      }
    } 
    
    drawSprites();
 }
 
 
function spawnMeteor(){
    if (framecount % 240 === 0){
        var meteor = createSprite(200,-50);
        meteor.addImage();
        meteor.x= Math.round(random(120,400));
        meteor.velocityY = 1;
        meteor.lifetime = 800;
        meterogroup.add(meteor);


        var invisibleBlock= createSprite(200,15);
        invisibleBlock.width=climber.width;
        invisibleBlock.height=2;
        invisibleBlock.x=door.x;
        invisibleBlock.velocityY=1;
        invisibleBlock.debug=true;
        invisibleBlockGroup.add(invisibleBlock);
       }
   }
   function restart(){
       
   }