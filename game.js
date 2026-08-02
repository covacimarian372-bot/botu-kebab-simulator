const shaorma = document.getElementById("shaorma");

let ingrediente = [];


function adauga(nume) {

    let imagine = document.createElement("img");

    imagine.className = "ingredient";

    imagine.src = "images/" + nume + ".png";


    shaorma.appendChild(imagine);


    ingrediente.push(nume);

}



function gata() {

    if (ingrediente.length === 0) {

        alert("Alege ingrediente pentru shaorma!");

        return;

    }


    alert("🌯 Shaorma este gata!");

}
