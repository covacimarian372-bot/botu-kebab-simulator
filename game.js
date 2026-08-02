let shaorma = document.getElementById("shaorma");
let obstacol = document.getElementById("obstacol");
let ingredient = document.getElementById("ingredient");
let start = document.getElementById("start");
let scorText = document.getElementById("scor");


// JOC

let pornit = false;
let terminat = false;
let apasat = false;


// SHAORMA

let y = window.innerHeight / 2;
let viteza = 0;

let gravitatie = 0.45;
let fortaZbor = -7;



// SCOR

let scor = 0;



// DRONA

let xObstacol = window.innerWidth + 200;
let yObstacol = 250;
let vitezaObstacol = 5;





// INGREDIENTE

let listaIngrediente = [

{
nume:"rosie.png",
puncte:10
},

{
nume:"carne.png",
puncte:20
},

{
nume:"cartof.png",
puncte:15
},

{
nume:"varza.png",
puncte:5
},

{
nume:"ceapa.png",
puncte:5
},

{
nume:"sos_iute.png",
puncte:30
}

];


let ingredientActual;

let xIngredient = 0;

let yIngredient = 0;

let vitezaIngredient = 5;









function incepe(){


if(!pornit && !terminat){


pornit = true;

start.style.display="none";

creeazaIngredient();


}


}








// CONTROL PC

document.addEventListener("keydown",function(e){


if(e.code==="Space"){


incepe();

apasat=true;


}


});


document.addEventListener("keyup",function(e){


if(e.code==="Space"){


apasat=false;


}


});







// CONTROL MOBIL

document.addEventListener("touchstart",function(){


incepe();

apasat=true;


});


document.addEventListener("touchend",function(){


apasat=false;


});









// CREEAZA INGREDIENT

function creeazaIngredient(){


ingredientActual = listaIngrediente[
Math.floor(Math.random()*listaIngrediente.length)
];



ingredient.src = "images/" + ingredientActual.nume;



ingredient.style.display="block";



xIngredient = window.innerWidth + 100;


yIngredient = Math.random() * (window.innerHeight - 150);



ingredient.style.left = xIngredient + "px";


ingredient.style.top = yIngredient + "px";


}









// MISCA INGREDIENT

function miscaIngredient(){


xIngredient -= vitezaIngredient;



if(xIngredient < -100){


creeazaIngredient();


}



ingredient.style.left = xIngredient + "px";



}








// COLECTARE INGREDIENT

function verificaIngredient(){


let shaormaBox = shaorma.getBoundingClientRect();


let ingBox = ingredient.getBoundingClientRect();





if(

shaormaBox.left < ingBox.right &&

shaormaBox.right > ingBox.left &&

shaormaBox.top < ingBox.bottom &&

shaormaBox.bottom > ingBox.top

){


scor += ingredientActual.puncte;



scorText.innerHTML = "Scor: " + scor;



creeazaIngredient();



}



}









// COLIZIUNE DRONA

function verificaColiziune(){



let shaormaBox = shaorma.getBoundingClientRect();

let dronaBox = obstacol.getBoundingClientRect();





// SHAORMA 137x66

let shaormaHit = {


left: shaormaBox.left + (shaormaBox.width - 137) / 2,

right: shaormaBox.left + (shaormaBox.width - 137) / 2 + 137,


top: shaormaBox.top + (shaormaBox.height - 66) / 2,


bottom: shaormaBox.top + (shaormaBox.height - 66) / 2 + 66


};







// DRONA 123x52

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


terminat=true;

pornit=false;



start.style.display="block";


start.innerHTML="GAME OVER<br><br>APASĂ PENTRU RESTART";



}









function restart(){


if(terminat){


terminat=false;


pornit=true;


scor=0;


scorText.innerHTML="Scor: 0";


start.style.display="none";


y=window.innerHeight/2;


viteza=0;


xObstacol=window.innerWidth+200;



creeazaIngredient();


}


}









function joc(){



if(pornit){



// ZBOR SHAORMA

if(apasat){


viteza=fortaZbor;


}



viteza+=gravitatie;


y+=viteza;





if(y<0){

y=0;

}



if(y>window.innerHeight-150){


y=window.innerHeight-150;


}



shaorma.style.top=y+"px";








// DRONA

xObstacol -= vitezaObstacol;



if(xObstacol < -150){


xObstacol = window.innerWidth + 200;


yObstacol = Math.random() * (window.innerHeight - 200);


}



obstacol.style.left=xObstacol+"px";


obstacol.style.top=yObstacol+"px";








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
