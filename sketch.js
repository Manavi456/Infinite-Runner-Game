PLAY = 1;
END = 2;
gameState = PLAY;

var ghost, ghost_Standing;

var playground, playgroundImg;

var door, doorImg, doorGroup;

var climber, climberImg, climberGroup;

var score ;

var gameOver, gameOverImg;


function preload(){
  
  ghost_Standing = loadImage("ghost-standing.png");
  
  playgroundImg = loadImage("tower.png");
  
  doorImg = loadImage("door.png");
  
  climberImg = loadImage("climber.png");
  
  gameOverImg = loadImage("gameOver.png");

}

function setup(){
     createCanvas(displayWidth,displayHeight);
  
  playground = createSprite(displayWidth/2,displayHeight/2, -displayHeight*5, displayHeight*4);
  playground.addImage( playgroundImg);
  playground.velocityY = 4;
 

  ghost = createSprite(displayWidth/2,displayHeight/2, 20, 20);
  ghost.addImage( ghost_Standing);
  ghost.scale = 0.4;
  
  ghost.setCollider("circle", 0, 0, radius = 140);
  
  
  score = 0;

  gameOver = createSprite(displayWidth/2,displayHeight/2, 20, 20);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 2;
  gameOver.visible = false;
  
   doorGroup = new Group();
   climberGroup = new Group();
  
  
}
function draw(){
 background("black");

 camera.position.y = displayHeight/2;
 camera.position.x = ghost.x;
  
  if(gameState===PLAY){
    
     if( playground.y > 350 ){
          playground.y = 200}
     
     if(keyDown("space")){
          ghost.velocityY = -12;
      
      }else(ghost.velocityY = 0);
    
    
      if(keyDown("right")) {
              ghost.velocityX = 7;
       
      }else if(keyDown("left")){
                ghost.velocityX = -7;
        
      }else(ghost.velocityX = 0);
    
    
    if(doorGroup.isTouching(ghost)|| climberGroup.isTouching(ghost)){
      gameState = END;
    }
  
    spawnDoors();
      
  }
    
     if(gameState===END){
      
       gameOver.visible = true ;
      
       score = 0;
       playground.velocityY = 0;
        
       doorGroup.setVelocityYEach(0);
       climberGroup.setVelocityYEach(0);
      
       doorGroup.setLifetimeEach(-1);
       climberGroup.setLifetimeEach(-1);
    
    }
  
  drawSprites();
  
  textSize(20);
  fill("white");
  text("Score = " + score , 300, 25) 
  score = score + Math.round(getFrameRate()/60);
}

function spawnDoors(){
  if(frameCount%60===0){
      door = createSprite(displayWidth/9,displayHeight/7, 20, 20);
      door.addImage(doorImg);
      door.scale = 1;
      door.velocityY = 4;
      door.x = Math.round(random(displayWidth/2,displayHeight/2 ));
      door.lifetime = 200;
    
      climber = createSprite(displayWidth/8, displayHeight/8, 20, 20);
      climber.addImage(climberImg);
      climber.scale = 1;
      climber.velocityY = 4;
      climber.x = door.x;
      climber.lifetime = 200;
    
    doorGroup.add(door);
    
    climberGroup.add(climber);
  }
 
}






