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
Number(localStorage.getItem("recordShaorma")) || 0;


recordText.innerHTML="Record: "+record;







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








function efectParticule(x,y,c="orange",nr=25){


for(let i=0;i<nr;i++){


let p=document.createElement("div");


p.className="particula";


p.style.left=x+"px";

p.style.top=y+"px";


p.style.background=c;


document.body.appendChild(p);



let dx=Math.random()*350-175;

let dy=Math.random()*350-175;



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

duration:1000

}

);



setTimeout(()=>{

p.remove();

},1000);


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



sunet(700,150,0.1);

vibratie(50);



efectParticule(
s.left+60,
s.top+40,
"yellow",
20
);





if(ingredientActual.boost){


boostActiv=true;


shaorma.classList.add("boost");


boostBar.style.display="block";


boostProgress.style.width="100%";



let startBoost=Date.now();



let interval=setInterval(()=>{


let ramas=
100-
((Date.now()-startBoost)/timpBoost*100);



boostProgress.style.width=ramas+"%";



if(ramas<=0){

clearInterval(interval);

}


},100);





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








// 💣 EXPLOZIE DRONA


function explozieDrona(){


let d=obstacol.getBoundingClientRect();




sunet(80,900,0.4);


vibratie([300,150,500]);





// FLASH


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
duration:400
}

);



setTimeout(()=>{

flash.remove();

},400);








// BOMBA MARE


let bomba=document.createElement("div");


bomba.style.position="absolute";

bomba.style.left=d.left+20+"px";

bomba.style.top=d.top+"px";

bomba.style.width="80px";

bomba.style.height="80px";

bomba.style.borderRadius="50%";


bomba.style.background=
"radial-gradient(circle,yellow,orange,red)";


bomba.style.boxShadow=
"0 0 50px red";


bomba.style.zIndex="500";



document.body.appendChild(bomba);



bomba.animate(

[
{
transform:"scale(0)"
},

{
transform:"scale(3)",
opacity:0
}

],

{
duration:700
}

);



setTimeout(()=>{

bomba.remove();

},700);








// FOC + FUM


efectParticule(
d.left+60,
d.top+40,
"orange",
60
);


efectParticule(
d.left+60,
d.top+40,
"black",
30
);






// ROTIRE DRONA


obstacol.animate(

[

{
transform:"rotate(0deg) scale(1)"
},

{
transform:"rotate(1080deg) scale(0)",
opacity:0
}

],

{

duration:900,

easing:"ease-out"

}

);



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


obstacol.style.transform="scale(1)";

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


incepe();


apasat=true;


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


viteza=
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


yObstacol=
Math.random()*(window.innerHeight-150);


obstacol.style.transform="scale(1)";


}




obstacol.style.left=xObstacol+"px";

obstacol.style.top=yObstacol+"px";






boostBar.style.left=
shaorma.offsetLeft+"px";


boostBar.style.top=
(y+100)+"px";






miscaIngredient();


verificaIngredient();


verificaColiziune();



}



requestAnimationFrame(joc);


}



joc();
