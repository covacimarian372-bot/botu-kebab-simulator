let shaorma = document.getElementById("shaorma");
let obstacol = document.getElementById("obstacol");
let start = document.getElementById("start");


let y = window.innerHeight / 2;
let viteza = 0;


let gravitatie = 0.45;
let fortaZbor = -7;


let apasat = false;
let pornit = false;
let terminat = false;



// DRONA

let xObstacol = window.innerWidth + 200;
let yObstacol = 250;
let vitezaObstacol = 5;



shaorma.style.top = y + "px";





function incepe(){


if(!pornit && !terminat){

pornit = true;

start.style.display = "none";

}

}





// PC

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






// MOBIL

document.addEventListener("touchstart",function(){

incepe();

apasat = true;

});



document.addEventListener("touchend",function(){

apasat = false;

});









// HITBOXURI CORECTE

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


terminat = true;

pornit = false;


start.style.display = "block";

start.innerHTML = "GAME OVER<br><br>APASĂ PENTRU RESTART";


}









function restart(){


if(terminat){


terminat = false;

pornit = true;


start.style.display = "none";



y = window.innerHeight / 2;

viteza = 0;



xObstacol = window.innerWidth + 200;


}


}









function joc(){



if(pornit){



// ZBOR SHAORMA


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









// MISCARE DRONA


xObstacol -= vitezaObstacol;



if(xObstacol < -150){


xObstacol = window.innerWidth + 200;


yObstacol = Math.random() * (window.innerHeight - 200);


}



obstacol.style.left = xObstacol + "px";

obstacol.style.top = yObstacol + "px";








// COLIZIUNE

verificaColiziune();



}





requestAnimationFrame(joc);



}







start.addEventListener("click",function(){


restart();


});






joc();
