// =======================================
// SHAORMA ZBURATOARE
// GAME.JS NOU - BAZA STABILA
// =======================================


// ELEMENTE HTML

const shaorma = document.getElementById("shaorma");
const drone = document.getElementById("drone");
const ingredient = document.getElementById("ingredient");

const scoreText = document.getElementById("score");
const recordText = document.getElementById("record");

const startButton = document.getElementById("startButton");

const boostBar = document.getElementById("boostBar");
const boostFill = document.getElementById("boostFill");



// =======================================
// JOC
// =======================================

let running = false;

let gameOver = false;

let pressing = false;



// =======================================
// SHAORMA
// =======================================

let shaormaY = window.innerHeight / 2;

let shaormaVelocity = 0;


const gravity = 0.45;

const jumpPower = -7;

const boostPower = -10;


// hitbox shaorma

const shaormaHitbox = {

width:96,

height:49

};




// =======================================
// DRONA
// =======================================

let droneX = window.innerWidth;

let droneY = 250;


const droneSpeed = 5;


// hitbox drona

const droneHitbox = {

width:93,

height:53

};




// =======================================
// SCOR
// =======================================

let score = 0;


let record =
Number(localStorage.getItem("shaormaRecord")) || 0;


recordText.innerHTML =
"Record: " + record;




// =======================================
// BOOST
// =======================================

let boostActive = false;


let boostStart = 0;


const boostDuration = 15000;




// =======================================
// INGREDIENTE
// =======================================

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


let currentIngredient = null;


let ingredientX = 0;

let ingredientY = 0;


const ingredientSpeed = 6;





function spawnIngredient(){


currentIngredient =
ingredients[
Math.floor(Math.random()*ingredients.length)
];



ingredient.src =
"images/" + currentIngredient.image;



ingredient.style.display="block";



ingredientX = window.innerWidth;


ingredientY =
Math.random() *
(window.innerHeight-120);



ingredient.style.left =
ingredientX+"px";


ingredient.style.top =
ingredientY+"px";


}// =======================================
// PARTEA 2/5
// MISCARE + FIZICA
// =======================================



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



if(shaormaY > window.innerHeight - shaorma.height){

shaormaY =
window.innerHeight - shaorma.height;

shaormaVelocity = 0;

}





shaorma.style.top =
shaormaY + "px";



}








// =======================================
// DRONA
// =======================================


function updateDrone(){



droneX -=
boostActive ? 9 : droneSpeed;



if(droneX < -150){


droneX = window.innerWidth;



droneY =
Math.random() *
(window.innerHeight-150);



}




drone.style.left =
droneX+"px";


drone.style.top =
droneY+"px";


}








// =======================================
// INGREDIENT
// =======================================


function updateIngredient(){



if(!currentIngredient){

return;

}



ingredientX -= ingredientSpeed;



ingredient.style.left =
ingredientX+"px";



if(ingredientX < -100){


spawnIngredient();


}



}







// =======================================
// BOOST
// =======================================


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



let elapsed =
Date.now()-boostStart;



let percent =
100 -
(elapsed/boostDuration*100);





boostFill.style.width =
Math.max(percent,0)+"%";





if(percent<=0){



boostActive=false;


boostBar.style.display="none";



}



}








function updateBoostVisual(){



if(boostActive){


shaorma.classList.add("boost");


}

else{


shaorma.classList.remove("boost");


}



}// =======================================
// PARTEA 3/5
// HITBOX + COLIZIUNI
// =======================================





function getShaormaBox(){



return {


x:
shaorma.offsetLeft + 22,


y:
shaormaY + 25,


width:
shaormaHitbox.width,


height:
shaormaHitbox.height



};



}








function getDroneBox(){



return {


x:
droneX + 13,


y:
droneY + 10,


width:
droneHitbox.width,


height:
droneHitbox.height



};



}








function checkCollision(a,b){



let padding = 8;



return (

a.x + padding < b.x+b.width &&

a.x+a.width-padding > b.x &&

a.y + padding < b.y+b.height &&

a.y+a.height-padding > b.y

);



}









function checkDroneCollision(){



let s =
getShaormaBox();


let d =
getDroneBox();



if(checkCollision(s,d)){



endGame();



}



}








function checkIngredientCollision(){



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



score += currentIngredient.points;



scoreText.innerHTML =
"Scor: "+score;





if(score > record){



record=score;



localStorage.setItem(
"shaormaRecord",
record
);



recordText.innerHTML =
"Record: "+record;



}







if(currentIngredient.boost){


activateBoost();


}





spawnIngredient();



}



}// =======================================
// PARTEA 4/5
// START + RESTART + CONTROALE
// =======================================





function startGame(){


running=true;

gameOver=false;


startButton.style.display="none";



score=0;


scoreText.innerHTML=
"Scor: 0";



shaormaY =
window.innerHeight/2;


shaormaVelocity=0;



droneX =
window.innerWidth;



spawnIngredient();



}








function endGame(){



running=false;


gameOver=true;



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



shaormaY =
window.innerHeight/2;


shaormaVelocity=0;



droneX =
window.innerWidth;



spawnIngredient();



gameOver=false;


running=true;



startButton.style.display="none";



}








// =======================================
// TASTATURA
// =======================================


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








// =======================================
// TOUCH
// =======================================



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









// =======================================
// BUTON
// =======================================



startButton.addEventListener(
"click",
()=>{


if(gameOver){


restartGame();


}

else{


startGame();


}


});// =======================================
// PARTEA 5/5
// GAME LOOP
// =======================================





function gameLoop(){



if(running){



updateShaorma();


updateDrone();


updateIngredient();



updateBoost();


updateBoostVisual();



checkDroneCollision();


checkIngredientCollision();



}



requestAnimationFrame(gameLoop);



}







// =======================================
// INITIALIZARE
// =======================================



startButton.style.display="block";


startButton.innerHTML="START";



gameLoop();
