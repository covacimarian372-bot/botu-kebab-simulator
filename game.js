let shaorma = document.getElementById("shaorma");

let start = document.getElementById("start");



let fundal1 = document.getElementById("fundal1");

let fundal2 = document.getElementById("fundal2");



let x1 = 0;

let x2 = window.innerWidth;



let vitezaFundal = 2;




let y = window.innerHeight / 2;

let viteza = 0;



let gravitatie = 0.45;

let fortaZbor = -7;



let apasat = false;

let pornit = false;




shaorma.style.left = "200px";

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







// Telefon

document.addEventListener("touchstart",function(){


    incepe();

    apasat=true;


});




document.addEventListener("touchend",function(){


    apasat=false;


});









function joc(){



if(pornit){



// MISCARE FUNDAL


x1 -= vitezaFundal;

x2 -= vitezaFundal;




if(x1 <= -window.innerWidth){

    x1 = window.innerWidth;

}



if(x2 <= -window.innerWidth){

    x2 = window.innerWidth;

}




fundal1.style.left = x1 + "px";

fundal2.style.left = x2 + "px";





// ZBOR


if(apasat){

    viteza = fortaZbor;

}



viteza += gravitatie;


y += viteza;



if(y < 0){

    y = 0;

    viteza = 0;

}



if(y > window.innerHeight - 150){

    y = window.innerHeight - 150;

    viteza = 0;

}



shaorma.style.top = y + "px";



}





requestAnimationFrame(joc);



}



joc();
