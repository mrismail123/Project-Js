let userInfo = JSON.parse(localStorage.getItem("studentData"));

let nomPrenomNavSide = document.querySelector(".nomPrenom");

if (userInfo.sexe === "homme") {
    nomPrenomNavSide.innerHTML = `${userInfo.prenom} ${userInfo.nom}`;
    nomPrenomNavSide.style.textTransform = "capitalize";
} else {
    document.querySelector(".profileImage").src = "./photos/unkownStudentFemale.webp";
    nomPrenomNavSide.innerHTML = `${userInfo.prenom} ${userInfo.nom}`;
    nomPrenomNavSide.style.textTransform = "capitalize";
}

// icône de la barre de navigation
let navBarI = document.querySelector("div.container-fluid i.nav");

// barre latérale du profil
let navSide = document.querySelector("div.sideBar");

// contrôle de la visibilité de la barre latérale
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
};

// Load exams from localStorage and server
let exams = [];
for (let key in localStorage) {
    if (key.startsWith("exam")) {
        exams.push(JSON.parse(localStorage.getItem(key)));
    }
}

console.log(exams);

// Simulate fetching from server (since no real server is provided)
fetch("serverName", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    }
})
    .then(response => response.json())
    .then(data => {
        // Assuming server returns an array of exams
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
    tbody.innerHTML = ""; // Clear existing rows
    exams.forEach(exam => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${exam.name}</td>
            <td>${exam.lienDeExamen}</td>
            <td>${exam.groupDestination}</td>
            <td>
                <button onclick="startExam('${exam.examId}')">Start Exam</button>
                <button onclick="copyLink('${exam.lienDeExamen}')">Copy Link</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Function to start the exam (without geolocation)
function startExam(examId) {
    let exam = exams.find(e => e.examId === examId);
    if (!exam) {
        alert("Exam not found.");
        return;
    }

    // Proceed to exam (placeholder)
    alert("Exam started for " + exam.name);
}

// Function to copy link
function copyLink(link) {
    navigator.clipboard.writeText(link).then(() => {
        alert("Link copied to clipboard.");
    }).catch(err => {
        alert("Failed to copy link: " + err);
    });
}

// Check URL for examId and auto-start
let params = new URLSearchParams(window.location.search);
let examId = params.get("examId");
if (examId && exams.some(exam => exam.examId === examId)) {
    startExam(examId);
} else if (examId) {
    alert("Exam not found.");
}
