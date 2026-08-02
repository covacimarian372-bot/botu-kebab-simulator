let shaorma = document.getElementById("shaorma");
let obstacol = document.getElementById("obstacol");
let ingredient = document.getElementById("ingredient");

let start = document.getElementById("start");

let scorText = document.getElementById("scor");
let recordText = document.getElementById("record");

let boostBar = document.getElementById("boostBar");
let boostProgress = document.getElementById("boostProgress");



// AUDIO

let audioCtx;


function sunet(freq,timp,volum){

    if(!audioCtx){
        audioCtx=new AudioContext();
    }


    let osc=audioCtx.createOscillator();
    let gain=audioCtx.createGain();


    osc.frequency.value=freq;
    gain.gain.value=volum;


    osc.connect(gain);
    gain.connect(audioCtx.destination);


    osc.start();


    setTimeout(()=>{
        osc.stop();
    },timp);

}



function vibratie(t){

    if(navigator.vibrate){
        navigator.vibrate(t);
    }

}







// JOC

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







// SCOR

let scor=0;

let record=
Number(localStorage.getItem("recordShaorma")) || 0;


recordText.innerHTML="Record: "+record;








// DRONA PREMIUM


let xObstacol=window.innerWidth;

let yObstacol=250;

let vitezaObstacol=5;


let dronaVie=true;

let explozieActiva=false;






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
},

{
nume:"sos_iute.png",
puncte:30,
boost:true
}

];



let ingredientActual;


let xIngredient=0;

let yIngredient=300;

let vitezaIngredient=6;
// PARTICULE PREMIUM


function particula(x,y,culoare,marime=12){


let p=document.createElement("div");


p.style.position="absolute";

p.style.left=x+"px";

p.style.top=y+"px";


p.style.width=marime+"px";

p.style.height=marime+"px";


p.style.borderRadius="50%";


p.style.background=culoare;


p.style.boxShadow=
"0 0 20px "+culoare;



p.style.zIndex="500";


document.body.appendChild(p);



let dx=Math.random()*500-250;

let dy=Math.random()*500-250;



p.animate(

[

{
transform:"translate(0,0) scale(1)",
opacity:1
},

{
transform:
`translate(${dx}px,${dy}px) scale(0)`,
opacity:0
}

],

{

duration:1200,

easing:"ease-out"

}

);



setTimeout(()=>{

p.remove();

},1200);


}







// EXPLOZIE DRONA PREMIUM


function explodeazaDrona(){


if(explozieActiva)return;


explozieActiva=true;

dronaVie=false;



let d=
obstacol.getBoundingClientRect();



let centruX=d.left+d.width/2;

let centruY=d.top+d.height/2;




// SUNET + VIBRATIE


sunet(60,900,0.5);


setTimeout(()=>{

sunet(150,400,0.3);

},200);



vibratie([400,200,600]);







// FLASH ECRAN


let flash=document.createElement("div");


flash.style.position="fixed";

flash.style.left="0";

flash.style.top="0";

flash.style.width="100%";

flash.style.height="100%";


flash.style.background="white";


flash.style.opacity="0.8";


flash.style.zIndex="999";



document.body.appendChild(flash);



flash.animate(

[
{
opacity:0.8
},

{
opacity:0
}

],

{
duration:350
}

);



setTimeout(()=>{

flash.remove();

},400);









// BOMBA CENTRALA


let bomba=document.createElement("div");


bomba.style.position="absolute";


bomba.style.left=
centruX-50+"px";


bomba.style.top=
centruY-50+"px";


bomba.style.width="100px";

bomba.style.height="100px";


bomba.style.borderRadius="50%";



bomba.style.background=
"radial-gradient(circle,white,yellow,orange,red,black)";



bomba.style.boxShadow=
"0 0 80px red";



bomba.style.zIndex="600";



document.body.appendChild(bomba);



bomba.animate(

[

{
transform:"scale(0)"
},

{
transform:"scale(4)",
opacity:0
}

],

{

duration:800

}

);



setTimeout(()=>{

bomba.remove();

},900);










// FOC


for(let i=0;i<70;i++){


let culoare;


let random=Math.random();



if(random>0.65){

culoare="black";

}

else if(random>0.3){

culoare="orange";

}

else{

culoare="yellow";

}



particula(

centruX,

centruY,

culoare,

Math.random()*20+8

);


}







// BUCATI DRONA


for(let i=0;i<12;i++){


let bucata=document.createElement("div");


bucata.style.position="absolute";


bucata.style.left=centruX+"px";

bucata.style.top=centruY+"px";


bucata.style.width="20px";

bucata.style.height="10px";


bucata.style.background="#333";


bucata.style.zIndex="550";


document.body.appendChild(bucata);



let dx=Math.random()*400-200;

let dy=Math.random()*400-200;



bucata.animate(

[

{
transform:"rotate(0deg)"
},

{
transform:
`translate(${dx}px,${dy}px) rotate(720deg)`,
opacity:0
}

],

{

duration:1200

}

);



setTimeout(()=>{

bucata.remove();

},1300);


}









// ASCUNDE DRONA


obstacol.style.display="none";





// REAPARE DUPA EXPLOZIE


setTimeout(()=>{


respawnDrona();


},3000);



}








