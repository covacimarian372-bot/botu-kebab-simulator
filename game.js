let shaorma = document.getElementById("shaorma");

let start = document.getElementById("start");

let fundal = document.getElementById("fundal");



let y = window.innerHeight / 2;

let viteza = 0;


let gravitatie = 0.45;

let fortaZbor = -7;



let apasat = false;

let pornit = false;



let pozitieFundal = 0;

let vitezaFundal = 2;



shaorma.style.left = "200px";

shaorma.style.top = y + "px";






function incepe(){


    if(!pornit){

        pornit = true;

        start.style.display = "none";

    }


}






// PC

document.addEventListener("keydown", function(e){


    if(e.code === "Space"){


        incepe();

        apasat = true;


    }


});





document.addEventListener("keyup", function(e){


    if(e.code === "Space"){


        apasat = false;


    }


});







// MOBIL

document.addEventListener("touchstart", function(){


    incepe();

    apasat = true;


});





document.addEventListener("touchend", function(){


    apasat = false;


});









function joc(){



if(pornit){



// FUNDAL INFINIT


pozitieFundal -= vitezaFundal;



if(pozitieFundal <= -window.innerWidth){


    pozitieFundal = 0;


}



fundal.style.left = pozitieFundal + "px";






// ZBOR SHAORMA


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
