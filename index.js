
  //This function fetches data from an API
function fetchQuizData() {
  return fetch("https://opentdb.com/api.php?amount=1")
    .then((response) => response.json());
}

//  This function updates the question text
function updateQuizUI(data1) {
  const questionText = data1.results[0].question;
  const container = document.getElementById("quiz-container");
  const paragraphs = container.getElementsByTagName("p");
  //if (paragraphs.length > 0) {
    paragraphs[0].innerHTML = questionText;
 // }
}

//This function updates the answers

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
  
 
  // Create the radio buttons and the labels
  
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







  