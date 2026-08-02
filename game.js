let shaorma = document.getElementById("shaorma");
let obstacol = document.getElementById("obstacol");
let ingredient = document.getElementById("ingredient");
let start = document.getElementById("start");
let scorText = document.getElementById("scor");


let pornit = false;
let apasat = false;


// SHAORMA

let y = window.innerHeight / 2;
let viteza = 0;

let gravitatie = 0.45;
let fortaZbor = -7;



// DRONA

let xObstacol = window.innerWidth;
let yObstacol = 250;





// INGREDIENT TEST

let xIngredient = 500;
let yIngredient = 300;



function incepe(){

pornit = true;

start.style.display="none";

creeazaIngredient();

}




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





document.addEventListener("touchstart",function(){

incepe();

apasat=true;

});



document.addEventListener("touchend",function(){

apasat=false;

});







function creeazaIngredient(){


console.log("creez ingredient");


ingredient.src="images/rosie.png";


ingredient.style.display="block";


ingredient.style.position="absolute";


ingredient.style.width="80px";


xIngredient = window.innerWidth - 200;


yIngredient = 300;


ingredient.style.left=xIngredient+"px";


ingredient.style.top=yIngredient+"px";


}









function joc(){


if(pornit){



// SHAORMA

if(apasat){

viteza=fortaZbor;

}


viteza+=gravitatie;


y+=viteza;


shaorma.style.top=y+"px";





// DRONA

xObstacol-=5;


obstacol.style.left=xObstacol+"px";


obstacol.style.top=yObstacol+"px";





}


requestAnimationFrame(joc);


}



joc();
