// =======================================
// SHAORMA WORLD
// GAME.JS NOU
// PARTEA 1/5
// =======================================


// ELEMENTE

const game = document.getElementById("game");

const world = document.getElementById("world");

const shaorma = document.getElementById("shaorma");

const drone = document.getElementById("drone");

const ingredient = document.getElementById("ingredient");


const scoreText =
document.getElementById("score");

const recordText =
document.getElementById("record");


const startButton =
document.getElementById("startButton");


const boostBar =
document.getElementById("boostBar");


const boostFill =
document.getElementById("boostFill");




// =======================================
// LUME
// =======================================


const WORLD_WIDTH = 5000;


let cameraX = 0;



// =======================================
// JOC
// =======================================


let running = false;

let gameOver = false;

let pressing = false;




// =======================================
// PLAYER SHAORMA
// =======================================


let player = {

x:400,

y:window.innerHeight/2,

speedY:0

};



const gravity = 0.45;

const jumpPower = -7;





// HITBOX

const shaormaBox = {

width:96,

height:49

};





// =======================================
// DRONA
// =======================================


let droneData = {


x:900,

y:250,


speed:5


};





const droneBox = {


width:93,

height:53


};







// =======================================
// SCOR
// =======================================


let score = 0;


let record =
Number(localStorage.getItem("shaormaWorldRecord")) || 0;


recordText.innerHTML =
"Record: " + record;






// =======================================
// BOOST
// =======================================


let boostActive=false;


let boostStart=0;


const boostDuration=15000;

const boostJump=-10;// =======================================
// PARTEA 2/5
// MISCARE PLAYER + CAMERA
// =======================================



function updatePlayer(){



if(pressing){


player.speedY =
boostActive ?
boostJump :
jumpPower;


}



player.speedY += gravity;


player.y += player.speedY;





// limite verticale


if(player.y < 0){

player.y=0;

player.speedY=0;

}



if(player.y > window.innerHeight-shaorma.height){

player.y =
window.innerHeight-shaorma.height;


player.speedY=0;

}





shaorma.style.top =
player.y+"px";



}







// =======================================
// CAMERA
// =======================================


function updateCamera(){



// camera urmărește shaorma


cameraX =
player.x -
window.innerWidth/2;




// limite hartă


if(cameraX < 0){

cameraX=0;

}



if(cameraX > WORLD_WIDTH-window.innerWidth){

cameraX =
WORLD_WIDTH-window.innerWidth;

}





world.style.transform =
`translateX(${-cameraX}px)`;



}







// =======================================
// DRONA
// =======================================


function updateDrone(){



droneData.x -=
boostActive ? 9 : droneData.speed;




if(droneData.x < cameraX-200){



droneData.x =
cameraX + window.innerWidth + 300;



droneData.y =
Math.random() *
(window.innerHeight-150);



}





drone.style.left =
droneData.x+"px";



drone.style.top =
droneData.y+"px";



}// =======================================
// PARTEA 3/5
// INGREDIENTE + BOOST
// =======================================



const foods=[

{
img:"rosie.png",
points:10
},

{
img:"carne.png",
points:20
},

{
img:"cartof.png",
points:15
},

{
img:"varza.png",
points:5
},

{
img:"ceapa.png",
points:5
},

{
img:"sos_iute.png",
points:30,
boost:true
}

];



let currentFood=null;


let foodX=1500;


let foodY=300;






function spawnFood(){



currentFood =
foods[
Math.floor(Math.random()*foods.length)
];



ingredient.src =
"images/"+currentFood.img;



ingredient.style.display="block";



foodX =
cameraX +
window.innerWidth +
Math.random()*500;



foodY =
Math.random()*
(window.innerHeight-120);





ingredient.style.left =
foodX+"px";


ingredient.style.top =
foodY+"px";



}








function updateFood(){



foodX -= 2;



ingredient.style.left =
foodX+"px";





if(foodX < cameraX-100){


spawnFood();


}



}








function activateBoost(){



boostActive=true;


boostStart=Date.now();



boostBar.style.display="block";


boostFill.style.width="100%";



}








function updateBoost(){



if(!boostActive){

return;

}



let time =
Date.now()-boostStart;



let percent =
100-(time/boostDuration*100);




boostFill.style.width =
Math.max(percent,0)+"%";





if(percent<=0){



boostActive=false;


boostBar.style.display="none";


}



}// =======================================
// PARTEA 4/5
// COLIZIUNI + SCOR
// =======================================



function getShaormaHitbox(){


return {

x:player.x + 22,

y:player.y + 25,

width:96,

height:49

};


}







function getDroneHitbox(){


return {

x:droneData.x + 13,

y:droneData.y + 10,

width:93,

height:53

};


}







function collision(a,b){


let padding=8;


return(

a.x+padding < b.x+b.width &&

a.x+a.width-padding > b.x &&

a.y+padding < b.y+b.height &&

a.y+a.height-padding > b.y

);


}








function checkDrone(){



let s=getShaormaHitbox();

let d=getDroneHitbox();



if(collision(s,d)){


endGame();


}



}







function checkFood(){



if(!currentFood){

return;

}



let s=getShaormaHitbox();



let f={


x:foodX,

y:foodY,

width:55,

height:55


};





if(collision(s,f)){



score += currentFood.points;



scoreText.innerHTML=
"Scor: "+score;





if(score>record){



record=score;



localStorage.setItem(
"shaormaWorldRecord",
record
);



recordText.innerHTML=
"Record: "+record;


}







if(currentFood.boost){


activateBoost();


}



spawnFood();



}



}







function updateBoostEffect(){


if(boostActive){


shaorma.classList.add("boost");


}

else{


shaorma.classList.remove("boost");


}



}// =======================================
// PARTEA 5/5
// START + LOOP
// =======================================





function startGame(){


running=true;


gameOver=false;



startButton.style.display="none";



score=0;


scoreText.innerHTML=
"Scor: 0";



player.x=400;


player.y=window.innerHeight/2;


player.speedY=0;



droneData.x=900;


spawnFood();



}








function endGame(){



running=false;


gameOver=true;



startButton.style.display="block";


startButton.innerHTML=
"GAME OVER<br>RESTART";



}








function restartGame(){


startGame();


}








// CONTROALE


document.addEventListener(
"keydown",
(e)=>{


if(e.code==="Space"){


pressing=true;



if(gameOver){

restartGame();

}


}


});






document.addEventListener(
"keyup",
(e)=>{


if(e.code==="Space"){


pressing=false;


}


});







document.addEventListener(
"touchstart",
()=>{


pressing=true;



if(gameOver){

restartGame();

}


});





document.addEventListener(
"touchend",
()=>{


pressing=false;


});








startButton.addEventListener(
"click",
()=>{


if(gameOver){

restartGame();

}

else{

startGame();

}



});









// LOOP 60 FPS


function gameLoop(){



if(running){



updatePlayer();


updateCamera();


updateDrone();


updateFood();


updateBoost();


updateBoostEffect();



checkDrone();


checkFood();



}



requestAnimationFrame(gameLoop);


}






startButton.innerHTML="START";


gameLoop();
