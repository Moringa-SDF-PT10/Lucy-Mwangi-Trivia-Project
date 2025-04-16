
// fetch('https://opentdb.com/api.php?amount=1&category=9')
  //.then(response => response.json())
  //.then(data => {
    //const questions = data.results;
    //console.log("Trivia Questions:", questions);

    //questions.forEach((q, index) => {
      //console.log(`${index + 1}. ${q.question}`);
   // const container = document.getElementById("quiz-container");
    //const paragraphs = container.getElementsByTagName("p"); // gets a list of all <p> inside #content
    //paragraphs[0].innerText = questions[0].question;
    //});
  //})


  
  //paragraphs[0].innerText = "myQuestion";
  //This function fetches data from an API
function fetchQuizData() {
  return fetch("https://opentdb.com/api.php?amount=1")
    .then((response) => response.json());
}

// 2️⃣ This function updates the question text
function updateQuizUI(data1) {
  const questionText = data1.results[0].question;
  const container = document.getElementById("quiz-container");
  const paragraphs = container.getElementsByTagName("p");
  //if (paragraphs.length > 0) {
    paragraphs[0].innerHTML = questionText;
 // }
}
/*
// 2️⃣ This function  updates the Answers
//function updateResponsesUI(data1) {
  const questionText = data1.results[0].question;

  const allAnswers = [];
  allAnswers[0]=data1.results[0].correct_answer
  allAnswers[1]=data1.results[0].incorrect_answers[0]
  allAnswers[2]=data1.results[0].incorrect_answers[1]
  allAnswers[3]=data1.results[0].incorrect_answers[2]


  const container = document.getElementById("quiz-container");
  //const paragraphs = container.getElementsByTagName("input");
  for (let i = 0; i < allAnswers.length; i++) {
    const label = document.querySelector('label[for="rb' + i + '"]');
    if (label) {
      label.innerHTML = allAnswers[i]; // or newTexts[i]
    }
  }
 
  label.innerHTML = allAnswers[0];

  //if (paragraphs.length > 0) {
    paragraphs[1].innerHTML =allAnswers[0];
 // }
    paragraphs[2].innerHTML =allAnswers[1];
    paragraphs[3].innerHTML =allAnswers[2];
    paragraphs[4].innerHTML =allAnswers[3];
}
*/


function updateResponsesUI(data) {
  const result = data.results[0];
 
  const correctAnswer = result.correct_answer;
  const incorrectAnswers = result.incorrect_answers;
  const allAnswers = [];
 
// Combine all answers into one array
  allAnswers.push(correctAnswer);
  for (let i = 0; i < incorrectAnswers.length; i++) {
	allAnswers.push(incorrectAnswers[i]);
  }
   // or  Using the spread operator:    const allAnswers = [correctAnswer, ...incorrectAnswers];
 
  // Shuffle the answers (optional for now)
  allAnswers.sort(() => Math.random() - 0.5);
 
  // Create the radio buttons and the labels
  // Clear previous options
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
 
  // Create one radio button for each answer
  for (let i = 0; i < allAnswers.length; i++) {
    const answer = allAnswers[i];
 
    // Create input element
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "quiz-option";
    input.value = answer;
    input.id = "option" + i;
 
    // Create label element
    const label = document.createElement("label");
    label.htmlFor = input.id;
    label.innerHTML = answer;
 
    // Add radio and label to the options div
    optionsDiv.appendChild(input);
    optionsDiv.appendChild(label);
    optionsDiv.appendChild(document.createElement("br")); // Line break
  }
}


document.getElementById("start-btn").addEventListener("click", function () {
  fetchQuizData().then((data) => {
    updateQuizUI(data);
    
    updateResponsesUI(data);
  });
  document.getElementById("quiz-container").className = "normal";
 
});


document.getElementById("next-btn").addEventListener("click", function () {
  fetchQuizData().then((data) => {
    updateQuizUI(data);
    updateResponsesUI(data);
  });
  
});







  