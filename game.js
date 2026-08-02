let shaorma = document.getElementById("shaorma");
let obstacol = document.getElementById("obstacol");
let ingredient = document.getElementById("ingredient");
let start = document.getElementById("start");
let scorText = document.getElementById("scor");


let containerParticule = document.getElementById("particule");


if(!containerParticule){

    containerParticule = document.createElement("div");

    containerParticule.id = "particule";

    document.body.appendChild(containerParticule);

}



let pornit = false;
let terminat = false;
let apasat = false;



// SHAORMA

let y = window.innerHeight / 2;

let viteza = 0;

let gravitatie = 0.45;

let fortaZbor = -7;





// SCOR

let scor = 0;





// DRONA

let xObstacol = window.innerWidth + 200;

let yObstacol = 250;

let vitezaObstacol = 5;







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

let vitezaIngredient = 6;






// SOS IUTE

let ultimaAparitieSos = 0;

let timpSos = 60000;









function creeazaIngredient(){


let acum = Date.now();



if(acum - ultimaAparitieSos > timpSos && Math.random()<0.3){


ingredientActual = {

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



ingredient.src = "images/" + ingredientActual.nume;


ingredient.style.display="block";


xIngredient = window.innerWidth + 100;


yIngredient = Math.random() * (window.innerHeight - 120);



ingredient.style.left = xIngredient+"px";

ingredient.style.top = yIngredient+"px";


}








function creeazaParticule(){


let pozitie = shaorma.getBoundingClientRect();



for(let i=0;i<10;i++){


let p = document.createElement("div");


p.className="particula";


p.style.left = pozitie.left + 80 + "px";

p.style.top = pozitie.top + 50 + "px";



p.style.setProperty("--x",
(Math.random()*120-60)+"px"
);



p.style.setProperty("--y",
(Math.random()*120-60)+"px"
);



containerParticule.appendChild(p);



setTimeout(function(){

p.remove();

},600);



}



}








function verificaIngredient(){


let s = shaorma.getBoundingClientRect();

let ing = ingredient.getBoundingClientRect();



if(

s.left < ing.right &&

s.right > ing.left &&

s.top < ing.bottom &&

s.bottom > ing.top

){



scor += ingredientActual.puncte;


if(scorText){

scorText.innerHTML="Scor: "+scor;

}



creeazaParticule();



shaorma.classList.add("ia-ingredient");



setTimeout(function(){

shaorma.classList.remove("ia-ingredient");

},200);





if(ingredientActual.nume=="sos_iute.png"){


shaorma.classList.add("boost");



setTimeout(function(){

shaorma.classList.remove("boost");

},5000);


}





creeazaIngredient();


}


}








function miscaIngredient(){


xIngredient -= vitezaIngredient;


ingredient.style.left=xIngredient+"px";



if(xIngredient < -100){


creeazaIngredient();


}


}









function incepe(){


if(!pornit){


pornit=true;

terminat=false;


start.style.display="none";


creeazaIngredient();


}


}








document.addEventListener("keydown",function(e){


if(e.code=="Space"){


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









function verificaColiziune(){


let s = shaorma.getBoundingClientRect();

let d = obstacol.getBoundingClientRect();



if(

s.left < d.right &&

s.right > d.left &&

s.top < d.bottom &&

s.bottom > d.top

){


terminat=true;

pornit=false;


start.style.display="block";

start.innerHTML="GAME OVER";


}



}








function joc(){



if(pornit){



if(apasat){

viteza=fortaZbor;

}



viteza+=gravitatie;


y+=viteza;


shaorma.style.top=y+"px";





xObstacol-=vitezaObstacol;



if(xObstacol<-150){


xObstacol=window.innerWidth+200;


yObstacol=Math.random()*(window.innerHeight-200);


}



obstacol.style.left=xObstacol+"px";

obstacol.style.top=yObstacol+"px";





miscaIngredient();

verificaIngredient();

verificaColiziune();



}



requestAnimationFrame(joc);


}






start.addEventListener("click",incepe);



joc();
