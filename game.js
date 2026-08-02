let shaorma = document.getElementById("shaorma");


let y = 300;

let viteza = 0;


let gravitatie = 0.45;

let fortaZbor = -7;


let apasat = false;



// pozitia fixa pe orizontala

shaorma.style.left = "200px";



// PC

document.addEventListener("keydown", function(e){

    if(e.code === "Space"){

        apasat = true;

    }

});


document.addEventListener("keyup", function(e){

    if(e.code === "Space"){

        apasat = false;

    }

});



// Mobil

document.addEventListener("touchstart", function(){

    apasat = true;

});


document.addEventListener("touchend", function(){

    apasat = false;

});





function joc(){


    if(apasat){

        viteza = fortaZbor;

    }



    viteza += gravitatie;


    y += viteza;



    // limita sus

    if(y < 0){

        y = 0;

        viteza = 0;

    }



    // limita jos

    if(y > window.innerHeight - 200){

        y = window.innerHeight - 200;

        viteza = 0;

    }



    // aplicam doar miscarea verticala

    shaorma.style.top = y + "px";



    requestAnimationFrame(joc);


}


joc();
