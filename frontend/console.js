
// Sélectionner les éléments du DOM
let textLanding = document.querySelector(".landing .text");
let buttonDivFirst = document.querySelector(".landing .button");
let buttonCommencer = document.querySelector(".landing .button .buttonCommencer");

// Quand la fenêtre est complètement chargée
window.addEventListener("load", () => {
    // Appliquer une transformation pour centrer le texte
    textLanding.style.cssText = "transform:translate(-50%,-50%)";
    // Appliquer une opacité de 100% pour afficher le bouton "Commencer"
    buttonCommencer.style.cssText = "opacity:100%;";
    // Placer le bouton dans la position appropriée
    buttonDivFirst.style.cssText = "top:80%";
});

// Sélectionner d'autres éléments du DOM
let textIntro = document.querySelector(".landing .text p");
let studentTeacherButton = document.querySelector(".landing .studentTeacher");

// Lors du clic sur le bouton "Commencer"
buttonCommencer.addEventListener("click", () => {
    // Rendre visible le bouton pour choisir l'étudiant ou le professeur
    studentTeacherButton.style.cssText = "visibility:visible;top:80%";
    // Masquer le bouton "Commencer"
    buttonCommencer.style.display = "none";
});

// Changer l'image de la landing page à intervalles réguliers
let landing = document.querySelector(".landing");
let myImages = ["./photos/landing1", "./photos/landing3", "./photos/landing4"];
let index = 0;

// Fonction pour changer l'image de fond toutes les 3 secondes
function changeLanding() {
    landing.style.backgroundImage = `URL(${myImages[index]}.jpg)`;
    index = (index + 1) % myImages.length;  // Passer à l'image suivante, en boucle
    setTimeout(changeLanding, 3000);  // Appeler la fonction toutes les 3 secondes
};

changeLanding();  // Lancer le changement d'images

// Essayer une animation spéciale lors du défilement de la page
let images = document.querySelectorAll(".card .image");
let texts = document.querySelectorAll(".card .text");
let textAbout = document.querySelector(".about .about-content .text");
let aboutImage = document.querySelector(".about .about-content .image");
let testimonials = document.querySelector(".about2 .testimonials");
let skills = document.querySelector(".about2 .skills");
let contactImage = document.querySelector(".contact .contact-content .image");
let contactForm = document.querySelector(".contact .contact-content form");

// Écouteur d'événement pour le défilement de la page
window.addEventListener("scroll", function () {
    const windowHeight = window.innerHeight;

    // Animer les images lorsque celles-ci sont visibles dans la fenêtre
    images.forEach((img) => {
        const section = img.getBoundingClientRect().top;
        if (section < windowHeight - 100) {
            img.style.cssText = "transform: translateX(0%); opacity: 1;";  // Faire apparaître l'image
        }
    });

    // Animer les textes lorsque ceux-ci sont visibles dans la fenêtre
    texts.forEach((txt) => {
        const txtTop = txt.getBoundingClientRect().top;
        if (txtTop < windowHeight - 100) {
            txt.style.cssText = "transform: translateX(0%); opacity: 1;";  // Faire apparaître le texte
        }
    });

    // Animer le texte "About" et l'image de la section "About" lorsqu'elles sont visibles
    const myTextAbout = textAbout.getBoundingClientRect().top;
    const myAboutImage = aboutImage.getBoundingClientRect().top;
    if (myTextAbout < windowHeight - 100) {
        textAbout.style.transform = "translateX(0%)";
        aboutImage.style.transform = "translateX(0%)";
    }

    // Animer les témoignages et les compétences lorsqu'ils sont visibles
    const testimonialsTop = testimonials.getBoundingClientRect().top;
    const skillsTop = skills.getBoundingClientRect().top;
    if (testimonialsTop < windowHeight - 100) {
        testimonials.style.transform = "translateX(0%)";
        skills.style.transform = "translateX(0%)";
    }

    // Animer l'image et le formulaire de contact lorsqu'ils sont visibles
    const imageTop = contactImage.getBoundingClientRect().top;
    const formTop = contactForm.getBoundingClientRect().top;
    if (imageTop < windowHeight - 100) {
        contactImage.style.transform = "translateX(0%)";
        contactForm.style.transform = "translateX(0%)";
    }
});
