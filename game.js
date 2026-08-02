let shaorma = document.getElementById("shaorma");


let y = 300;

let viteza = 0;


let gravitatie = 0.5;

let fortaZbor = -8;


let apasat = false;



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




// control mobil

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


    shaorma.style.top = y + "px";



    requestAnimationFrame(joc);

}



joc();
