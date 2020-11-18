var PLAY = 1;
var END = 0;
var gameState = PLAY;

var chance;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var gameOver,gameimg;
var restart,reimg;

var score;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameimg = loadImage("gameOver.png");
  reimg = loadImage("restart.png");
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(displayWidth,displayHeight-500,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  invisibleGround = createSprite(200,displayHeight-500,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  gameOver = createSprite(displayWidth-1200,displayHeight-570);
  gameOver.addImage(gameimg);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  
  restart = createSprite(displayWidth-1200,displayHeight-550);
  restart.addImage(reimg);
  restart.scale = 0.5;
  restart.visible = false;
  
  
  score = 0;
  chance = 5;
}

function draw() {
  background(180);

  text("Score: "+ score, 500,50);
  text("Chance: "+ chance, 600,50);
  
  if (gameState === PLAY) {
    
    ground.velocityX = -(4+3*score/200); 
    
    if(keyDown("space") && trex.y >= 161) {
    trex.velocityY = -10;
  }
  console.log(trex.y);
    
    trex.velocityY = trex.velocityY + 0.8;
    
     if (ground.x < 700){
    ground.x = ground.width/2;
  }
    
    if (obstaclesGroup.isTouching(trex)) {
     gameState = END; 
     chance = chance-1;
    }
    
    score = score + Math.round(getFrameRate()/60);

  spawnClouds();
  spawnObstacles();
    
  } else if (gameState === END) {
    
     ground.velocityX = 0;
    
    trex.velocityY = 0;
    
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    trex.changeAnimation("collided",trex_collided);
    
    gameOver.visible = true;
    restart.visible = true;

    if (chance === 0) {
      textSize(30);
      text("YOUR TOTAL SCORE: "+score, 1000, displayHeight-500);
      //score = 0;
    }
    
    if(mousePressedOver(restart)) {
    reset();
    }
    if(mousePressedOver(restart) && chance === 0) {
      score = 0;
      chance = 5;
      }
    
  }
  
  
  trex.collide(invisibleGround);
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the cloud
  if (frameCount % 60 === 0) {
    var cloud = createSprite(displayWidth-50,displayHeight+550,40,10)
    cloud.y = Math.round(random(displayHeight-590,displayHeight-530))
    cloud.addImage(cloudImage)
    cloud.scale = 0.5
    cloud.velocityX = -3
  
     //assign lifetime to the variabl
    cloud.lifetime = 600
  
    //adjust the dept
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1
  
    //add each cloud to the grou
    cloudsGroup.add(cloud)
  }

}

function spawnObstacles() {
  if(frameCount % 90 === 0) {
    var obstacle = createSprite(displayWidth-50,displayHeight-520,10,40);
    obstacle.velocityX = -(4+3*score/200);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 600;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  //score = 0;
  
}