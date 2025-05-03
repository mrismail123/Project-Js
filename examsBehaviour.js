let h2 = document.querySelectorAll("h2");

let userInfo = JSON.parse(localStorage.getItem("teacherData"));

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



let spanTarhib = document.querySelector(".tarhib");
let nomPrenomNavSide = document.querySelector(".nomPrenom");



if(userInfo.sexe === "homme") {
    spanTarhib.innerHTML = `mr ${userInfo.prenom}`;
        spanTarhib.style.textTransform = "capitalize";
    } else {
        spanTarhib.innerHTML = `mrs ${userInfo.prenom}`;
        spanTarhib.style.textTransform = "capitalize";
    }
    
    
if(userInfo.sexe === "homme") {
    nomPrenomNavSide.innerHTML = `${userInfo.prenom} ${userInfo.nom}`;
    nomPrenomNavSide.style.textTransform = "capitalize";
} else {
        document.querySelector(".profileImage").src="./photos/unknownWoman.png";
        nomPrenomNavSide.innerHTML = `${userInfo.prenom} ${userInfo.nom}`;
        nomPrenomNavSide.style.textTransform = "capitalize";
}

// icône de la barre de navigation
let navBarI = document.querySelector("div.container-fluid i.nav");

// barre latérale du profil
let navSide = document.querySelector("div.sideBar");

// section contenant tous les choix
let section = document.querySelector(".sections");

// première section - introduction de la page
let intro = document.querySelector("div.intro");

// téléverser un examen directement
let uploadExam = document.querySelector(".sideBar .choose.one");

// créer des examens QCM
let mcqExam = document.querySelector(".sideBar .choose.two");

let uploadStart = document.querySelector(".sections .uploadStart");
let createExam = document.querySelector(".sections .createExam");
let buttonIntro = document.querySelector(".intro button");

// action du bouton de démarrage
buttonIntro.onclick = function () {
    section.style.display = "block";
    createExam.style.display = "block";
    intro.style.cssText = "display:none;";
    navSide.style.display = "none";
    uploadStart.style.display = "none";
};

// contrôle de la visibilité des différentes sections
window.onload = function() {
    uploadStart.style.display = "none";
    createExam.style.display="none";
}

// contrôle de la visibilité de la barre latérale
navBarI.onclick = function() {
    if(navBarI.classList.contains("true")) {
        navSide.style.transform = "translateX(0%)";
        navSide.style.display = "flex";
        navBarI.classList.replace("true", "false");
        section.style.cssText = "display:none";
    } else {
        navSide.style.transform = "translateX(-100%)";
        navSide.style.display = "none";
        navBarI.classList.replace("false", "true");
        section.style.cssText = "display:block";
    }
}

// afficher la section de téléversement direct d'examens
uploadExam.addEventListener("click", () => {
    intro.style.cssText = "display:none;";
    navSide.style.display = "none";
    section.style.display = "block";
    uploadStart.style.display = "block";
    createExam.style.display = "none";
});

// afficher la section de création d'examens
mcqExam.addEventListener("click", () => {
    section.style.display = "block";
    createExam.style.display = "block";
    intro.style.cssText = "display:none;";
    navSide.style.display = "none";
    uploadStart.style.display = "none";
});

let globalExamInformation = document.querySelector(".createExam .globalExamInformations");
let myForm = document.querySelector(".globalExamInformations form");

// génération automatique d’un lien unique pour l’examen
function generateUniqueLink() {
    const randomString = Math.random().toString(36).substring(2, 10);
    return `https://phantomschool.com/examen/${randomString}`;
}

myForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const examInfo = {
        title: document.querySelector("input[name='examName']").value,
        groupDestination: document.querySelector("form textarea").value,
    };

    const uniqueLink = generateUniqueLink();
    let spanLink = document.querySelector("span.linkToExam");
    spanLink.innerHTML = uniqueLink;

    localStorage.setItem("examInfo", JSON.stringify(examInfo));
    localStorage.setItem("lien de l'examen", spanLink.innerHTML);

    let examSettingsSection = document.querySelector(".sections .startExamSettings");
    examSettingsSection.style.display = "flex";
    document.querySelector(".questions").style.display = "block";
    document.querySelector(".exams").style.display = "block";

    fetch("serverName", { // ajouter l'adresse du serveur ici
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(examInfo),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        document.querySelector(".startExamSettings").style.display = "flex";
    })
    .catch((error) => {
        alert("Problème lors de l'envoi des données au serveur !");
        console.error("Erreur", error);
    });
});

