// Global variables
let totalQuestions = 0;
let correctAnswers = 0;


// This function fetches data from an API
function fetchQuizData() {
 return fetch("https://opentdb.com/api.php?amount=1")
.then((response) => response.json());
}
 

//  This function receives the data and updates the question text
function updateQuizUI(data) {
  const questionText = data.results[0].question;
 
  const container = document.getElementById("quiz-container");
  const paragraphs = container.getElementsByTagName("p");
 
  if (paragraphs.length > 0) {
    paragraphs[0].innerHTML = questionText;
  }
}
 
 
 function updateResponsesUI(data) {
  const result = data.results[0];

  const questionText = result.question;
  const correctAnswer = result.correct_answer;
  const incorrectAnswers = result.incorrect_answers;

  // Set question text
  const container = document.getElementById("quiz-container");
  const paragraphs = container.getElementsByTagName("p");
  if (paragraphs.length > 0) {
    paragraphs[0].innerHTML = questionText;
  }

   
  // Combine all answers into one array
  const allAnswers = [];
  allAnswers.push(correctAnswer);
  for (let i = 0; i < incorrectAnswers.length; i++) {
    allAnswers.push(incorrectAnswers[i]);
  }

  // Shuffle the answers 
  allAnswers.sort(() => Math.random() - 0.5);

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
    optionsDiv.appendChild(document.createElement("br")); 
  }
}


 // Listen the answer from the radiobutton and display the correct or incorrect answer
 function setupAnswerListeners(data, onAnswered) {
  const correctAnswer = data.results[0].correct_answer;
  const radios = document.querySelectorAll('input[name="quiz-option"]');
  const feedbackDiv = document.getElementById("feedback");
  
  feedbackDiv.innerHTML = ""; // clear message
  radios.forEach((radio) => {
    radio.addEventListener("change", () => {
 
      const selectedValue = radio.value;
      const selectedLabel = document.querySelector('label[for="' + radio.id + '"]');
	  
	  let isCorrect = false;

      if (selectedValue === correctAnswer) {
        selectedLabel.classList.add("correct");
		isCorrect = true;
      } else {
        selectedLabel.classList.add("incorrect");
		 // Show message with correct answer
        feedbackDiv.innerHTML = "The correct answer is: <strong>" + correctAnswer + "</strong>";

      }
	  
	  // Disable all radio buttons
      radios.forEach((r) => {
        r.disabled = true;
      });
	  
	  // Call the callback with result
      onAnswered(isCorrect);
    });
  });
}

function updateScore(isCorrect) {
  totalQuestions++;
  if (isCorrect) {
    correctAnswers++;
  }

  const scoreDiv = document.getElementById("score");
  scoreDiv.innerHTML = "Your Score: " + correctAnswers + " / " + totalQuestions;
}


 document.getElementById("start-btn").addEventListener("click", function () {
   document.getElementById("start-btn").disabled = true;
  fetchQuizData().then((data) => {
    updateQuizUI(data);
    updateResponsesUI(data);
	document.getElementById("quiz-container").className = "normal";
	setupAnswerListeners(data, updateScore)
  });
});

document.getElementById("next-btn").addEventListener("click", function () {
  fetchQuizData().then((data) => {
    updateQuizUI(data);
    updateResponsesUI(data);
	setupAnswerListeners(data, updateScore)
});
});

document.getElementById("restart-btn").addEventListener("click", function () {
  totalQuestions = 0;
  correctAnswers = 0;
  const scoreDiv = document.getElementById("score");
  scoreDiv.innerHTML = "Your Score: 0 / 0";
  fetchQuizData().then((data) => {
    updateQuizUI(data);
    updateResponsesUI(data);
	setupAnswerListeners(data, updateScore)
});
});

