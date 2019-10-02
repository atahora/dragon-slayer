'use strict';   // Mode strict du JavaScript


//SOUMISSION DU FORMULAIRE
$("#form").submit( onSubmit );

//Objet des caractéristiques de l'épee
let epee = { //indice de multiplicateur de dégats
	bois: {matiere: "en bois", indice: .5},
	acier: {matiere: "en acier", indice: 1},
	excalibur: {matiere: "excalibur", indice: 2}
};

//Objet des caractéristiques de l'armure
let armure = { //indice de multiplicateur de dégats
	cuivre: {matiere: "en cuivre", indice: 1},
	fer: {matiere: "en fer", indice: .25},
	magique: {matiere: "magique", indice: .5}
};

//Tableau contenant les url des images du chifoumi
let chifoumiArray = [
	"images/stone.png",
	"images/leaf.png",
	"images/scissors.png"
];

//Déclaration des variables globales
let hero;
let monstre;
let tour = 1;
let pvDepartHero;
let pvDepartMonstre;
let contentZoneHTML = document.getElementById("container");

//Bouton qui déclenche un combat
$('#combatButtonContinue').click(combat);


//Mise en place des classes
class Personnage {

	constructor (nomParam, pvParam, attParam){
		this.nom = nomParam;
		this.pv = pvParam;
		this.att = attParam;
	}

	attaque (enemy) {
		let degats = nombreAleatoire(this.att[0],this.att[1]);
		let degatsModif = parseInt(degats * enemy.armure.indice);
		enemy.pv -= degatsModif;
		return "<h3><span class='red'>" + this.nom + "</span> attaque <span class='green'>" + enemy.nom + "</span> et lui inflige <span class='blue'>" + degatsModif + "</span> points de dégats.</h3>";	
	}
}

class Chevalier extends Personnage {
	constructor (nomParam, pvParam, attParam, epeeParam, armureParam){
		super(nomParam, pvParam ,attParam);
		this.epee = epeeParam;
		this.armure = armureParam;
	}

	attaque (enemy) {
		let degats = nombreAleatoire(this.att[0],this.att[1]);
		let degatsModif = parseInt(degats * this.epee.indice);
		enemy.pv -= degatsModif;
		return "<h3><span class='green'>" + this.nom + "</span> attaque <span class='red'>" + enemy.nom + "</span> et lui inflige <span class='blue'>" + degatsModif + "</span> points de dégats.</h3>";
	}
}










