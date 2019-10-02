'use strict';   // Mode strict du JavaScript

/////// Fonctions générales //////////////

//Saisie de nombre entier ou a virgule obligatoire //
function saisieNombre( message, valeurParDefaut) {
    var saisie;
    do {
        saisie = window.prompt (message, valeurParDefaut);
        
        if(saisie != null ) // Sinon nombre est transformé en NaN par parseFloat, et on reste coincé dans la boucle
            saisie = parseFloat(saisie);
    }
    while ( (isNaN(saisie)) && (saisie != null) );
    
    return saisie;
}

// Renvoie un nombre aléatoire
function nombreAleatoire(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}




////////////////DRAGON SLAYER////////////////////

function onSubmit (){

	// On empêche le formulaire de relancer la page
  	event.preventDefault();

  	//on récupère les données du formulaire
  	let nomChoisi = $('input[name="nom"]').val();
  	let difficulteChoisi = $('input[name="difficulte"]:checked').val();
  	let epeeChoisi = $('input[name="epee"]:checked').val();
  	let armureChoisi = $('input[name="armure"]:checked').val();

  	//On prépare les caractéristiques avant de créer nos personnages
  	let caracDeBase = choixNiveauDifficulte(difficulteChoisi);
  	let bonusAtt = choixArme(epeeChoisi);
  	let bonusDef = choixArmure(armureChoisi);

  	//Création des personnages
  	monstre = new Personnage("Dragon", caracDeBase[2], caracDeBase[3]);
  	hero = new Chevalier(nomChoisi, caracDeBase[0], caracDeBase[1], bonusAtt, bonusDef);

  	//2 variables globales qui vont nous permettre de mettre à jour la barre de vie
	pvDepartHero = caracDeBase[0];
	pvDepartMonstre = caracDeBase[2]; 

	mettreAJourPV(); //On set les pv et barre dans le header une première fois
  	presentationDeLaPartie();

}


function choixNiveauDifficulte (niveauDifficulte){

	//Le niveau de difficulté choisi dans le formumlaire détermine une tranche de pv et att pour les personnages

	let chevalierPv;
	let chevalierAtt;
	let monstrePv;
	let monstreAtt;

	switch (niveauDifficulte){
		case "facile" : 
			chevalierPv = nombreAleatoire(200, 250);
			chevalierAtt = [25, 30];
			monstrePv = nombreAleatoire(150, 200);
			monstreAtt = [5, 10];
			break;
		case "moyen" : 
			chevalierPv = nombreAleatoire(200, 250);
			chevalierAtt = [15, 20];
			monstrePv = nombreAleatoire(200, 250);
			monstreAtt = [15, 20];
			break;
		case "difficile" : 
			chevalierPv = nombreAleatoire(150, 200);
			chevalierAtt = [5, 10];
			monstrePv = nombreAleatoire(200, 250);
			monstreAtt = [25, 30];
			break;
		default :
			alert("non, non et non !")
			break;
	}
	
	return [chevalierPv,chevalierAtt,monstrePv,monstreAtt];
}

function choixArme (arme){

	//L'épee choisi dans le formulaire détermine un bonus d'attaque du héro

	let chevalierEpee;

	switch (arme){
		case "bois" : 
			chevalierEpee = epee.bois;
			break;
		case "acier" : 
			chevalierEpee = epee.acier;
			break;
		case "excalibur" : 
			chevalierEpee = epee.excalibur;
			break;
	}

	return chevalierEpee;
}

function choixArmure (defense){

	//L'armure choisi dans le formulaire détermine un bonus de défense du héro

	let chevalierArmure;

	switch (defense){
		case "cuivre" : 
			chevalierArmure = armure.cuivre;
			break;
		case "fer" : 
			chevalierArmure = armure.fer;
			break;
		case "magique" : 
			chevalierArmure = armure.magique;
			break;
	}

	return chevalierArmure;
}

function presentationDeLaPartie(){

	//Le HTML est mis à jour une première fois et présente les personnages et leurs carac

	contentZoneHTML.innerHTML = 
		'<section id="game-display" class="game-display">' +
			'<h2>' + hero.nom + ' VS ' + monstre.nom + '</h2>' +
		    '<h3>' + hero.nom + ' a <span class="blue">' + hero.pv + '</span> points de vie et se bat avec une épée ' + hero.epee.matiere + ' et une armure ' + hero.armure.matiere + ' !</h3>' +
		    '<h3>L\'ignoble '+ monstre.nom +' a <span class="blue">' + monstre.pv + '</span> points de vie !</h3>' +
		    '<div id="combatButton" class="button-combat button-hover">Commencer le combat !</div>' +
		'</section>';

	$('#combatButton').click(combat); //Un boutton est créer permettant de commencer le combat

}

