// // Cette fonction s'exécute lorsque le DOM est complètement chargé
// document.addEventListener("DOMContentLoaded", function() {
//     // Sélectionner le formulaire dans la page
//     const myForm = document.querySelector(".landing form");

//     // Ajouter un écouteur d'événements pour le formulaire lors de la soumission
//     myForm.addEventListener("submit", function(event) {
//         // Empêcher l'envoi du formulaire traditionnel pour traiter nous-mêmes l'envoi
//         event.preventDefault();



//         // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//         // @@@@@@@@@@@@@@@@@@@@@ DATA COLLECTION @@@@@@@@@@@@@@@@@@@@@@@
//         // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@



//         // Création d'un objet avec les données du formulaire
//         const myFormDataStudent = {
//             nom: myForm.nom.value,            // Récupère la valeur du champ "nom"
//             prenom: myForm.prenom.value,      // Récupère la valeur du champ "prénom"
//             email: myForm.email.value,        // Récupère la valeur du champ "email"
//             etablissement: myForm.etablissement.value,  // Récupère la valeur du champ "établissement"
//             dateDeNaissance: myForm.date.value,         // Récupère la valeur du champ "date de naissance"
//             filiere: myForm.fil.value,                 // Récupère la valeur du champ "filière"
//             sexe: myForm.gender.value                  // Récupère la valeur du champ "sexe"
//         };

//         window.location.href = "examsPage2.html";

//         // Enregistrer les données du formulaire dans le localStorage sous la clé "teacherData"
//         localStorage.setItem("teacherData", JSON.stringify(myFormDataStudent));

//         // Envoi des données au serveur via une requête POST
//         fetch("", {
//             method: "POST",  // Méthode POST pour envoyer les données
//             headers: {
//                 "Content-Type": "application/json", // Indique que nous envoyons des données au format JSON
//             },
//             body: JSON.stringify(myFormDataStudent)  // Convertir les données du formulaire en chaîne JSON
//         })
//         .then(response => response.json())  // Traiter la réponse du serveur (en supposant que la réponse soit en JSON)
//         .then(data => {
//             console.log("Succès:", data);  // Si la requête est réussie, afficher les données reçues du serveur
//             // Rediriger l'utilisateur vers la page "examsPage2.html"
//             window.location.href = "examsPage2.html";
//         })
//         .catch((error) => {
//             console.error("Erreur:", error);  // En cas d'erreur lors de la requête
//             // Afficher une alerte pour informer l'utilisateur de l'erreur
//             alert("Il y a eu une erreur lors de l'envoi de vos données. Veuillez réessayer.");
//         });
//     });
// });



document.addEventListener("DOMContentLoaded", function() {
    const myForm = document.getElementById("newAccountForm");

    myForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const myFormDataStudent = {
            nom: myForm.nom.value,
            prenom: myForm.prenom.value,
            email: myForm.email.value,
            etablissement: myForm.etablissement.value,
            dateDeNaissance: myForm.date.value,
            filiere: myForm.fil.value,
            sexe: myForm.gender.value,
            motDePasse: myForm.password.value
        };
        localStorage.setItem("studentData", JSON.stringify(myFormDataStudent));
        window.location.href = "examsPage2.html";
        fetch("", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(myFormDataStudent)
        })
        .then(response => response.json())
        .then(data => {
            console.log("Succès:", data);
            localStorage.setItem("studentData", JSON.stringify(myFormDataStudent));
            window.location.href = "examsPage2.html";
        })
        .catch((error) => {
            console.error("Erreur:", error);
            alert("Il y a eu une erreur lors de l'envoi de vos données. Veuillez réessayer.");
        });
    });

    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const email = loginForm.email.value;
        const password = loginForm.password.value;
    
        const storedData = localStorage.getItem("studentData");
    
        if (!storedData) {
            alert("Aucun utilisateur trouvé ! Veuillez créer un compte ou vérifier votre email/mot de passe.");
            return;
        }
    
        const parsedData = JSON.parse(storedData);
    
        if (parsedData.email === email && parsedData.motDePasse === password) {
            alert("Connexion réussie !");
            localStorage.setItem("loginDataStudent", JSON.stringify({ email, password }));
            window.location.href = "examsPage2.html";
        } else {
            alert("Aucune correspondance trouvée. Veuillez vérifier l'email ou le mot de passe.");
        }
    });
    

    const switchToSignup = document.getElementById("switchToSignup");
    switchToSignup.addEventListener("click", function(event) {
        event.preventDefault();
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("newAccountForm").style.display = "block";
    });
    
    const switchToLogIn = document.getElementById("switchTologIn");
    switchToLogIn.addEventListener("click" , function(event) {
        event.preventDefault();
        
        document.getElementById("loginSection").style.display = "flex";
        document.getElementById("newAccountForm").style.display = "none";
    });
});