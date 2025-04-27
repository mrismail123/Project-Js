let h2 = document.querySelectorAll("h2");

let userInfo = JSON.parse(localStorage.getItem("teacherData"));

if(userInfo.sexe==="homme"){
    h2.forEach((el)=>{
        el.innerHTML=`
            Bonjour  monsieur ${userInfo.nom}
        `;
        el.style.textTransform="capitalize";
    });
}else{
    h2.forEach((el)=>{
        el.innerHTML=`
            Bonjour  madame ${userInfo.nom}
        `;
        el.style.textTransform="capitalize";
    });

}


// navbar icon
let navBarI = document.querySelector("div.container-fluid i.nav");
// profile section
let navSide = document.querySelector("div.sideBar");
// section of all the choices
let section = document.querySelector(".sections");
// first section and this is the introduction for this page
let intro = document.querySelector("div.intro");
// upload exams directly on the site
let uploadExam = document.querySelector(".sideBar .choose.one");
// create mcq exams
let mcqExam = document.querySelector(".sideBar .choose.two");

let uploadStart = document.querySelector(".sections .uploadStart");

let createExam = document.querySelector(".sections .createExam");

let buttonIntro = document.querySelector(".intro button");

buttonIntro.onclick = function () {
    section.style.display="block";
    createExam.style.display="block";
    intro.style.cssText="display:none;";
    navSide.style.display="none";
    uploadStart.style.display="none";
};



// control the visibility of all the section parts

window.onload = function(){
    // intro.style.display="none";
    uploadStart.style.display="none";
    createExam.style.display="none";
}

// control the visibility of the side bar
navBarI.onclick = function() {
        if(navBarI.classList.contains("true")){
            navSide.style.transform = "translateX(0%)";
            navSide.style.display="flex";
            navBarI.classList.replace("true","false");
            section.style.cssText = "display:none";
        }else{
            navSide.style.transform = "translateX(-100%)";
            navSide.style.display="none";
            navBarI.classList.replace("false","true");
            section.style.cssText = "display:block";
        }
    }
    
    
    // show upload direct exams section after clicking on it
    uploadExam.addEventListener("click" , () => {
        intro.style.cssText="display:none;";
        navSide.style.display="none";
        section.style.display="block";
        uploadStart.style.display="block";
        createExam.style.display="none";
    });

    // show create exams section after clicking on it
    mcqExam.addEventListener("click" , () => {
        section.style.display="block";
        createExam.style.display="block";
        intro.style.cssText="display:none;";
        navSide.style.display="none";
        uploadStart.style.display="none";
    });
    
    
    let globalExamInformation = document.querySelector(".createExam .globalExamInformations");
    
    let myForm = document.querySelector(".globalExamInformations form");
    
    
    function generateUniqueLink() {
        const randomString = Math.random().toString(36).substring(2, 10);
        return `https://phantomschool.com/exam/${randomString}`;
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
    
    localStorage.setItem("examInfo" , JSON.stringify(examInfo));
    localStorage.setItem("link of exam" , spanLink.innerHTML);


    fetch("serverName", { // ajouter le server Ici @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(examInfo),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        // Generate and display the link only after the server confirms the save
    })
    .catch((error) => {
        alert("There was a problem sending data to the server!");
        console.error("Error", error);
    });

});
























































 // start exam form section

//  let examForm = document.querySelector(".createExam form");

//  let questionBlock = document.querySelector("form .questionContainer");

//  let addQuestionButton = document.querySelector(".buttons button.addQuestion");


//  var questionTotal = 1;
//  addQuestionButton.addEventListener("click" , ()=>{
//      if (questionTotal>10){
//          alert("you can only add 10 question!");
//          return;
//      }
//      let div = document.createElement('div');
//      div.className = "questionBlock";
//      div.innerHTML = `
//          <label for="question">Question ${questionTotal}</label><br>
//          <input type="text" name="question${questionTotal}" id="question" required><br><br>
//          <label for="choices">Choices</label>
//          <input type="text" name="choice${questionTotal}_1" placeholder="choice 1" required><br><br>
//          <input type="text" name="choice${questionTotal}_2" placeholder="choice 2" required><br><br>
//          <input type="text" name="choice${questionTotal}_3" placeholder="choice 3"><br><br>
//          <input type="text" name="choice${questionTotal}_4" placeholder="choice 4"><br><br>
//          <div class="answerAndDuration">
//              <div class="duration">
//                  <label for="duration">Duration</label><br>
//                  <input type="number" name="duration${questionTotal}" id="duration" min="10" max="30">
//              </div>
//              <div class="answer">
//                  <label for="answer">Correct Answer</label><br>
//                  <select name="answer${questionTotal}" id="answer">
//                      <option value="1">1</option>
//                      <option value="2">2</option>
//                      <option value="3">3</option>
//                      <option value="4">4</option>
//                  </select>
//              </div>
//          </div><br>
//      `;
//      questionBlock.appendChild(div);
//      questionTotal++;
//  });



//  let buttonSubmit = document.querySelector("form div.buttons button[type='submit']");


//  buttonSubmit.addEventListener("click" , async (event) => {
//      event.preventDefault();

//      if(questionTotal<=3 || questionTotal>10){
//          alert("you should add at least 3 questions !");
//          return;
//      }

//      let examTitle = document.getElementById("testName").value;
//      let questions = [] ;
    
//      for(let i = 1 ; i < questionTotal ; i++){
//          let questionText = document.querySelector(`input[name='question${i}']`).value;
//          let choich_1 = document.querySelector(`input[name='choice${i}_1']`).value;
//          let choich_2 = document.querySelector(`input[name='choice${i}_2']`).value;
//          let choich_3 = document.querySelector(`input[name='choice${i}_3']`).value || '';
//          let choich_4 = document.querySelector(`input[name='choice${i}_4']`).value || '';
//          let duration = document.querySelector(`input[name='duration${i}']`).value;
//          let correctAnswer = document.querySelector(`select[name='answer${i}']`).value;

//          questions.push({
//              question : questionText,
//              choices : [choich_1 , choich_2 , choich_3 , choich_4],
//              questionDuration : parseInt(duration),
//              answer : correctAnswer
//          });
//      }
    
//      const examData = {
//          title : examTitle,
//          question : questions
//      };
    
//      console.log("Submiting exam :" , examData);


//  });

 
 
 
 // end exam form section
 
