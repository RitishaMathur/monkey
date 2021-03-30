var backImage,backgr;
var player, player_running;
var ground,ground_img;
var FoodGroup,obstacleGroup;
var END =0;
var PLAY =1;
var gameState = PLAY;
var score=0;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImg = loadImage("banana.png");
  stoneImg=loadImage("stone.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  FoodGroup= new Group();
  obstacleGroup = new Group();
  
}

function draw() { 
 
  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    spawnFruits();
    spawnObstacles();

    if(FoodGroup.isTouching(player)){
      score=score+1;
      FoodGroup.destroyEach();
      player.scale+=0.01
    }
  }
 
  drawSprites();
  textSize(13);
    fill("white");
  text("Score: "+ score, 500,50);
  if(obstacleGroup.isTouching(player)){
    gameState = END;
  }
  else if(gameState===END){
    backgr.velocityX=0;
    player.visible=false;
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();

    textSize(13);
    fill("white");
    text("Game Over! Your Score Is: "+score,300,220);

  }

}


function spawnFruits(){
  if(frameCount % 90===0){
    var banana = createSprite(800,250,40,10)
    banana.y=random(120,200)
    banana.addImage(bananaImg)
    banana.scale=0.05;
    banana.velocityX=-4;

    banana.lifetime=300;
    player.depth=banana.depth +1;
    FoodGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount % 100===0){
    var stone = createSprite(700,250,40,10)
    stone.y=300;
    stone.addImage(stoneImg)
    stone.scale=0.15;
    stone.velocityX=-4;

    stone.lifetime=300;
    player.depth=stone.depth +1;
    obstacleGroup.add(stone);
  }
}