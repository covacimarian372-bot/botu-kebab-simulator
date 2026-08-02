let shaorma = document.getElementById("shaorma");
let obstacol = document.getElementById("obstacol");
let ingredient = document.getElementById("ingredient");

let start = document.getElementById("start");

let scorText = document.getElementById("scor");
let recordText = document.getElementById("record");

let boostBar = document.getElementById("boostBar");
let boostProgress = document.getElementById("boostProgress");

let containerParticule = document.getElementById("particule");



// AUDIO

let audioCtx;


function sunet(freq, timp, volum){

    if(!audioCtx){
        audioCtx = new AudioContext();
    }

    let osc = audioCtx.createOscillator();
    let gain = audioCtx.createGain();

    osc.frequency.value = freq;
    gain.gain.value = volum;

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();

    setTimeout(()=>{
        osc.stop();
    }, timp);

}



function vibratie(t){

    if(navigator.vibrate){
        navigator.vibrate(t);
    }

}




// STARE JOC

let pornit=false;
let terminat=false;
let apasat=false;




// SHAORMA

let y=window.innerHeight/2;

let viteza=0;

let gravitatie=0.45;

let fortaZbor=-7;





// BOOST

let boostActiv=false;

let timpBoost=15000;

let fortaBoost=-10;


let vitezaNormalaDrona=5;
let vitezaBoostDrona=10;


let vitezaNormalaIngredient=6;
let vitezaBoostIngredient=12;





// SCOR

let scor=0;


let record=Number(localStorage.getItem("recordShaorma")) || 0;


recordText.innerHTML="Record: "+record;







// DRONA

let xObstacol=window.innerWidth+300;

let yObstacol=250;


let vitezaObstacol=vitezaNormalaDrona;







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


let vitezaIngredient=vitezaNormalaIngredient;







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






function creeazaParticule(){


let poz=shaorma.getBoundingClientRect();



for(let i=0;i<15;i++){


let p=document.createElement("div");


p.className="particula";


p.style.left=poz.left+60+"px";

p.style.top=poz.top+40+"px";


p.style.setProperty("--x",
(Math.random()*120-60)+"px"
);


p.style.setProperty("--y",
(Math.random()*120-60)+"px"
);



containerParticule.appendChild(p);



setTimeout(()=>{

p.remove();

},700);


}


}function verificaIngredient(){


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



sunet(700,120,0.08);

vibratie(40);


creeazaParticule();




if(ingredientActual.nume=="sos_iute.png"){


boostActiv=true;


shaorma.classList.add("boost");


vitezaObstacol=vitezaBoostDrona;

vitezaIngredient=vitezaBoostIngredient;



boostBar.style.display="block";


boostProgress.style.width="100%";



let startBoost=Date.now();



let interval=setInterval(()=>{


let trecut=Date.now()-startBoost;


let ramas=100-(trecut/timpBoost*100);


boostProgress.style.width=ramas+"%";



if(ramas<=0){

clearInterval(interval);

}


},100);





setTimeout(()=>{


boostActiv=false;


shaorma.classList.remove("boost");


vitezaObstacol=vitezaNormalaDrona;

vitezaIngredient=vitezaNormalaIngredient;


boostBar.style.display="none";


},timpBoost);



}



shaorma.classList.add("ia-ingredient");


setTimeout(()=>{

shaorma.classList.remove("ia-ingredient");

},200);



creeazaIngredient();


}


}







function explozieDrona(){


let poz=obstacol.getBoundingClientRect();



sunet(100,500,0.2);

vibratie([200,100,300]);



for(let i=0;i<30;i++){


let p=document.createElement("div");


p.className="particula";


p.style.left=poz.left+50+"px";

p.style.top=poz.top+40+"px";


p.style.background="red";



p.style.setProperty("--x",
(Math.random()*300-150)+"px"
);


p.style.setProperty("--y",
(Math.random()*300-150)+"px"
);



document.body.appendChild(p);



setTimeout(()=>{

p.remove();

},700);


}



obstacol.style.transform="scale(0) rotate(360deg)";


}








function verificaColiziune(){


let s=shaorma.getBoundingClientRect();

let d=obstacol.getBoundingClientRect();



if(

s.left<d.right &&
s.right>d.left &&
s.top<d.bottom &&
s.bottom>d.top

){


explozieDrona();

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


xObstacol=window.innerWidth+300;


obstacol.style.transform="scale(1)";


obstacol.style.display="block";


boostActiv=false;


vitezaObstacol=vitezaNormalaDrona;

vitezaIngredient=vitezaNormalaIngredient;



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





// BARA BOOST

boostBar.style.left=(shaorma.offsetLeft+20)+"px";

boostBar.style.top=(y+100)+"px";







// DRONA


xObstacol-=vitezaObstacol;



if(xObstacol<-150){


xObstacol=window.innerWidth+300;


yObstacol=Math.random()*(window.innerHeight-150);


obstacol.style.transform="scale(1)";


}



obstacol.style.left=xObstacol+"px";

obstacol.style.top=yObstacol+"px";






miscaIngredient();


verificaIngredient();


verificaColiziune();



}



requestAnimationFrame(joc);


}





joc();