function respawnDrona(){


xObstacol=window.innerWidth;


yObstacol=
Math.random()*(window.innerHeight-150);


obstacol.style.left=xObstacol+"px";

obstacol.style.top=yObstacol+"px";


obstacol.style.display="block";


dronaVie=true;


explozieActiva=false;


}// COLIZIUNE INGREDIENT


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




sunet(700,150,0.15);

vibratie(50);



particula(
s.left+60,
s.top+40,
"yellow",
15
);






if(ingredientActual.boost){


boostActiv=true;


shaorma.classList.add("boost");


boostBar.style.display="block";


boostProgress.style.width="100%";



let inceput=Date.now();



let timer=setInterval(()=>{


let ramas=
100-
((Date.now()-inceput)/timpBoost*100);



boostProgress.style.width=
ramas+"%";



if(ramas<=0){

clearInterval(timer);

}



},100);







setTimeout(()=>{


boostActiv=false;


shaorma.classList.remove("boost");


boostBar.style.display="none";


},timpBoost);



}




creeazaIngredient();


}


}







// CREARE INGREDIENT


function creeazaIngredient(){


ingredientActual=
ingrediente[
Math.floor(Math.random()*ingrediente.length)
];



ingredient.src=
"images/"+ingredientActual.nume;



ingredient.style.display="block";



xIngredient=window.innerWidth;


yIngredient=
Math.random()*(window.innerHeight-100);



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









// COLIZIUNE DRONA


function verificaColiziune(){


if(!dronaVie)return;



let s=shaorma.getBoundingClientRect();


let d=obstacol.getBoundingClientRect();



if(

s.left<d.right &&
s.right>d.left &&
s.top<d.bottom &&
s.bottom>d.top

){


explodeazaDrona();


gameOver();


}


}








function gameOver(){


terminat=true;

pornit=false;


start.style.display="block";


start.innerHTML=
"GAME OVER<br><br>RESTART";


}








function restart(){


terminat=false;

pornit=true;


scor=0;


scorText.innerHTML="Scor: 0";


y=window.innerHeight/2;

viteza=0;


start.style.display="none";


xObstacol=window.innerWidth;


obstacol.style.display="block";


dronaVie=true;


explozieActiva=false;


creeazaIngredient();


}








function incepe(){


if(!pornit){


pornit=true;


start.style.display="none";


creeazaIngredient();


}


}








// CONTROALE


document.addEventListener("keydown",e=>{


if(e.code=="Space"){


if(terminat){

restart();

}


incepe();


apasat=true;


}


});





document.addEventListener("keyup",e=>{


if(e.code=="Space"){


apasat=false;


}


});







document.addEventListener("touchstart",()=>{


incepe();

apasat=true;


});






document.addEventListener("touchend",()=>{


apasat=false;


});








start.addEventListener("click",()=>{


if(terminat){

restart();

}

else{

incepe();

}


});









// LOOP JOC


function joc(){



if(pornit){



if(apasat){


viteza=
boostActiv ?
fortaBoost :
fortaZbor;


}



viteza+=gravitatie;


y+=viteza;



shaorma.style.top=y+"px";







if(dronaVie){


xObstacol-=
boostActiv ? 10 : 5;



if(xObstacol<-150){


xObstacol=window.innerWidth;


yObstacol=
Math.random()*(window.innerHeight-150);


}



obstacol.style.left=xObstacol+"px";

obstacol.style.top=yObstacol+"px";


}







miscaIngredient();


verificaIngredient();


verificaColiziune();



}



requestAnimationFrame(joc);


}



joc();
