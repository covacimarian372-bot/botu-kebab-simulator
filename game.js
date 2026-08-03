let shaorma=document.getElementById("shaorma");
let obstacol=document.getElementById("obstacol");
let ingredient=document.getElementById("ingredient");

let start=document.getElementById("start");

let scorText=document.getElementById("scor");
let recordText=document.getElementById("record");

let boostBar=document.getElementById("boostBar");
let boostProgress=document.getElementById("boostProgress");




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








// SCOR


let scor=0;


let record=
Number(localStorage.getItem("recordShaorma"))||0;


recordText.innerHTML="Record: "+record;








// DRONA


let xObstacol=window.innerWidth;

let yObstacol=250;


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


}// ============================
// EFECTE PREMIUM
// ============================


function particula(x,y,c){

let p=document.createElement("div");

p.className="particula";

p.style.left=x+"px";
p.style.top=y+"px";

p.style.width=Math.random()*15+8+"px";
p.style.height=p.style.width;

p.style.background=c;

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
transform:`translate(${dx}px,${dy}px) scale(0)`,
opacity:0
}

],

{
duration:1200
}

);



setTimeout(()=>{

p.remove();

},1200);


}







function shake(){

document.body.animate(

[
{
transform:"translate(0,0)"
},

{
transform:"translate(15px,0)"
},

{
transform:"translate(-15px,0)"
},

{
transform:"translate(0,0)"
}

],

{
duration:400
}

);


}







function exploziePremium(x,y){


shake();


let flash=document.createElement("div");


flash.style.position="fixed";

flash.style.left="0";

flash.style.top="0";

flash.style.width="100%";

flash.style.height="100%";

flash.style.background="white";

flash.style.zIndex="999";

flash.style.opacity="0.8";


document.body.appendChild(flash);



flash.animate(

[
{
opacity:.8
},
{
opacity:0
}

],

{
duration:400
}

);



setTimeout(()=>{

flash.remove();

},400);







// unda soc


let unda=document.createElement("div");


unda.style.position="absolute";

unda.style.left=x-30+"px";

unda.style.top=y-30+"px";

unda.style.width="60px";

unda.style.height="60px";

unda.style.border="6px solid orange";

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
transform:"scale(8)",
opacity:0
}

],

{
duration:700
}

);


setTimeout(()=>{

unda.remove();

},800);







for(let i=0;i<80;i++){


let culoare;


let r=Math.random();


if(r>0.7){

culoare="black";

}

else if(r>0.3){

culoare="orange";

}

else{

culoare="yellow";

}



particula(x,y,culoare);


}





sunet(70,900,0.5);

vibratie([400,200,600]);


}









function explodeazaDrona(){


if(explozieActiva)return;


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


},3000);



}









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



if(ingredientActual.boost){


boostActiv=true;


shaorma.classList.add("boost");


boostBar.style.display="block";


boostProgress.style.width="100%";



setTimeout(()=>{


boostActiv=false;


shaorma.classList.remove("boost");


boostBar.style.display="none";


},timpBoost);



}



creeazaIngredient();



}


}







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


creeazaIngredient();


}







function incepe(){


if(!pornit){

pornit=true;

start.style.display="none";

creeazaIngredient();

}


}







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









function joc(){


if(pornit){


if(apasat){

viteza=
boostActiv?
fortaBoost:
fortaZbor;

}


viteza+=gravitatie;


y+=viteza;


shaorma.style.top=y+"px";




if(dronaVie){


xObstacol-=boostActiv?10:5;



if(xObstacol<-150){

xObstacol=window.innerWidth;


yObstacol=
Math.random()*(window.innerHeight-150);

}


obstacol.style.left=xObstacol+"px";

obstacol.style.top=yObstacol+"px";


}






if(boostActiv){

let f=document.createElement("div");

f.className="particula";

f.style.left=
shaorma.offsetLeft+"px";

f.style.top=
y+60+"px";

f.style.background="red";


document.body.appendChild(f);


setTimeout(()=>{

f.remove();

},300);

}




miscaIngredient();

verificaIngredient();

verificaColiziune();


}


requestAnimationFrame(joc);


}


joc();