// Références des éléments
let examSettingForm = document.querySelector(".startExamSettings form");
let questionType = document.getElementById("questionType");
let qcmQuestionOption = document.getElementById("qcmOption");
let questionDirectOption = document.getElementById("questionDirectOption");
let addQuestionsSection = document.querySelector("div.questions .addedQuestions");
let addedExamsSection = document.querySelector(".addedExams");
let submitExamButton = document.getElementById("submitExamButton");
let examTitle = document.getElementById("examTitle");
let questionTotalNumber = 1;
let editingQuestionId = null;

// mettre à jour le titre de l'examen dynamiquement
document.querySelector("input[name='examName']").addEventListener("input", () => {
    examTitle.textContent = document.querySelector("input[name='examName']").value || "inconnu";
})

// fonction pour afficher les champs selon le type de question
function updateDynamicFields() {
    qcmQuestionOption.innerHTML = '';
    questionDirectOption.innerHTML = '';

    if (questionType.value === "DirectQuestion") {
        questionDirectOption.innerHTML = `
            <label for="answer">*Réponse</label><br>
            <input type="text" name="answer" id="answer" placeholder="par ex : JavaScript est un langage mono-thread" required><br><br>
            <label for="tolerance">*Tolérance</label><br>
            <input type="number" name="tolerance" id="tolerance" placeholder="%" min="10" max="30" required><br><br>
        `;
    } else if (questionType.value === "QCM") {
        qcmQuestionOption.innerHTML = `
            <label for="choice1">*Choix 1</label><br>
            <input type="text" name="choice_1" id="choice1" required><br><br>
            <label for="choice2">*Choix 2</label><br>
            <input type="text" name="choice_2" id="choice2" required><br><br>
            <label for="choice3">*Choix 3</label><br>
            <input type="text" name="choice_3" id="choice3"><br><br>
            <label for="choice4">*Choix 4</label><br>
            <input type="text" name="choice_4" id="choice4"><br><br>
            <label for="answer">*Réponse</label><br>
            <select name="answer" id="answer" required>
                <option value="choice1">Choix 1</option>
                <option value="choice2">Choix 2</option>
                <option value="choice3">Choix 3</option>
                <option value="choice4">Choix 4</option>
            </select>
        `;
        document.querySelector("input[name='choice_1']").addEventListener('input', updateOptions);
        document.querySelector("input[name='choice_2']").addEventListener('input', updateOptions);
        document.querySelector("input[name='choice_3']").addEventListener('input', updateOptions);
        document.querySelector("input[name='choice_4']").addEventListener('input', updateOptions);
    }
}

// mettre à jour les options QCM selon les champs de saisie
function updateOptions() {
    const choice1 = document.querySelector("input[name='choice_1']")?.value || 'Choix 1';
    const choice2 = document.querySelector("input[name='choice_2']")?.value || 'Choix 2';
    const choice3 = document.querySelector("input[name='choice_3']")?.value || 'Choix 3';
    const choice4 = document.querySelector("input[name='choice_4']")?.value || 'Choix 4';
    const answerSelect = document.querySelector("select[name='answer']");
    if (answerSelect) {
        answerSelect.innerHTML = `
            <option value="choice1">${choice1}</option>
            <option value="choice2">${choice2}</option>
            <option value="choice3">${choice3}</option>
            <option value="choice4">${choice4}</option>
        `;
    }
}

// écouter le changement de type de question
questionType.addEventListener("change", updateDynamicFields);



examSettingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (questionType.value === "notSelected" || !questionType.value) {
        alert("Please select a valid question type.");
        return;
    }

    if (questionTotalNumber > 20 && !editingQuestionId) {
        alert("Sorry, you can't add more than 20 questions!");
        return;
    }

    let questionId = editingQuestionId || questionTotalNumber;
    let addQuestionsSectionDiv = document.createElement("div");

    let questionInformation = {
        Question: examSettingForm.questionText.value,
        Type: questionType.value,
        correct_answer: examSettingForm.answer?.value || "",
        assosiated_files: examSettingForm.fileAttachement.files[0]?.name || "None",
        mark: examSettingForm.note.value,
        duration: examSettingForm.duration.value + ' seconds',
    };

    if (questionType.value === "QCM") {
        questionInformation.choice_1 = examSettingForm.choice_1?.value || "";
        questionInformation.choice_2 = examSettingForm.choice_2?.value || "";
        questionInformation.choice_3 = examSettingForm.choice_3?.value || "";
        questionInformation.choice_4 = examSettingForm.choice_4?.value || "";
    } else if (questionType.value === "DirectQuestion") {
        questionInformation.tolerance = examSettingForm.tolerance?.value || "0";
    }

    localStorage.setItem(`question${questionId}`, JSON.stringify(questionInformation));
    let questionData = JSON.parse(localStorage.getItem(`question${questionId}`));

    addQuestionsSectionDiv.innerHTML = `
        <h5>Question ${questionId}: ${questionData.Question}</h5>
        <hr>
        <h5>Type: ${questionData.Type}</h5>
        <hr>
        ${questionData.Type === "QCM" ? `
            <h5>Choice 1: ${questionData.choice_1}</h5>
            <h5>Choice 2: ${questionData.choice_2}</h5>
            <h5>Choice 3: ${questionData.choice_3 || "not selected"}</h5>
            <h5>Choice 4: ${questionData.choice_4 || "not selected"}</h5>
            <hr>
        ` : ""}
        <h5>Correct answer: ${questionData.correct_answer}</h5>
        ${questionData.Type === "DirectQuestion" ? `<h5>Tolerance: ${questionData.tolerance}%</h5><hr>` : ""}
        <h5>Associated files: ${questionData.assosiated_files}</h5>
        <hr>
        <h5>Mark: ${questionData.mark}</h5>
        <hr>
        <h5>Duration: ${questionData.duration}</h5>
        <hr>
        <button class="deleteButton" data-id="${questionId}">delete</button>
        <button class="configButton" data-id="${questionId}">config</button>
    `;

    if (editingQuestionId) {
        let existingDiv = document.querySelector(`.addedQuestions div .configButton[data-id="${questionId}"]`)?.closest("div");
        if (existingDiv) {
            existingDiv.replaceWith(addQuestionsSectionDiv);
        }
        editingQuestionId = null;
    } else {
        addQuestionsSection.appendChild(addQuestionsSectionDiv);
        questionTotalNumber++;
    }

    // Add event listeners to buttons
    addQuestionsSectionDiv.querySelector(".deleteButton").addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        localStorage.removeItem(`question${id}`);
        e.target.closest("div").remove();
    });

    addQuestionsSectionDiv.querySelector(".configButton").addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        const question = JSON.parse(localStorage.getItem(`question${id}`));
        if (!question) return;

        examSettingForm.questionText.value = question.Question;
        questionType.value = question.Type;
        updateDynamicFields();
        if (question.Type === "QCM") {
            examSettingForm.choice_1.value = question.choice_1;
            examSettingForm.choice_2.value = question.choice_2;
            examSettingForm.choice_3.value = question.choice_3 || "";
            examSettingForm.choice_4.value = question.choice_4 || "";
            updateOptions();
            examSettingForm.answer.value = question.correct_answer;
        } else if (question.Type === "DirectQuestion") {
            examSettingForm.answer.value = question.correct_answer;
            examSettingForm.tolerance.value = question.tolerance || "0";
        }
        examSettingForm.note.value = question.mark;
        examSettingForm.duration.value = parseInt(question.duration);
        editingQuestionId = id;
    });

    examSettingForm.reset();
    updateDynamicFields();
});

// Submit Exam button handler
submitExamButton.addEventListener("click", () => {
    let examName = document.querySelector("input[name='examName']").value.trim();
    if (!examName) {
        alert("Please enter an exam name.");
        return;
    }
    document.querySelector("input[name='examName']").value='';

    let questions = [];
    for (let i = 1; i <= 20; i++) {
        let questionData = localStorage.getItem(`question${i}`);
        if (questionData) {
            questions.push(JSON.parse(questionData));
        }
    }

    if (questions.length === 0) {
        alert("No questions added for this exam.");
        return;
    }

    let examId = 1;
    while (localStorage.getItem(`exam${examId}`)) {
        examId++;
    }

    let exam = {
        name: examName,
        questions: questions
    };

    fetch("serverName", { // ajouter le server Ici @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(exam),
    })
    .then((response)=> response.json())
    .then((data)=>{
        console.log(data);
    })
    .catch((error)=>{
        alert("there was a problem sending the data to the server !");
    })

    localStorage.setItem(`exam${examId}`, JSON.stringify(exam));

    let examDiv = document.createElement("div");
    examDiv.classList.add("exam");
    let questionsHTML = questions.map((q, index) => `
        <h5>Question ${index + 1}: ${q.Question}</h5>
        <p>Type: ${q.Type}</p>
        ${q.Type === "QCM" ? `
            <p>Choice 1: ${q.choice_1}</p>
            <p>Choice 2: ${q.choice_2}</p>
            <p>Choice 3: ${q.choice_3 || "not selected"}</p>
            <p>Choice 4: ${q.choice_4 || "not selected"}</p>
        ` : ""}
        <p>Correct answer: ${q.correct_answer}</p>
        ${q.Type === "DirectQuestion" ? `<p>Tolerance: ${q.tolerance}%</p>` : ""}
        <p>Associated files: ${q.assosiated_files}</p>
        <p>Mark: ${q.mark}</p>
        <p>Duration: ${q.duration}</p>
        <hr>
    `).join("");

    examDiv.innerHTML = `
        <h5>Exam: ${exam.name}</h5>
        <p>Number of questions: ${questions.length}</p>
        <div class="examQuestions">${questionsHTML}</div>
    `;
    addedExamsSection.appendChild(examDiv);

    // Clear questions
    for (let i = 1; i <= 20; i++) {
        localStorage.removeItem(`question${i}`);
    }
    addQuestionsSection.innerHTML = '';
    examSettingForm.reset();
    updateDynamicFields();
    questionTotalNumber = 1;
    examNameInput.value = '';
    examTitle.textContent = "unknown";
});

