let userInfo = JSON.parse(localStorage.getItem("studentData"));

let nomPrenomNavSide = document.querySelector(".nomPrenom");

if(userInfo.sexe === "homme") {
    nomPrenomNavSide.innerHTML = `${userInfo.prenom} ${userInfo.nom}`;
    nomPrenomNavSide.style.textTransform = "capitalize";
    nomPrenomNavSide.style.color="white";
} else {
    document.querySelector(".profileImage").src = "./photos/unkownStudentFemale.webp";
    nomPrenomNavSide.innerHTML = `${userInfo.prenom} ${userInfo.nom}`;
    nomPrenomNavSide.style.textTransform = "capitalize";
    nomPrenomNavSide.style.color="white";
}

// Icône de la barre de navigation
let navBarI = document.querySelector("div.container-fluid i.nav");

// Barre latérale du profil
let navSide = document.querySelector("div.sideBar");

// Contrôle de la visibilité de la barre latérale
navBarI.onclick = function () {
    if (navBarI.classList.contains("true")) {
        navSide.style.transform = "translateX(0%)";
        navSide.style.display = "flex";
        navBarI.classList.replace("true", "false");
    } else {
        navSide.style.transform = "translateX(-100%)";
        navSide.style.display = "none";
        navBarI.classList.replace("false", "true");
    }
}

// Chargement des examens depuis le localStorage
let exams = [];
for (let key in localStorage) {
    if (key.startsWith("exam")) {
        exams.push(JSON.parse(localStorage.getItem(key)));
    }
}

console.log(exams);

// Simulation de récupération depuis le serveur
fetch("serverName", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    }
})
.then(response => response.json())
.then(data => {
    data.forEach(exam => {
        if (!exams.some(e => e.examId === exam.examId)) {
            exams.push(exam);
            localStorage.setItem(`exam${exam.examId}`, JSON.stringify(exam));
        }
    });
    populateTable();
})
.catch(error => {
    console.error("Server fetch failed, using localStorage:", error);
    populateTable();
});

function populateTable() {
    let tbody = document.querySelector("#examsTable tbody");
    tbody.innerHTML = ""; // Effacer les lignes existantes
    exams.forEach(exam => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${exam.name}</td>
            <td>${exam.lienDeExamen}</td>
            <td>${exam.groupDestination}</td>
            <td>
                <button onclick="startExam('${exam.examId}')">Commencer l'examen</button>
                <button onclick="copyLink('${exam.lienDeExamen}')">Copier le lien</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Fonction pour commencer un examen (sans géolocalisation)
function startExam(examId) {
    let exam = exams.find(e => e.examId === examId);
    if (!exam) {
        alert("Examen introuvable.");
        return;
    }

    // Procéder à l'examen (placeholder)
    alert("Examen commencé pour " + exam.name);
}

// Fonction pour copier un lien
function copyLink(link) {
    navigator.clipboard.writeText(link).then(() => {
        alert("Lien copié dans le presse-papiers.");
    }).catch(err => {
        alert("Échec de la copie du lien : " + err);
    });
}

// Vérifier l'URL pour examId et démarrer automatiquement si trouvé
let params = new URLSearchParams(window.location.search);
let examId = params.get("examId");
if (examId && exams.some(exam => exam.examId === examId)) {
    startExam(examId);
} else if (examId) {
    alert("Examen introuvable.");
}
