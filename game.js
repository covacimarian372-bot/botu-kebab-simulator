// =====================================
// SHAORMA ZBURATOARE - GAME ENGINE
// PARTEA 1/5
// CONFIG + VARIABILE
// =====================================



// ELEMENTE HTML

const shaorma = document.getElementById("shaorma");

const drone = document.getElementById("drone");

const ingredient = document.getElementById("ingredient");

const scoreText = document.getElementById("score");

const recordText = document.getElementById("record");

const startButton = document.getElementById("startButton");

const boostBar = document.getElementById("boostBar");

const boostFill = document.getElementById("boostFill");




// =====================================
// STARE JOC
// =====================================


let gameRunning = false;

let gameOverState = false;

let pressing = false;



// =====================================
// SHAORMA FIZICA
// =====================================


let shaormaY = window.innerHeight / 2;


let shaormaVelocity = 0;


const gravity = 0.45;


const jumpPower = -7;




// HITBOX SHAORMA

const shaormaHitbox = {

width:96,

height:49

};






// =====================================
// DRONA
// =====================================


let droneX = window.innerWidth;


let droneY = 250;


const droneSpeed = 5;



// HITBOX DRONA

const droneHitbox = {

width:93,

height:53

};






// =====================================
// SCOR
// =====================================


let score = 0;


let record =
Number(localStorage.getItem("shaormaRecord")) || 0;



recordText.innerHTML =
"Record: " + record;







// =====================================
// BOOST
// =====================================


let boostActive = false;


let boostTime = 15000;


let boostStart = 0;


const boostPower = -10;







// =====================================
// INGREDIENTE
// =====================================



const ingredients = [


{
image:"rosie.png",
points:10
},


{
image:"carne.png",
points:20
},


{
image:"cartof.png",
points:15
},


{
image:"varza.png",
points:5
},


{
image:"ceapa.png",
points:5
},


{
image:"sos_iute.png",
points:30,
boost:true
}


];





let currentIngredient;


let ingredientX = 0;


let ingredientY = 300;


const ingredientSpeed = 6;





// =====================================
// FUNCTIE START INGREDIENT
// =====================================


function spawnIngredient(){


currentIngredient =
ingredients[
Math.floor(
Math.random()*ingredients.length
)
];



ingredient.src =
"images/" + currentIngredient.image;



ingredient.style.display="block";



ingredientX = window.innerWidth;


ingredientY =
Math.random() *
(window.innerHeight-100);



ingredient.style.left =
ingredientX + "px";


ingredient.style.top =
ingredientY + "px";


}// =====================================
// PARTEA 2/5
// FIZICA + MISCAREA OBIECTELOR
// =====================================





// =====================================
// MISCARE SHAORMA
// =====================================


function updateShaorma(){


if(pressing){


shaormaVelocity =
boostActive ?
boostPower :
jumpPower;


}



shaormaVelocity += gravity;


shaormaY += shaormaVelocity;



// limite ecran


if(shaormaY < 0){

shaormaY = 0;

shaormaVelocity = 0;

}



if(shaormaY > window.innerHeight-80){

shaormaY =
window.innerHeight-80;

shaormaVelocity = 0;

}





shaorma.style.top =
shaormaY + "px";



}









// =====================================
// MISCARE DRONA
// =====================================


function updateDrone(){



droneX -=
boostActive ? 9 : droneSpeed;



if(droneX < -150){



droneX =
window.innerWidth;



droneY =
Math.random() *
(window.innerHeight-150);



}



drone.style.left =
droneX + "px";


drone.style.top =
droneY + "px";



}









// =====================================
// MISCARE INGREDIENT
// =====================================


function updateIngredient(){



if(!currentIngredient){

return;

}



ingredientX -= ingredientSpeed;



ingredient.style.left =
ingredientX + "px";





if(ingredientX < -100){


spawnIngredient();


}



}









// =====================================
// BOOST UPDATE
// =====================================


function updateBoost(){



if(!boostActive){

return;

}



let elapsed =
Date.now()-boostStart;



let percent =
100 -
(elapsed/boostTime*100);



boostFill.style.width =
Math.max(percent,0)+"%";





if(percent<=0){



boostActive=false;


boostBar.style.display="none";



}



}









// =====================================
// PORNIRE BOOST
// =====================================