function combat (){

	//mise a jour du html avec présentation du tour, le joueur doit choisir son chifoumi
	contentZoneHTML.innerHTML = 
		'<section id="gameDisplay" class="game-display">' +
	    	'<h2 class="green">TOUR #' + tour + '</h2>' +
	    	'<h3>Pierre, Feuille ou ciseaux ?</h3>' +
		   	'<div class="chifoumi-board">' +
		   		'<img src="images/stone.png" data-id="1">' +
		   		'<img src="images/leaf.png" data-id="2">' +
		   		'<img src="images/scissors.png" data-id="3">' +
		   	'</div>' +
		'</section>';


	//Au clic on démarre le tour et détermine qui va attaquer
	let selectedImg = $('.chifoumi-board img').click(function (){

		this.classList.add("active"); //créer un bord autour de la sélection

		let vitesse = chifoumi ( parseInt(this.dataset.id) ); //le chifoumi retourne un tableau contenant le choix du héro, le choix du dragon et la description de la méthode attaque de l'attaquant
		
		let gameDisplayHTML = document.getElementById('gameDisplay'); // on récupère la zone où va s'afficher le résultat
		
		//Affichage du résultat
		gameDisplayHTML.innerHTML += '<h3>' + hero.nom + ' a choisi <img class="chifoumi-resultat-img" src=" ' + chifoumiArray[(vitesse[0] - 1)] + ' "></h3>'
		gameDisplayHTML.innerHTML += '<h3>' + monstre.nom + ' a choisi <img class="chifoumi-resultat-img" src=" ' + chifoumiArray[(vitesse[1] - 1)] + ' "></h3>'
		gameDisplayHTML.innerHTML += vitesse[2];

		tour++; //itération du tour
		mettreAJourPV(); //mise à jour des pv dans le header

		//Si l'un des combattants n'a plus de point de vie on annonce le vainqueur
		if (hero.pv === 0 || monstre.pv === 0) {
			let finDuJeu = annonceDuVainqueur();
			gameDisplayHTML.innerHTML += finDuJeu;
		} 
		else {//Sinon on permet à l'utilisateur de continuer le combat
			gameDisplayHTML.innerHTML += '<div id="combatButtonContinue" class="button-combat button-hover">Continuer !</div>';
			$('#combatButtonContinue').click(combat);
		}
		
	});		
}

function chifoumi (imgId){

	let userChoice;
	let computerRandom;
	let computerChoice;
	let quiAttaque;
	
	//On tire un nombre aléatoire pour l'ordinateur en faisant en sorte que ce nombre ne soit pas le même que celui de user 
	do {
		computerRandom = nombreAleatoire(1, 3);
	}
	while(imgId === computerRandom);
	
	//selon la data de l'image on peut faire le lien avec Pierre feuille ou ciseaux
	switch (imgId){
		case 1 :
			userChoice = "PIERRE";
			break;
		case 2 :
			userChoice = "FEUILLE";
			break;
		case 3 :
			userChoice = "CISEAUX";
			break;
	}

	//selon le nombre aléatoire on peut faire le lien avec Pierre feuille ou ciseaux
	switch (computerRandom){
		case 1 :
			computerChoice = "PIERRE";
			break;
		case 2 :
			computerChoice = "FEUILLE";
			break;
		case 3 :
			computerChoice = "CISEAUX";
			break;
	}

	//Si l'utilisateur gagne le chifoumi il attaque
	if ( (userChoice === "PIERRE" && computerChoice === "CISEAUX") || (userChoice === "FEUILLE" && computerChoice === "PIERRE") || (userChoice === "CISEAUX" && computerChoice === "FEUILLE") ){
		quiAttaque = hero.attaque(monstre);
	}
	else { //sinon c'est l'ordinateur qui attaque
		quiAttaque = monstre.attaque(hero);
	}

	//Le résultat est un tableau contenant les id des choix et la déscription de l'attaque
	let resultatChifoumi = [imgId, computerRandom, quiAttaque]; 

	return resultatChifoumi;

}

function mettreAJourPV (){

	//Empêcher les pv d'être négatif en leur attribuant la valeur zéro
	if (hero.pv < 0){
		hero.pv = 0;
	}
	else if (monstre.pv < 0){
		monstre.pv = 0;
	}

	//Récupération et mise a jour des pv du header
	$('#pvHero').html(''+hero.pv+' pv');
	$('#pvMonstre').html(''+monstre.pv+' pv');

	//on calcule la taille de la barre de vie des personnages
	let pourcentageBarreHero = hero.pv / pvDepartHero;
	let pourcentageBarreMonstre = monstre.pv / pvDepartMonstre;
	let newBarreWidthHero = 90 * pourcentageBarreHero;
	let newBarreWidthMonstre = 90 * pourcentageBarreMonstre;

	//On met a jour la taille de la barre de vie dans le css du header
	$('#barrePvChevalier').css("width", " " + newBarreWidthHero + "px");
	$('#barrePvDragon').css("width", " " + newBarreWidthMonstre + "px");

}

function annonceDuVainqueur(){

	let phraseDeFin;

	//Si le héro à encore des pv il gagne sinon il perd
	if (hero.pv > 0){
		phraseDeFin = "<h2><span class='green'>" + hero.nom + "</span> a terrassé <span class='red'>" + monstre.nom + "</span>, vous êtes un héro !</h2>";
	}
	else {
		phraseDeFin = "<h2><span class='green'>" + hero.nom + "</span> s'est fait carbonisé par <span class='red'>" + monstre.nom + "</span>, et c'est vraiment dommage !</h2>";
	}
	
	return phraseDeFin;
}








