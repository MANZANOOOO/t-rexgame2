var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage,cloudImage;


var obstaclesGroup,cloudsGroup,gameOverImg,restartImg,gameOver,score;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var Sound;


var PLAY=1;
var END=0;
var gameState=PLAY;




function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");


  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
  restartImg=loadImage("restart.png")
  gameOverImg=loadImage("gameOver.png")
  Sound=loadSound("jump.mp3")
  Sound1=loadSound("die.mp3")
  Sound2=loadSound("checkpoint.mp3")
 
 




   
}


function setup() {


  createCanvas(windowWidth,windowHeight)//MODIFCADO
  var mensaje="esto es un mensaje"
  console.log(mensaje)
  trex = createSprite(50,height-40 ,20,50);//MODIFICADO
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.addAnimation("collided",trex_collided)


  gameOver=createSprite(width/2,height/2-50);//MODIFICADO
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.5;
  gameOver.visible=false;


  restart=createSprite(width/2,height/2)//MODIFICADO
  restart.addImage(restartImg)
  restart.scale=0.5;
  restart.visible=false;
 
  ground = createSprite(width/2,height-10,width,125);//MODIFICADO
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
 
 
  invisibleGround = createSprite(width/2,height-5,width,1);//MODIFICADO
  invisibleGround.visible = false;


  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();


 
  var rand=Math.round(random(1,100))
 console.log("Hola"+"Mundo")
 score=0;
 trex.setCollider("circle",0,0,40);
 //trex.setCollider("rectangle",0,0,40,trex.height);
 trex.debug=true
   


}


function draw() {
 
  background(20);
  console.log(score)
  text("Puntuación:"+score,width-100,50);//MODIFICADO
  console.log("esto es ", gameState)


 
  if(gameState===PLAY){
    ground.velocityX = -(4+3*score/100)
    score=score+Math.round(getFrameRate()/60)
    if(score>0 && score%100===0){
      Sound2.play();
    }


    if (ground.x < 0){
      ground.x = ground.width/2;
    }


    if(touches.lenght>0 || keyDown("space")&& trex.y >= 100) {
      trex.velocityY = -10;
      Sound.play();
      touches=[];
 
     
    }
   
    trex.velocityY = trex.velocityY + 0.8


    spawnClouds();
    spawnObstacles();


if(obstaclesGroup.isTouching(trex)){
  gameState=END;
  Sound1.play();
}    
   
  }
  else if(gameState===END){


    ground.velocityX=0;
    trex.velocityY=0;
    gameOver.visible=true;
    restart.visible=true;




trex.changeAnimation("collided",trex_collided);


obstaclesGroup.setLifetimeEach(-1);
cloudsGroup.setLifetimeEach(-1);


obstaclesGroup.setVelocityXEach(0);
cloudsGroup.setVelocityXEach(0);




if(mousePressedOver(restart)){


  reset();
}

if(touches.length>0 || KeyDown("space")){
  reset();
  touches=[];
}

  }
 
 
  trex.collide(invisibleGround);
 
  drawSprites();
 
}


function spawnClouds(){
 
  if(frameCount%60===0){
    cloud=createSprite(600,100,40,10);//MODIFICAR POSICION DEL SPRITE
    cloud.addImage(cloudImage)
    cloud.y=Math.round(random(10,height-200))//MODIFICADO
    cloud.scale=0.9;
    cloud.velocityX=-3
    cloud.lifetime=134;
    console.log(trex.depth);
    console.log(cloud.depth);
    cloud.depth=trex.depth
    trex.depth=trex.depth + 1
    cloudsGroup.add(cloud);
  }
}


  function spawnObstacles(){
    if(frameCount%60==0){
      var obstacle=createSprite(width/2,height-20,width,125);//MODIFICADO


      obstacle.velocityX=-(6+score/100);


     
    var rand=Math.round(random(1,6))
   
 
 switch(rand){
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
  default:break;        
 }


 obstacle.scale=0.5;
 obstacle.lifetime=300;
 obstaclesGroup.add(obstacle);
    }
   
  }


  function reset(){
    gameState=PLAY;
    gameOver.visible=false
    restart.visible=false




    trex.changeAnimation("running",trex_running)
    obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();
    score=0;


  }
