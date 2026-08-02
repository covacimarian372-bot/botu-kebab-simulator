let shaorma = document.getElementById("shaorma");


let y = 300;

let viteza = 0;

let gravitatie = 0.25;

let fortaZbor = -5;


let apasat = false;



// PC - SPACE

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




// Telefon - atingere ecran

document.addEventListener("touchstart", function(){

    apasat = true;

});



document.addEventListener("touchend", function(){

    apasat = false;

});





function joc(){


    // când ții apăsat, shaorma zboară

    if(apasat){

        viteza = fortaZbor;

    }



    // gravitație

    viteza += gravitatie;



    // poziția shaormei

    y += viteza;



    // limite sus

    if(y < 0){

        y = 0;

        viteza = 0;

    }



    // limite jos

    if(y > window.innerHeight - 200){

        y = window.innerHeight - 200;

        viteza = 0;

    }



    shaorma.style.top = y + "px";



    requestAnimationFrame(joc);


}



joc();
