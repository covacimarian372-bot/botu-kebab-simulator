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







// DRONA

let xObstacol=window.innerWidth;

let yObstacol=250;







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







function particuleExplozie(x,y,c="orange"){


for(let i=0;i<25;i++){


let p=document.createElement("div");


p.className="particula";


p.style.left=x+"px";

p.style.top=y+"px";


p.style.background=c;


document.body.appendChild(p);



let dx=Math.random()*300-150;

let dy=Math.random()*300-150;



p.animate(

[
{
transform:"translate(0,0)",
opacity:1
},

{
transform:`translate(${dx}px,${dy}px)`,
opacity:0
}

],

{
duration:800
}

);



setTimeout(()=>{

p.remove();

},800);


}


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

localStorage.setItem(
"recordShaorma",
record
);

}


recordText.innerHTML="Record: "+record;



sunet(700,120,0.1);

vibratie(40);



particuleExplozie(
s.left+50,
s.top+40
);





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



shaorma.classList.add("ia-ingredient");


setTimeout(()=>{

shaorma.classList.remove("ia-ingredient");

},200);



creeazaIngredient();


}


}








function explozieDrona(){


let d=obstacol.getBoundingClientRect();


sunet(100,600,0.3);


vibratie([200,100,300]);



particuleExplozie(
d.left+50,
d.top+40,
"red"
);



obstacol.style.display="none";



setTimeout(()=>{

obstacol.style.display="block";

xObstacol=window.innerWidth;

yObstacol=Math.random()*(window.innerHeight-150);


},700);



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


viteza =
boostActiv ?
fortaBoost :
fortaZbor;


}



viteza+=gravitatie;


y+=viteza;


shaorma.style.top=y+"px";







xObstacol-=

boostActiv ? 10 : 5;




if(xObstacol<-150){


xObstacol=window.innerWidth;


yObstacol=Math.random()*(window.innerHeight-150);


}





obstacol.style.left=xObstacol+"px";


obstacol.style.top=yObstacol+"px";





boostBar.style.left=
shaorma.offsetLeft+"px";


boostBar.style.top=
y+100+"px";





miscaIngredient();


verificaIngredient();


verificaColiziune();



}



requestAnimationFrame(joc);


}



joc();
