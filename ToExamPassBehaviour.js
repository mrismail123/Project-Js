let userInfo = JSON.parse(localStorage.getItem("studentData"));

let nomPrenomNavSide = document.querySelector(".nomPrenom");

if(userInfo.sexe === "homme") {
    nomPrenomNavSide.innerHTML = `${userInfo.prenom} ${userInfo.nom}`;
    nomPrenomNavSide.style.textTransform = "capitalize";
} else {
    document.querySelector(".profileImage").src="./photos/unkownStudentFemale.webp";
    nomPrenomNavSide.innerHTML = `${userInfo.prenom} ${userInfo.nom}`;
    nomPrenomNavSide.style.textTransform = "capitalize";
}

let navBarI = document.querySelector("div.container-fluid i.nav");
let navSide = document.querySelector("div.sideBar");

navBarI.onclick = function() {
    if(navBarI.classList.contains("true")) {
        navSide.style.transform = "translateX(0%)";
        navSide.style.display = "flex";
        navBarI.classList.replace("true", "false");
    } else {
        navSide.style.transform = "translateX(-100%)";
        navSide.style.display = "none";
        navBarI.classList.replace("false", "true");
    }
}

let exams = [];
for (let key in localStorage) {
    if (key.startsWith("exam")) {
        exams.push(JSON.parse(localStorage.getItem(key)));
    }
}

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
    tbody.innerHTML = "";
    exams.forEach(exam => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td data-label="Titre">${exam.name}</td>
            <td data-label="Lien">${exam.lienDeExamen}</td>
            <td data-label="Groupe">${exam.groupDestination}</td>
            <td data-label="Meilleur score">N/A</td>
            <td data-label="Actions">
                <button onclick="startExam('${exam.examId}')">Commencer l'examen</button>
                <button onclick="copyLink('${exam.lienDeExamen}')">Copier le lien</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function startExam(examId) {
    let exam = exams.find(e => e.examId === examId);
    if (!exam) {
        alert("Examen non trouvé.");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            localStorage.setItem("lastGeolocation", JSON.stringify({
                latitude,
                longitude,
                timestamp: Date.now()
            }));
            document.getElementById("geoInfo").textContent = `Votre position : ${latitude}, ${longitude}`;
            fetch("serverName/saveGeolocation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ examId, latitude, longitude })
            })
            .then(response => response.json())
            .then(data => console.log("Géolocalisation envoyée:", data))
            .catch(error => console.error("Erreur lors de l'envoi de la géolocalisation:", error));
        },
        (error) => {
            if (error.code === error.PERMISSION_DENIED) {
                alert("Vous devez autoriser la géolocalisation pour passer l'examen.");
            } else {
                alert("Erreur de géolocalisation : " + error.message);
            }
        }
    );
}

function copyLink(link) {
    navigator.clipboard.writeText(link).then(() => {
        alert("Lien copié dans le presse-papiers.");
    }).catch(err => {
        alert("Échec de la copie du lien : " + err);
    });
}

let params = new URLSearchParams(window.location.search);
let examId = params.get("examId");
if (examId && exams.some(exam => exam.examId === examId)) {
    startExam(examId);
} else if (examId) {
    alert("Examen non trouvé.");
}
