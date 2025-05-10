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

fetch("http://localhost:5000/api/auth/register", {
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
    let studentId = userInfo.id || userInfo.nom;
    exams.forEach(exam => {
        let scores = JSON.parse(localStorage.getItem(`scores_${exam.examId}_${studentId}`)) || [];
        let bestScore = scores.length > 0 ? Math.max(...scores).toFixed(2) : "N/A";
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td data-label="Titre">${exam.name}</td>
            <td data-label="Lien">${exam.lienDeExamen}</td>
            <td data-label="Groupe">${exam.groupDestination}</td>
            <td data-label="Meilleur score">${bestScore}</td>
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
            fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ examId, latitude, longitude })
            })
            .then(response => response.json())
            .then(data => console.log("Géolocalisation envoyée:", data))
            .catch(error => console.error("Erreur lors de l'envoi de la géolocalisation:", error));

            document.querySelector(".container").style.display = "none";
            document.getElementById("examSection").style.display = "flex";

            let currentQuestionIndex = 0;
            let totalScore = 0;
            let totalPossibleScore = exam.questions.reduce((sum, q) => sum + parseInt(q.mark), 0);

            function loadQuestion(index) {
                if (index >= exam.questions.length) {
                    let percentage = (totalScore / totalPossibleScore) * 100;
                    document.getElementById("examSection").style.display = "none";
                    document.getElementById("scoreSection").style.display = "flex";
                    let scoreDisplay = document.getElementById("scoreDisplay");
                    scoreDisplay.textContent = `${percentage.toFixed(2)} / 100`;
                    scoreDisplay.classList.remove("animate-score");
                    void scoreDisplay.offsetWidth; // Trigger reflow
                    scoreDisplay.classList.add("animate-score");

                    let studentId = userInfo.id || userInfo.nom;
                    let scores = JSON.parse(localStorage.getItem(`scores_${examId}_${studentId}`)) || [];
                    scores.push(percentage);
                    localStorage.setItem(`scores_${examId}_${studentId}`, JSON.stringify(scores));

                    fetch("http://localhost:5000/api/auth/register", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ examId, studentId, score: percentage })
                    })
                    .then(response => response.json())
                    .then(data => console.log("Score envoyé:", data))
                    .catch(error => console.error("Erreur lors de l'envoi du score:", error));

                    document.getElementById("retakeExam").onclick = () => {
                        document.getElementById("scoreSection").style.display = "none";
                        startExam(examId);
                    };
                    document.getElementById("backToList").onclick = () => {
                        document.getElementById("scoreSection").style.display = "none";
                        document.querySelector(".container").style.display = "block";
                        populateTable();
                    };
                    return;
                }

                let question = exam.questions[index];
                document.getElementById("questionTitle").textContent = `Question ${index + 1}`;
                document.getElementById("questionText").textContent = question.Question;

                let content = '';
                if (question.Type === "DirectQuestion") {
                    content = `<input type="text" id="answerInput" placeholder="Entrez votre réponse">`;
                } else if (question.Type === "QCM") {
                    content = `<select id="answerSelect">`;
                    if (question.choice_1) content += `<option value="choice1">${question.choice_1}</option>`;
                    if (question.choice_2) content += `<option value="choice2">${question.choice_2}</option>`;
                    if (question.choice_3) content += `<option value="choice3">${question.choice_3}</option>`;
                    if (question.choice_4) content += `<option value="choice4">${question.choice_4}</option>`;
                    content += `</select>`;
                }
                document.getElementById("questionContent").innerHTML = content;

                let timeLeft = parseInt(question.duration);
                document.getElementById("timeLeft").textContent = timeLeft;
                let timerInterval = setInterval(() => {
                    timeLeft--;
                    document.getElementById("timeLeft").textContent = timeLeft;
                    if (timeLeft <= 0) {
                        clearInterval(timerInterval);
                        submitAnswer(index);
                    }
                }, 1000);

                document.getElementById("submitAnswer").onclick = () => {
                    clearInterval(timerInterval);
                    submitAnswer(index);
                };
            }

            function submitAnswer(index) {
                let question = exam.questions[index];
                let studentAnswer;

                if (question.Type === "DirectQuestion") {
                    studentAnswer = document.getElementById("answerInput").value.trim();
                } else if (question.Type === "QCM") {
                    studentAnswer = document.getElementById("answerSelect").value;
                }

                let isCorrect = false;
                if (question.Type === "QCM") {
                    isCorrect = studentAnswer === question.correct_answer;
                } else if (question.Type === "DirectQuestion") {
                    let correctAnswer = question.correct_answer;
                    let tolerance = parseInt(question.tolerance) || 0;
                    let numCorrect = parseFloat(correctAnswer);
                    let numStudent = parseFloat(studentAnswer);

                    if (!isNaN(numCorrect) && !isNaN(numStudent) && tolerance > 0) {
                        let diff = Math.abs(numStudent - numCorrect);
                        let allowedDiff = (tolerance / 100) * numCorrect;
                        isCorrect = diff <= allowedDiff;
                    } else {
                        isCorrect = studentAnswer.toLowerCase() === correctAnswer.toLowerCase();
                    }
                }

                if (isCorrect) {
                    totalScore += parseInt(question.mark);
                }

                currentQuestionIndex++;
                loadQuestion(currentQuestionIndex);
            }

            loadQuestion(0);
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