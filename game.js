let shaorma = document.getElementById("shaorma");
let obstacol = document.getElementById("obstacol");
let ingredient = document.getElementById("ingredient");

let start = document.getElementById("start");

let scorText = document.getElementById("scor");
let recordText = document.getElementById("record");

let boostBar = document.getElementById("boostBar");
let boostProgress = document.getElementById("boostProgress");



// STARE

let pornit=false;
let terminat=false;
let apasat=false;



// SHAORMA

let y=window.innerHeight/2;
let viteza=0;

let gravitatie=0.45;
let fortaZbor=-7;



// SCOR

let scor=0;

let record=Number(localStorage.getItem("recordShaorma")) || 0;

recordText.innerHTML="Record: "+record;




// BOOST

let boostActiv=false;

let timpBoost=15000;

let fortaBoost=-10;



// DRONA

let xObstacol=window.innerWidth;

let yObstacol=250;

let vitezaObstacol=5;



// INGREDIENTE


let ingrediente=[

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
}

];


let ingredientActual;


let xIngredient=0;

let yIngredient=300;

let vitezaIngredient=6;




// CREARE INGREDIENT


function creeazaIngredient(){


ingredientActual =
ingrediente[Math.floor(Math.random()*ingrediente.length)];


ingredient.src="images/"+ingredientActual.nume;


ingredient.style.display="block";


xIngredient=window.innerWidth;


yIngredient=Math.random()*(window.innerHeight-100);


ingredient.style.left=xIngredient+"px";

ingredient.style.top=yIngredient+"px";


}






function miscaIngredient(){


xIngredient-=vitezaIngredient;


ingredient.style.left=xIngredient+"px";



if(xIngredient<-100){

creeazaIngredient();

}


}







// COLECTARE


function verificaIngredient(){


let s=shaorma.getBoundingClientRect();

let i=ingredient.getBoundingClientRect();



if(

s.left<i.right &&
s.right>i.left &&
s.top<i.bottom &&
s.bottom>i.top

){


scor+=ingredientActual.puncte;


scorText.innerHTML="Scor: "+scor;



if(scor>record){

record=scor;

localStorage.setItem("recordShaorma",record);

}


recordText.innerHTML="Record: "+record;



creeazaIngredient();


}


}









// COLIZIUNE DRONA


function verificaColiziune(){


let s=shaorma.getBoundingClientRect();

let d=obstacol.getBoundingClientRect();



if(

s.left<d.right &&
s.right>d.left &&
s.top<d.bottom &&
s.bottom>d.top

){


gameOver();


}


}








function gameOver(){


terminat=true;

pornit=false;

start.style.display="block";

start.innerHTML="GAME OVER<br><br>RESTART";


}









function restart(){


terminat=false;

pornit=true;


scor=0;

scorText.innerHTML="Scor: 0";


y=window.innerHeight/2;

viteza=0;


xObstacol=window.innerWidth;


start.style.display="none";


creeazaIngredient();


}









function incepe(){


if(!pornit && !terminat){


pornit=true;

start.style.display="none";

creeazaIngredient();


}


}







document.addEventListener("keydown",function(e){


if(e.code=="Space"){


if(terminat){

restart();

}


incepe();


apasat=true;


}


});





document.addEventListener("keyup",function(e){


if(e.code=="Space"){

apasat=false;

}


});






start.addEventListener("click",function(){


if(terminat){

restart();

}

else{

incepe();

}


});









function joc(){


if(pornit){


if(apasat){

viteza=fortaZbor;


}


viteza+=gravitatie;


y+=viteza;


shaorma.style.top=y+"px";




// DRONA


xObstacol-=vitezaObstacol;


if(xObstacol<-150){


xObstacol=window.innerWidth;


yObstacol=Math.random()*(window.innerHeight-150);


}


obstacol.style.left=xObstacol+"px";

obstacol.style.top=yObstacol+"px";




// INGREDIENT


miscaIngredient();


verificaIngredient();


verificaColiziune();


}



requestAnimationFrame(joc);


}



joc();