// Load existing data on page load
window.addEventListener("DOMContentLoaded", () => {
    for (let i = 1; i <= 20; i++) {
        let questionData = localStorage.getItem(`question${i}`);
        if (!questionData) break;
        let question = JSON.parse(questionData);
        let addQuestionsSectionDiv = document.createElement("div");

        addQuestionsSectionDiv.innerHTML = `
            <h5>Question ${i}: ${question.Question}</h5>
            <hr>
            <h5>Type: ${question.Type}</h5>
            <hr>
            ${question.Type === "QCM" ? `
                <h5>Choice 1: ${question.choice_1}</h5>
                <h5>Choice 2: ${question.choice_2}</h5>
                <h5>Choice 3: ${question.choice_3 || "not selected"}</h5>
                <h5>Choice 4: ${question.choice_4 || "not selected"}</h5>
                <hr>
            ` : ""}
            <h5>Correct answer: ${question.correct_answer}</h5>
            ${question.Type === "DirectQuestion" ? `<h5>Tolerance: ${question.tolerance}%</h5><hr>` : ""}
            <h5>Associated files: ${question.assosiated_files}</h5>
            <hr>
            <h5>Mark: ${question.mark}</h5>
            <hr>
            <h5>Duration: ${question.duration}</h5>
            <hr>
            <button class="deleteButton" data-id="${i}">delete</button>
            <button class="configButton" data-id="${i}">config</button>
        `;

        addQuestionsSection.appendChild(addQuestionsSectionDiv);

        addQuestionsSectionDiv.querySelector(".deleteButton").addEventListener("click", (e) => {
            const id = e.target.dataset.id;
            localStorage.removeItem(`question${id}`);
            e.target.closest("div").remove();
        });

        addQuestionsSectionDiv.querySelector(".configButton").addEventListener("click", (e) => {
            const id = e.target.dataset.id;
            const question = JSON.parse(localStorage.getItem(`question${id}`));
            if (!question) return;

            examSettingForm.questionText.value = question.Question;
            questionType.value = question.Type;
            updateDynamicFields();
            if (question.Type === "QCM") {
                examSettingForm.choice_1.value = question.choice_1;
                examSettingForm.choice_2.value = question.choice_2;
                examSettingForm.choice_3.value = question.choice_3 || "";
                examSettingForm.choice_4.value = question.choice_4 || "";
                updateOptions();
                examSettingForm.answer.value = question.correct_answer;
            } else if (question.Type === "DirectQuestion") {
                examSettingForm.answer.value = question.correct_answer;
                examSettingForm.tolerance.value = question.tolerance || "0";
            }
            examSettingForm.note.value = question.mark;
            examSettingForm.duration.value = parseInt(question.duration);
            editingQuestionId = id;
        });
    }

    for (let i = 1; i <= 20; i++) {
        if (!localStorage.getItem(`question${i}`)) {
            questionTotalNumber = i;
            break;
        }
    }

    let examId = 1;
    while (true) {
        let examData = localStorage.getItem(`exam${examId}`);
        if (!examData) break;
        let exam = JSON.parse(examData);
        let examDiv = document.createElement("div");
        examDiv.classList.add("exam");
        let questionsHTML = exam.questions.map((q, index) => `
            <h5>Question ${index + 1}: ${q.Question}</h5>
            <p>Type: ${q.Type}</p>
            ${q.Type === "QCM" ? `
                <p>Choice 1: ${q.choice_1}</p>
                <p>Choice 2: ${q.choice_2}</p>
                <p>Choice 3: ${q.choice_3 || "not selected"}</p>
                <p>Choice 4: ${q.choice_4 || "not selected"}</p>
            ` : ""}
            <p>Correct answer: ${q.correct_answer}</p>
            ${q.Type === "DirectQuestion" ? `<p>Tolerance: ${q.tolerance}%</p>` : ""}
            <p>Associated files: ${q.assosiated_files}</p>
            <p>Mark: ${q.mark}</p>
            <p>Duration: ${q.duration}</p>
            <hr>
        `).join("");

        examDiv.innerHTML = `
            <h5>Exam: ${exam.name}</h5>
            <p>Number of questions: ${exam.questions.length}</p>
            <div class="examQuestions">${questionsHTML}</div>
        `;
        addedExamsSection.appendChild(examDiv);
        examId++;
    }
});


