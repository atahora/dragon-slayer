'use strict';   // Mode strict du JavaScript


/*FONCTIONS*/
function toggleHide(event){
	this.nextElementSibling.classList.toggle("hide");
}

//selection des navButton
let navButtonHTML = document.querySelectorAll(".navButton");


//ajout du click sur chaque bouttons
for (var i = 0; i < navButtonHTML.length; i++) {
	navButtonHTML[i].addEventListener("click", toggleHide );
}