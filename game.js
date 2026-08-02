let ingrediente = [];

let bani = 0;


const lipie = document.getElementById("lipie");
const money = document.getElementById("money");



function adauga(ingredient){

    ingrediente.push(ingredient);


    deseneazaShaorma();

}



function deseneazaShaorma(){

    lipie.innerHTML = "🫓<br>";


    ingrediente.forEach(item => {


        if(item === "carne"){

            lipie.innerHTML += "🍗";

        }


        if(item === "salata"){

            lipie.innerHTML += "🥬";

        }


        if(item === "rosii"){

            lipie.innerHTML += "🍅";

        }


        if(item === "ceapa"){

            lipie.innerHTML += "🧅";

        }


        if(item === "sos"){

            lipie.innerHTML += "🥫";

        }


    });


}



function gata(){


    if(ingrediente.length < 3){

        alert("Mai pune ingrediente!");

        return;

    }



    bani += 10;


    money.innerHTML = "💰 " + bani + " lei";



    alert(
        "🌯 Shaorma gata! Ai primit 10 lei!"
    );



    ingrediente = [];


    lipie.innerHTML = "🫓";


}
