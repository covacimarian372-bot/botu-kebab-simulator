let shaorma = document.getElementById("shaorma");


let pozitie = 300;


document.addEventListener("keydown", function(e){


if(e.code === "Space"){

pozitie -= 50;

shaorma.style.top = pozitie + "px";

}


});
