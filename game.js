const shaorma = document.getElementById("shaorma");


function adauga(nume){


let img=document.createElement("img");


img.src="images/"+nume+".png";


img.className="ingredient";


shaorma.appendChild(img);


}



function gataComanda(){


let tranzitie=document.createElement("div");


tranzitie.id="tranzitie";


tranzitie.innerHTML="🌯";


document.body.appendChild(tranzitie);



setTimeout(()=>{


tranzitie.innerHTML="";



let rezultat=document.createElement("img");


rezultat.src="images/rezultat.png";


rezultat.id="rezultat";


tranzitie.appendChild(rezultat);



},2000);



}
