// ===============================
// EFFECTS PREMIUM - SHAORMA GAME
// ===============================



// CAMERA SHAKE

function cameraShake(power=10,time=400){

let body=document.body;

let start=Date.now();


let interval=setInterval(()=>{


let x=(Math.random()*power*2)-power;

let y=(Math.random()*power*2)-power;


body.style.transform=
`translate(${x}px,${y}px)`;


if(Date.now()-start>time){

clearInterval(interval);

body.style.transform="translate(0,0)";

}


},30);

}








// FLASH ECRAN

function flashEcran(culoare="white"){


let f=document.createElement("div");


f.style.position="fixed";

f.style.left="0";

f.style.top="0";

f.style.width="100%";

f.style.height="100%";


f.style.background=culoare;


f.style.opacity="0.8";


f.style.zIndex="9999";


document.body.appendChild(f);



f.animate(

[

{opacity:0.8},

{opacity:0}

],

{

duration:400

}

);



setTimeout(()=>{

f.remove();

},450);


}








// UNDA DE SOC


function undaSoc(x,y){


let u=document.createElement("div");


u.style.position="absolute";


u.style.left=x-20+"px";

u.style.top=y-20+"px";


u.style.width="40px";

u.style.height="40px";


u.style.border="5px solid orange";


u.style.borderRadius="50%";


u.style.zIndex="700";


document.body.appendChild(u);



u.animate(

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

u.remove();

},800);


}








// FUM


function fum(x,y){


for(let i=0;i<30;i++){


let f=document.createElement("div");


f.style.position="absolute";


f.style.left=x+"px";

f.style.top=y+"px";


f.style.width=
Math.random()*25+15+"px";


f.style.height=f.style.width;


f.style.background="#222";


f.style.borderRadius="50%";


f.style.opacity="0.8";


f.style.zIndex="600";


document.body.appendChild(f);



let dx=Math.random()*250-125;

let dy=Math.random()*200-100;



f.animate(

[

{
transform:"translate(0,0) scale(1)",
opacity:.8
},

{
transform:`translate(${dx}px,${dy}px) scale(2)`,
opacity:0
}

],

{

duration:2000

}

);



setTimeout(()=>{

f.remove();

},2000);



}


}








// FOC


function foc(x,y){


for(let i=0;i<40;i++){


let p=document.createElement("div");


p.style.position="absolute";


p.style.left=x+"px";

p.style.top=y+"px";


p.style.width="12px";

p.style.height="12px";


p.style.borderRadius="50%";


p.style.background=
Math.random()>0.5 ?
"orange":
"yellow";


p.style.boxShadow=
"0 0 20px red";


p.style.zIndex="650";


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

duration:900

}

);



setTimeout(()=>{

p.remove();

},1000);



}


}// ===============================
// EXPLOZIE CINEMATICĂ DRONĂ
// ===============================


function exploziePremium(x,y){


cameraShake(15,500);


flashEcran("white");


undaSoc(x,y);


fum(x,y);


foc(x,y);



// scântei

for(let i=0;i<50;i++){


let s=document.createElement("div");


s.style.position="absolute";


s.style.left=x+"px";

s.style.top=y+"px";


s.style.width="6px";

s.style.height="20px";


s.style.background="yellow";


s.style.zIndex="800";


document.body.appendChild(s);



let dx=Math.random()*500-250;

let dy=Math.random()*500-250;



s.animate(

[

{
transform:"rotate(0deg) translate(0,0)",
opacity:1
},

{
transform:
`rotate(360deg) translate(${dx}px,${dy}px)`,
opacity:0
}

],

{

duration:1000

}

);



setTimeout(()=>{

s.remove();

},1100);



}



}








// URMA DE FOC BOOST


function urmaFoc(x,y){


let foculet=document.createElement("div");


foculet.style.position="absolute";


foculet.style.left=x+"px";


foculet.style.top=y+"px";


foculet.style.width="25px";


foculet.style.height="25px";


foculet.style.borderRadius="50%";


foculet.style.background=
"radial-gradient(circle,yellow,orange,red)";


foculet.style.boxShadow=
"0 0 30px orange";


foculet.style.zIndex="300";



document.body.appendChild(foculet);



foculet.animate(

[

{
transform:"scale(1)",
opacity:1
},

{
transform:"scale(0)",
opacity:0
}

],

{

duration:500

}

);



setTimeout(()=>{

foculet.remove();

},500);



}









// EFECT INGREDIENT RAR


function ingredientAur(x,y){


let a=document.createElement("div");


a.style.position="absolute";

a.style.left=x+"px";

a.style.top=y+"px";


a.style.width="40px";

a.style.height="40px";


a.style.borderRadius="50%";


a.style.background="gold";


a.style.boxShadow=
"0 0 40px yellow";


a.style.zIndex="500";


document.body.appendChild(a);



a.animate(

[

{
transform:"scale(0)",
opacity:0
},

{
transform:"scale(2)",
opacity:1
},

{
transform:"scale(0)",
opacity:0
}

],

{

duration:800

}

);



setTimeout(()=>{

a.remove();

},900);



}









// BUCATI DRONA


function bucatiDrona(x,y){


for(let i=0;i<15;i++){


let b=document.createElement("div");


b.style.position="absolute";


b.style.left=x+"px";

b.style.top=y+"px";


b.style.width="18px";

b.style.height="12px";


b.style.background="#222";


b.style.zIndex="700";


document.body.appendChild(b);



let dx=Math.random()*400-200;

let dy=Math.random()*400-200;



b.animate(

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

b.remove();

},1300);



}


}
