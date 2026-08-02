const shaorma = document.getElementById("shaorma");

let ingrediente = [];


function adauga(nume){

    let imagine = document.createElement("img");

    imagine.className = "strat";


    if(nume === "carne"){
        imagine.src = "images/carne.png";
    }

    if(nume === "cartofi"){
        imagine.src = "images/cartofi.png";
    }

    if(nume === "salata"){
        imagine.src = "images/salata.png";
    }

    if(nume === "rosii"){
        imagine.src = "images/rosii.png";
    }

    if(nume === "ceapa"){
        imagine.src = "images/ceapa.png";
    }

    if(nume === "sos_usturoi"){
        imagine.src = "images/sos_usturoi.png";
    }

    if(nume === "sos_ketchup"){
        imagine.src = "images/sos_ketchup.png";
    }


    shaorma.appendChild(imagine);

    ingrediente.push(nume);

}



function gata(){

    if(ingrediente.length < 2){

        alert("Pune mai multe ingrediente!");

        return;

    }


    alert("🌯 Shaorma este gata!");

}
