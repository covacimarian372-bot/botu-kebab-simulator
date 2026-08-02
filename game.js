let shaorma = document.getElementById("shaorma");
let obstacol = document.getElementById("obstacol");
let ingredient = document.getElementById("ingredient");
let start = document.getElementById("start");
let scorText = document.getElementById("scor");

let containerParticule = document.getElementById("particule");

if(!containerParticule){
    containerParticule = document.createElement("div");
    containerParticule.id="particule";
    document.body.appendChild(containerParticule);
}


// JOC

let pornit = false;
let terminat = false;
let apasat = false;


// SHAORMA

let y = window.innerHeight / 2;
let viteza = 0;

let gravitatie = 0.45;
let fortaZbor = -7;


// BOOST

let boostActiv = false;

let timpBoost = 15000;

let fortaBoost = -10;


// VITEZE BOOST

let vitezaNormalaDrona = 5;
let vitezaBoostDrona = 10;

let vitezaNormalaIngredient = 6;
let vitezaBoostIngredient = 12;





// SCOR

let scor = 0;



// DRONA

let xObstacol = window.innerWidth + 400;
let yObstacol = 250;

let vitezaObstacol = vitezaNormalaDrona;





// INGREDIENTE

let ingrediente = [

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


let xIngredient = 0;
let yIngredient = 300;

let vitezaIngredient = vitezaNormalaIngredient;



// SOS IUTE

let ultimaAparitieSos = 0;

let timpSos = 60000;







function creeazaIngredient(){


let acum = Date.now();



if(acum - ultimaAparitieSos >= timpSos && Math.random()<0.3){


ingredientActual={

nume:"sos_iute.png",

puncte:30

};


ultimaAparitieSos = acum;


}

else{


ingredientActual = ingrediente[
Math.floor(Math.random()*ingrediente.length)
];


}



ingredient.src="images/"+ingredientActual.nume;


ingredient.style.display="block";


xIngredient=window.innerWidth+100;


yIngredient=Math.random()*(window.innerHeight-120);



ingredient.style.left=xIngredient+"px";

ingredient.style.top=yIngredient+"px";


}








function miscaIngredient(){


xIngredient-=vitezaIngredient;


ingredient.style.left=xIngredient+"px";



if(xIngredient < -100){

creeazaIngredient();

}


}








function creeazaParticule(){


let poz=shaorma.getBoundingClientRect();



for(let i=0;i<10;i++){


let p=document.createElement("div");


p.className="particula";


p.style.left=poz.left+80+"px";

p.style.top=poz.top+50+"px";



p.style.setProperty("--x",
(Math.random()*120-60)+"px"
);



p.style.setProperty("--y",
(Math.random()*120-60)+"px"
);



containerParticule.appendChild(p);



setTimeout(()=>{

p.remove();

},600);


}


}








function verificaIngredient(){


let s=shaorma.getBoundingClientRect();

let ing=ingredient.getBoundingClientRect();




if(

s.left < ing.right &&

s.right > ing.left &&

s.top < ing.bottom &&

s.bottom > ing.top

){



scor+=ingredientActual.puncte;


scorText.innerHTML="Scor: "+scor;



creeazaParticule();



shaorma.classList.add("ia-ingredient");



setTimeout(()=>{


shaorma.classList.remove("ia-ingredient");


},200);






// BOOST SOS IUTE

if(ingredientActual.nume=="sos_iute.png"){


boostActiv=true;


shaorma.classList.add("boost");



vitezaObstacol=vitezaBoostDrona;

vitezaIngredient=vitezaBoostIngredient;



setTimeout(()=>{


boostActiv=false;


shaorma.classList.remove("boost");



vitezaObstacol=vitezaNormalaDrona;

vitezaIngredient=vitezaNormalaIngredient;



},timpBoost);



}





creeazaIngredient();


}


}









function verificaColiziune(){


let s=shaorma.getBoundingClientRect();

let d=obstacol.getBoundingClientRect();




let shaormaHit={

left:s.left+20,

right:s.left+157,

top:s.top+15,

bottom:s.top+81

};



let dronaHit={

left:d.left+10,

right:d.left+113,

top:d.top+10,

bottom:d.top+42

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

apasat=false;



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



xObstacol=window.innerWidth+400;

yObstacol=250;



boostActiv=false;


shaorma.classList.remove("boost");



vitezaObstacol=vitezaNormalaDrona;

vitezaIngredient=vitezaNormalaIngredient;



start.style.display="none";



creeazaIngredient();


}








function incepe(){


if(terminat){

return;

}



if(!pornit){


pornit=true;


start.style.display="none";


creeazaIngredient();


}


}








document.addEventListener("keydown",function(e){


if(e.code=="Space" && !terminat){


incepe();


apasat=true;


}


});





document.addEventListener("keyup",function(e){


if(e.code=="Space"){


apasat=false;


}


});





document.addEventListener("touchstart",function(){


if(!terminat){


incepe();


apasat=true;


}


});





document.addEventListener("touchend",function(){


apasat=false;


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



if(boostActiv){


viteza=fortaBoost;


}

else{


viteza=fortaZbor;


}


}




viteza+=gravitatie;


y+=viteza;


shaorma.style.top=y+"px";





// DRONA

xObstacol-=vitezaObstacol;



if(xObstacol<-150){


xObstacol=window.innerWidth+400;


yObstacol=Math.random()*(window.innerHeight-200);


}



obstacol.style.left=xObstacol+"px";


obstacol.style.top=yObstacol+"px";







// INGREDIENTE

miscaIngredient();


verificaIngredient();


verificaColiziune();



}




requestAnimationFrame(joc);


}



joc();
