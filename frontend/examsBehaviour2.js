let h2 = document.querySelectorAll("h2.userWelcome");

let userInfo = JSON.parse(localStorage.getItem("studentData"));

if(userInfo.sexe === "homme") {
    h2.forEach((el) => {
        el.innerHTML = `Bonjour monsieur ${userInfo.prenom}`;
        el.style.textTransform = "capitalize";
    });
} else {
    h2.forEach((el) => {
        el.innerHTML = `Bonjour madame ${userInfo.prenom}`;
        el.style.textTransform = "capitalize";
    });
}





// let spanTarhib = document.querySelector(".tarhib");
let nomPrenomNavSide = document.querySelector(".nomPrenom");



// if(userInfo.sexe === "homme") {
//     spanTarhib.innerHTML = `mr ${userInfo.prenom}`;
//         spanTarhib.style.textTransform = "capitalize";
//     } else {
//         spanTarhib.innerHTML = `mrs ${userInfo.prenom}`;
//         spanTarhib.style.textTransform = "capitalize";
//     }
    
    
if(userInfo.sexe === "homme") {
    nomPrenomNavSide.innerHTML = `${userInfo.prenom} ${userInfo.nom}`;
    nomPrenomNavSide.style.textTransform = "capitalize";
} else {
        document.querySelector(".profileImage").src="./photos/unkownStudentFemale.webp";
        nomPrenomNavSide.innerHTML = `${userInfo.prenom} ${userInfo.nom}`;
        nomPrenomNavSide.style.textTransform = "capitalize";
}


// icône de la barre de navigation
let navBarI = document.querySelector("div.container-fluid i.nav");

// barre latérale du profil
let navSide = document.querySelector("div.sideBar");


// contrôle de la visibilité de la barre latérale
navBarI.onclick = function() {
    if(navBarI.classList.contains("true")) {
        navSide.style.transform = "translateX(0%)";
        navSide.style.display = "flex";
        navBarI.classList.replace("true", "false");
        document.querySelector("i.downSection").style.display="none";
        // section.style.cssText = "display:none";
        document.querySelector(".section").style.display="none";
        
    } else {
        navSide.style.transform = "translateX(-100%)";
        navSide.style.display = "none";
        navBarI.classList.replace("false", "true");
        // section.style.cssText = "display:block";
        document.querySelector("i.downSection").style.display="block";
        document.querySelector(".section").style.display="block";
    }
}


document.querySelector("i.downSection").addEventListener("click" , ()=>{
    window.scrollTo({
        top: 500,      // Scroll to 500px from the top
        behavior: 'smooth' // Optional: adds smooth scrolling
    });
});


window.addEventListener("scroll" , ()=>{
    const windowHeight = window.innerHeight;

    // Animer les images lorsque celles-ci sont visibles dans la fenêtre
    document.querySelectorAll(".section .image").forEach((img) => {
        const section = img.getBoundingClientRect().top;
        if (section < windowHeight - 100) {
            img.style.cssText = "opacity: 1;";  // Faire apparaître l'image
        }
    });

    const section2 = document.querySelector(".imageText.one .text").getBoundingClientRect().top ; 
    if(section2 < windowHeight - 100){
        document.querySelector(".imageText.one .text").style.cssText = "transform:translateX(0%);opacity:1;";
    }
    const section3 = document.querySelector(".imageText.three .text").getBoundingClientRect().top ; 
    if(section3 < windowHeight - 100){
        document.querySelector(".imageText.three .text").style.cssText = "transform:translateX(0%);opacity:1;";
    }
    const section4 = document.querySelector(".imageText.two .text").getBoundingClientRect().top ; 
    if(section4 < windowHeight - 100){
        document.querySelector(".imageText.two .text").style.cssText = "transform:translateX(0%);opacity:1;";
    }
})

let buttonGoToExamPass = document.querySelector("button.goToExamPass");

buttonGoToExamPass.addEventListener("click", ()=> {
    window.location.href="ToExamPass.html";
});