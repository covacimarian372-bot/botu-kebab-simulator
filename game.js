let shaorma = document.getElementById("shaorma");

let obstacol = document.getElementById("obstacol");

let start = document.getElementById("start");



let y = window.innerHeight / 2;

let viteza = 0;



let gravitatie = 0.45;

let fortaZbor = -7;



let apasat = false;

let pornit = false;




// DRONA

let xObstacol = window.innerWidth + 200;

let yObstacol = 250;

let vitezaObstacol = 5;






shaorma.style.top = y + "px";






function incepe(){


if(!pornit){

pornit=true;

start.style.display="none";

}


}






// PC

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






// TELEFON

document.addEventListener("touchstart",function(){


incepe();

apasat=true;


});




document.addEventListener("touchend",function(){


apasat=false;


});









function joc(){



if(pornit){



// ZBOR SHAORMA


if(apasat){


viteza=fortaZbor;


}



viteza += gravitatie;


y += viteza;





if(y < 0){


y=0;


}





if(y > window.innerHeight-150){


y=window.innerHeight-150;


}



shaorma.style.top=y+"px";







// MISCARE DRONA


xObstacol -= vitezaObstacol;




if(xObstacol < -150){


xObstacol = window.innerWidth + 200;


yObstacol = Math.random() * (window.innerHeight-200);


}





obstacol.style.left=xObstacol+"px";


obstacol.style.top=yObstacol+"px";



}




requestAnimationFrame(joc);



}




joc();
