
// Cette fonction s'exécute lorsque le DOM est complètement chargé
document.addEventListener("DOMContentLoaded", function() {
    // Sélectionner le formulaire dans la page
    const myForm = document.querySelector(".landing form");


    // Ajouter un écouteur d'événements pour le formulaire lors de la soumission
    myForm.addEventListener("submit", function(event) {
        // Empêcher l'envoi du formulaire traditionnel pour traiter nous-mêmes l'envoi
        event.preventDefault();


        // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        // @@@@@@@@@@@@@@@@@@@@@ DATA COLLECTION @@@@@@@@@@@@@@@@@@@@@@@
        // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        // Création d'un objet avec les données du formulaire
        const myFormData = {
            nom: myForm.nom.value,            // Récupère la valeur du champ "nom"
            prenom: myForm.prenom.value,      // Récupère la valeur du champ "prénom"
            email: myForm.email.value,        // Récupère la valeur du champ "email"
            etablissement: myForm.etablissement.value,  // Récupère la valeur du champ "établissement"
            dateDeNaissance: myForm.date.value,         // Récupère la valeur du champ "date de naissance"
            filiere: myForm.fil.value,                 // Récupère la valeur du champ "filière"
            sexe: myForm.gender.value                  // Récupère la valeur du champ "sexe"
        };



        window.location.href = "examsPage.html";


        // Enregistrer les données du formulaire dans le localStorage sous la clé "teacherData"
        localStorage.setItem("teacherData", JSON.stringify(myFormData));

        // Envoi des données au serveur via une requête POST
        fetch("", {
            method: "POST",  // Méthode POST pour envoyer les données
            headers: {
                "Content-Type": "application/json", // Indique que nous envoyons des données au format JSON
            },
            body: JSON.stringify(myFormData)  // Convertir les données du formulaire en chaîne JSON
        })
        .then(response => response.json())  // Traiter la réponse du serveur (en supposant que la réponse soit en JSON)
        .then(data => {
            console.log("Succès:", data);  // Si la requête est réussie, afficher les données reçues du serveur
            // Rediriger l'utilisateur vers la page "examsPage2.html"
            window.location.href = "examsPage.html";
        })
        .catch((error) => {
            console.error("Erreur:", error);  // En cas d'erreur lors de la requête
            // Afficher une alerte pour informer l'utilisateur de l'erreur
            alert("Il y a eu une erreur lors de l'envoi de vos données. Veuillez réessayer.");
        })
    });
});
