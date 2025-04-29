let h2 = document.querySelectorAll("h2");

let userInfo = JSON.parse(localStorage.getItem("teacherData"));

if(userInfo.sexe === "homme") {
    h2.forEach((el) => {
        el.innerHTML = `Bonjour monsieur ${userInfo.nom}`;
        el.style.textTransform = "capitalize";
    });
} else {
    h2.forEach((el) => {
        el.innerHTML = `Bonjour madame ${userInfo.nom}`;
        el.style.textTransform = "capitalize";
    });
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
