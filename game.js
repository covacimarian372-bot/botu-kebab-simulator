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

audioCtx = new AudioContext();

}


let osc = audioCtx.createOscillator();

let gain = audioCtx.createGain();


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

let timpBoost=12000;

let fortaBoost=-10;







// SCOR


let scor=0;


let record=
Number(localStorage.getItem("recordShaorma")) || 0;


recordText.innerHTML="Record: "+record;








// DRONA


let xObstacol=window.innerWidth;

let yObstacol=250;


let vitezaDrona=5;


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









function creeazaIngredient(){


ingredientActual =
ingrediente[
Math.floor(Math.random()*ingrediente.length)
];



ingredient.src =
"images/"+ingredientActual.nume;



ingredient.style.display="block";



xIngredient=window.innerWidth;


yIngredient =
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
// ==========================
// EFECTE OPTIMIZATE
// ==========================


function particula(x,y,culoare,size=10){


let p=document.createElement("div");


p.className="particula";


p.style.left=x+"px";

p.style.top=y+"px";


p.style.width=size+"px";

p.style.height=size+"px";


p.style.background=culoare;


document.body.appendChild(p);



let dx=Math.random()*300-150;

let dy=Math.random()*300-150;



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

duration:700

}

);



setTimeout(()=>{

p.remove();

},700);


}







function cameraShake(){


document.body.animate(

[

{
transform:"translate(0)"
},

{
transform:"translate(8px,4px)"
},

{
transform:"translate(-8px,-4px)"
},

{
transform:"translate(0)"
}

],

{

duration:250

}

);


}








function exploziePremium(x,y){



cameraShake();



let flash=document.createElement("div");


flash.style.position="fixed";

flash.style.left="0";

flash.style.top="0";

flash.style.width="100%";

flash.style.height="100%";


flash.style.background="white";


flash.style.opacity="0.7";


flash.style.zIndex="999";



document.body.appendChild(flash);



flash.animate(

[
{
opacity:.7
},

{
opacity:0
}

],

{
duration:250
}

);



setTimeout(()=>{

flash.remove();

},300);






// unda soc


let unda=document.createElement("div");


unda.style.position="absolute";

unda.style.left=x-20+"px";

unda.style.top=y-20+"px";


unda.style.width="40px";

unda.style.height="40px";


unda.style.border="4px solid orange";


unda.style.borderRadius="50%";


unda.style.zIndex="600";



document.body.appendChild(unda);



unda.animate(

[

{
transform:"scale(1)",
opacity:1
},

{
transform:"scale(6)",
opacity:0
}

],

{

duration:500

}

);



setTimeout(()=>{

unda.remove();

},600);







// particule putine pentru performanta


for(let i=0;i<35;i++){


let r=Math.random();


let culoare;


if(r>0.65){

culoare="black";

}

else if(r>0.3){

culoare="orange";

}

else{

culoare="yellow";

}



particula(
x,
y,
culoare,
Math.random()*12+6
);


}




sunet(80,700,0.4);

vibratie([300,150,400]);


}









function explodeazaDrona(){


if(!dronaVie || explozieActiva){

return;

}



explozieActiva=true;


dronaVie=false;



let d=obstacol.getBoundingClientRect();



let x=d.left+d.width/2;

let y=d.top+d.height/2;




exploziePremium(x,y);





obstacol.style.display="none";





setTimeout(()=>{


xObstacol=window.innerWidth;


yObstacol=
Math.random()*(window.innerHeight-150);



obstacol.style.left=xObstacol+"px";


obstacol.style.top=yObstacol+"px";


obstacol.style.display="block";



dronaVie=true;


explozieActiva=false;



},2500);



}









// COLIZIUNE STABILA


function verificaColiziune(){


if(!dronaVie)return;



let s=shaorma.getBoundingClientRect();

let d=obstacol.getBoundingClientRect();



// hitbox mai mic


let sx=s.left+35;

let sy=s.top+25;


let sw=s.width-70;

let sh=s.height-50;



let dx=d.left+25;

let dy=d.top+25;


let dw=d.width-50;

let dh=d.height-50;





if(

sx < dx+dw &&

sx+sw > dx &&

sy < dy+dh &&

sy+sh > dy

){


explodeazaDrona();


gameOver();


}


}
// ==========================
// INGREDIENTE + BOOST
// ==========================


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

localStorage.setItem(
"recordShaorma",
record
);

}


recordText.innerHTML="Record: "+record;




sunet(700,120,0.15);

vibratie(40);



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









// GAME OVER


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


xObstacol=window.innerWidth;


dronaVie=true;


explozieActiva=false;


obstacol.style.display="block";


start.style.display="none";


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









start.onclick=()=>{


if(terminat){

restart();

}

else{

incepe();

}


};









// JOC


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






// miscare drona


if(dronaVie){


xObstacol-=

boostActiv ? 10 : vitezaDrona;



if(xObstacol<-150){


xObstacol=window.innerWidth;


yObstacol=
Math.random()*(window.innerHeight-150);


}



obstacol.style.left=xObstacol+"px";


obstacol.style.top=yObstacol+"px";



}






// urma boost optimizata


if(boostActiv){


let foc=document.createElement("div");


foc.className="particula";


foc.style.left=
shaorma.offsetLeft+"px";


foc.style.top=
y+60+"px";


foc.style.width="12px";


foc.style.height="12px";


foc.style.background="red";



document.body.appendChild(foc);



setTimeout(()=>{

foc.remove();

},250);


}







miscaIngredient();


verificaIngredient();


verificaColiziune();



}



requestAnimationFrame(joc);


}



joc();
