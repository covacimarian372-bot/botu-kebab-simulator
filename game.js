let shaorma = document.getElementById("shaorma");
let obstacol = document.getElementById("obstacol");
let ingredient = document.getElementById("ingredient");
let start = document.getElementById("start");
let scorText = document.getElementById("scor");



let y = window.innerHeight / 2;
let viteza = 0;


let gravitatie = 0.45;
let fortaZbor = -7;


let apasat = false;
let pornit = false;
let terminat = false;



// SCOR

let scor = 0;





// DRONA

let xObstacol = window.innerWidth + 200;
let yObstacol = 250;
let vitezaObstacol = 5;





// INGREDIENTE

let ingrediente = [

"varza.png",

"cartof.png",

"carne.png",

"rosie.png",

"ceapa.png",

"sos_iute.png"

];



let xIngredient = window.innerWidth + 300;

let yIngredient = 300;

let vitezaIngredient = 5;







function incepe(){


if(!pornit && !terminat){


pornit = true;

start.style.display = "none";

creeazaIngredient();


}


}







// CONTROL PC

document.addEventListener("keydown",function(e){


if(e.code === "Space"){


incepe();

apasat = true;


}


});



document.addEventListener("keyup",function(e){


if(e.code === "Space"){


apasat = false;


}


});








// CONTROL TELEFON

document.addEventListener("touchstart",function(){


incepe();

apasat = true;


});



document.addEventListener("touchend",function(){


apasat = false;


});









// CREEAZA INGREDIENT

function creeazaIngredient(){


let ales = ingrediente[Math.floor(Math.random()*ingrediente.length)];


ingredient.src = "images/" + ales;


xIngredient = window.innerWidth + 100;


yIngredient = Math.random() * (window.innerHeight - 150);



ingredient.style.display = "block";


}









// MISCA INGREDIENT

function miscaIngredient(){



xIngredient -= vitezaIngredient;



if(xIngredient < -100){


creeazaIngredient();


}



ingredient.style.left = xIngredient + "px";


ingredient.style.top = yIngredient + "px";



}









// HITBOX INGREDIENT

function verificaIngredient(){


let shaormaBox = shaorma.getBoundingClientRect();

let ingredientBox = ingredient.getBoundingClientRect();




if(

shaormaBox.left < ingredientBox.right &&

shaormaBox.right > ingredientBox.left &&

shaormaBox.top < ingredientBox.bottom &&

shaormaBox.bottom > ingredientBox.top

){



scor += 10;


scorText.innerHTML = "Scor: " + scor;



creeazaIngredient();


}


}









// HITBOX DRONA

function verificaColiziune(){


let shaormaBox = shaorma.getBoundingClientRect();

let dronaBox = obstacol.getBoundingClientRect();





let shaormaHit = {


left: shaormaBox.left + (shaormaBox.width - 137) / 2,

right: shaormaBox.left + (shaormaBox.width - 137) / 2 + 137,

top: shaormaBox.top + (shaormaBox.height - 66) / 2,

bottom: shaormaBox.top + (shaormaBox.height - 66) / 2 + 66


};





let dronaHit = {


left: dronaBox.left + (dronaBox.width - 123) / 2,

right: dronaBox.left + (dronaBox.width - 123) / 2 + 123,

top: dronaBox.top + (dronaBox.height - 52) / 2,

bottom: dronaBox.top + (dronaBox.height - 52) / 2 + 52


};






if(

shaormaHit.left < dronaHit.right &&

shaormaHit.right > dronaHit.left &&

shaormaHit.top < dronaHit.bottom &&

shaormaHit.bottom > dronaHit.top

){


gameOver();


}


}









function gameOver(){


terminat = true;

pornit = false;


start.style.display = "block";

start.innerHTML = "GAME OVER<br><br>APASĂ PENTRU RESTART";


}









function restart(){


if(terminat){


terminat = false;


pornit = true;


scor = 0;


scorText.innerHTML = "Scor: 0";


start.style.display = "none";



y = window.innerHeight / 2;


viteza = 0;



xObstacol = window.innerWidth + 200;



creeazaIngredient();


}


}









function joc(){



if(pornit){



// ZBOR

if(apasat){


viteza = fortaZbor;


}



viteza += gravitatie;


y += viteza;






if(y < 0){

y = 0;

}



if(y > window.innerHeight - 150){


y = window.innerHeight - 150;


}



shaorma.style.top = y + "px";









// DRONA

xObstacol -= vitezaObstacol;



if(xObstacol < -150){


xObstacol = window.innerWidth + 200;


yObstacol = Math.random() * (window.innerHeight - 200);


}



obstacol.style.left = xObstacol + "px";


obstacol.style.top = yObstacol + "px";









// INGREDIENT

miscaIngredient();


verificaIngredient();






// COLIZIUNE

verificaColiziune();



}





requestAnimationFrame(joc);


}







start.addEventListener("click",function(){


restart();


});







joc();