function activateBoost(){



boostActive=true;


boostStart=Date.now();



boostBar.style.display="block";


boostFill.style.width="100%";



}// =====================================
// PARTEA 3/5
// COLIZIUNI + INGREDIENTE + BOOST
// =====================================






// =====================================
// HITBOX SHAORMA
// =====================================


function getShaormaBox(){


return {

x:
shaorma.offsetLeft +
(shaorma.width-shaormaHitbox.width)/2,


y:
shaormaY +
(shaorma.height-shaormaHitbox.height)/2,


width:
shaormaHitbox.width,


height:
shaormaHitbox.height


};


}









// =====================================
// HITBOX DRONA
// =====================================


function getDroneBox(){



return {


x:
droneX+
(drone.width-droneHitbox.width)/2,


y:
droneY+
(drone.height-droneHitbox.height)/2,


width:
droneHitbox.width,


height:
droneHitbox.height



};


}









// =====================================
// COLIZIUNE GENERALA
// =====================================


function checkCollision(a,b){



return (

a.x < b.x+b.width &&

a.x+a.width > b.x &&

a.y < b.y+b.height &&

a.y+a.height > b.y

);



}









// =====================================
// VERIFICA DRONA
// =====================================


function checkDrone(){



let s =
getShaormaBox();



let d =
getDroneBox();



if(checkCollision(s,d)){



endGame();


}



}









// =====================================
// HITBOX INGREDIENT
// =====================================


function checkIngredient(){



if(!currentIngredient){

return;

}



let s =
getShaormaBox();



let i = {


x:ingredientX,


y:ingredientY,


width:55,


height:55



};





if(checkCollision(s,i)){



score +=
currentIngredient.points;



scoreText.innerHTML =
"Scor: "+score;






if(score>record){



record=score;



localStorage.setItem(
"shaormaRecord",
record
);



recordText.innerHTML =
"Record: "+record;



}






// BOOST LA SOS IUTE


if(currentIngredient.boost){


activateBoost();


}






spawnIngredient();



}



}








// =====================================
// BOOST SHAORMA CLASA CSS
// =====================================


function updateBoostEffect(){



if(boostActive){


shaorma.classList.add("boost");


}

else{


shaorma.classList.remove("boost");


}


}// =====================================
// PARTEA 4/5
// START + GAME OVER + CONTROALE
// =====================================






function startGame(){



gameRunning=true;


gameOverState=false;



startButton.style.display="none";



score=0;


scoreText.innerHTML="Scor: 0";



shaormaY =
window.innerHeight/2;



shaormaVelocity=0;



droneX =
window.innerWidth;



spawnIngredient();



}








function endGame(){



gameRunning=false;


gameOverState=true;



startButton.style.display="block";



startButton.innerHTML=
"GAME OVER<br>RESTART";



}





function restartGame(){



score=0;



scoreText.innerHTML=
"Scor: 0";



boostActive=false;



boostBar.style.display="none";



shaorma.classList.remove("boost");



droneX =
window.innerWidth;



shaormaY =
window.innerHeight/2;



shaormaVelocity=0;



spawnIngredient();



gameRunning=true;



gameOverState=false;



startButton.style.display="none";



}









// =====================================
// CONTROALE PC
// =====================================



document.addEventListener(
"keydown",
function(e){



if(e.code==="Space"){



pressing=true;



if(gameOverState){

restartGame();

}



}



});







document.addEventListener(
"keyup",
function(e){



if(e.code==="Space"){


pressing=false;


}



});









// =====================================
// CONTROALE TELEFON
// =====================================



document.addEventListener(
"touchstart",
function(){



pressing=true;



if(gameOverState){

restartGame();

}



});







document.addEventListener(
"touchend",
function(){


pressing=false;


});









// =====================================
// BUTON START
// =====================================



startButton.addEventListener(
"click",
function(){



if(gameOverState){


restartGame();


}

else{


startGame();


}



});// =====================================
// PARTEA 5/5
// GAME LOOP + PORNIRE
// =====================================





function gameLoop(){



if(gameRunning){



updateShaorma();


updateDrone();


updateIngredient();


updateBoost();


updateBoostEffect();



checkDrone();


checkIngredient();



}



requestAnimationFrame(gameLoop);



}








// =====================================
// START INITIAL
// =====================================



startButton.style.display="block";


startButton.innerHTML="START";



gameLoop();
