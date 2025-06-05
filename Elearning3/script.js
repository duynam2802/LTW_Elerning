// Quiz Application

// Data model for questions and quizzes
class Quiz {
  constructor(id, title, questions = []) {
    this.id = id;
    this.title = title;
    this.questions = questions;
  }
}

class Question {
  constructor(id, text, options, correctAnswerIndex) {
    this.id = id;
    this.text = text;
    this.options = options;
    this.correctAnswerIndex = correctAnswerIndex;
  }
}

// Utility functions
function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

function saveQuiz(quiz) {
  const quizzes = getQuizzes();
  const existingIndex = quizzes.findIndex(q => q.id === quiz.id);
  
  if (existingIndex >= 0) {
    quizzes[existingIndex] = quiz;
  } else {
    quizzes.push(quiz);
  }
  
  localStorage.setItem('quizzes', JSON.stringify(quizzes));
}

function getQuizzes() {
  const quizzes = localStorage.getItem('quizzes');
  return quizzes ? JSON.parse(quizzes) : [];
}

function getQuizById(id) {
  const quizzes = getQuizzes();
  return quizzes.find(q => q.id === id);
}

function calculateResults(quiz, answers) {
  const correctQuestions = quiz.questions.filter(
    (question, index) => parseInt(answers[index]) === parseInt(question.correctAnswerIndex)
  );
  
  return {
    quizId: quiz.id,
    score: correctQuestions.length,
    totalQuestions: quiz.questions.length,
    answers,
    correctQuestions: correctQuestions.map(q => q.id),
  };
}

// DOM Elements
const screens = {
  home: document.getElementById('home-screen'),
  create: document.getElementById('create-screen'),
  questions: document.getElementById('questions-screen'),
  quizList: document.getElementById('quiz-list-screen'),
  takeQuiz: document.getElementById('take-quiz-screen'),
  results: document.getElementById('results-screen')
};

// Navigation between screens
function showScreen(screenId) {
  Object.values(screens).forEach(screen => {
    screen.classList.remove('active');
  });
  screens[screenId].classList.add('active');
}

// Current state variables
let currentQuiz = null;
let currentQuestionIndex = 0;
let quizQuestions = [];
let questionCount = 0;
let userAnswers = [];

// Event Listeners - Home Screen
document.getElementById('create-new-btn').addEventListener('click', () => {
  showScreen('create');
});

document.getElementById('view-quizzes-btn').addEventListener('click', () => {
  displayQuizzes();
  showScreen('quizList');
});

// Event Listeners - Create Quiz Form
document.getElementById('quiz-form').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const title = document.getElementById('quiz-title').value.trim();
  questionCount = parseInt(document.getElementById('question-count').value);
  
  if (!title || questionCount <= 0) {
    alert('Please enter a valid title and number of questions.');
    return;
  }
  
  // Initialize a new quiz
  currentQuiz = new Quiz(generateId(), title, []);
  quizQuestions = [];
  currentQuestionIndex = 0;
  
  // Set up the questions screen
  document.getElementById('quiz-title-display').textContent = `Creating: ${title}`;
  updateQuestionFormProgress();
  resetQuestionForm();
  
  showScreen('questions');
});

// Event Listeners - Question Form
document.getElementById('prev-question').addEventListener('click', () => {
  saveCurrentQuestion();
  currentQuestionIndex--;
  updateQuestionFormProgress();
  loadQuestionData();
});

document.getElementById('next-question').addEventListener('click', () => {
  if (!validateQuestionForm()) return;
  
  saveCurrentQuestion();
  currentQuestionIndex++;
  
  if (currentQuestionIndex >= questionCount) {
    currentQuestionIndex = questionCount - 1;
    return;
  }
  
  updateQuestionFormProgress();
  resetQuestionForm();
});

document.getElementById('finish-quiz').addEventListener('click', () => {
  if (!validateQuestionForm()) return;
  
  saveCurrentQuestion();
  
  // Save the complete quiz
  currentQuiz.questions = quizQuestions;
  saveQuiz(currentQuiz);
  
  alert('Quiz created successfully!');
  showScreen('home');
});

// Quiz List Screen
document.getElementById('back-to-home').addEventListener('click', () => {
  showScreen('home');
});

// Results Screen
document.getElementById('retake-quiz').addEventListener('click', () => {
  startQuiz(currentQuiz.id);
});

document.getElementById('back-to-home-from-results').addEventListener('click', () => {
  showScreen('home');
});

// Helper functions for question form
function updateQuestionFormProgress() {
  const progressText = `Question ${currentQuestionIndex + 1} of ${questionCount}`;
  document.getElementById('progress-indicator').textContent = progressText;
  
  // Update button states
  document.getElementById('prev-question').disabled = currentQuestionIndex === 0;
  
  if (currentQuestionIndex === questionCount - 1) {
    document.getElementById('next-question').style.display = 'none';
    document.getElementById('finish-quiz').style.display = 'block';
  } else {
    document.getElementById('next-question').style.display = 'block';
    document.getElementById('finish-quiz').style.display = 'none';
  }
}

function resetQuestionForm() {
  document.getElementById('question-text').value = '';
  document.querySelectorAll('.option-input').forEach(input => {
    input.value = '';
  });
  document.getElementById('correct-answer').value = '';
}

function validateQuestionForm() {
  const questionText = document.getElementById('question-text').value.trim();
  if (!questionText) {
    alert('Please enter a question.');
    return false;
  }
  
  const options = [];
  let emptyOptions = false;
  
  document.querySelectorAll('.option-input').forEach(input => {
    const value = input.value.trim();
    if (!value) {
      emptyOptions = true;
    }
    options.push(value);
  });
  
  if (emptyOptions) {
    alert('Please fill in all options.');
    return false;
  }
  
  const correctAnswer = document.getElementById('correct-answer').value;
  if (!correctAnswer) {
    alert('Please select the correct answer.');
    return false;
  }
  
  return true;
}

function saveCurrentQuestion() {
  if (currentQuestionIndex >= quizQuestions.length) {
    // Create a new question
    const questionText = document.getElementById('question-text').value.trim();
    const options = Array.from(document.querySelectorAll('.option-input')).map(input => input.value.trim());
    const correctAnswerIndex = document.getElementById('correct-answer').value;
    
    const newQuestion = new Question(generateId(), questionText, options, correctAnswerIndex);
    quizQuestions.push(newQuestion);
  } else {
    // Update existing question
    const question = quizQuestions[currentQuestionIndex];
    question.text = document.getElementById('question-text').value.trim();
    question.options = Array.from(document.querySelectorAll('.option-input')).map(input => input.value.trim());
    question.correctAnswerIndex = document.getElementById('correct-answer').value;
  }
}

function loadQuestionData() {
  if (currentQuestionIndex < quizQuestions.length) {
    const question = quizQuestions[currentQuestionIndex];
    document.getElementById('question-text').value = question.text;
    
    document.querySelectorAll('.option-input').forEach((input, index) => {
      input.value = question.options[index];
    });
    
    document.getElementById('correct-answer').value = question.correctAnswerIndex;
  }
}

// Display quizzes in the list
function displayQuizzes() {
  const quizzesContainer = document.getElementById('quizzes-container');
  const quizzes = getQuizzes();
  
  if (quizzes.length === 0) {
    quizzesContainer.innerHTML = `
      <div class="empty-state">
        <p>You haven't created any quizzes yet.</p>
        <button id="create-first-quiz" class="btn btn-primary">Create Your First Quiz</button>
      </div>
    `;
    
    document.getElementById('create-first-quiz').addEventListener('click', () => {
      showScreen('create');
    });
    return;
  }
  
  let quizzesHTML = '';
  quizzes.forEach(quiz => {
    quizzesHTML += `
      <div class="quiz-item">
        <div>
          <div class="quiz-item-title">${quiz.title}</div>
          <div class="quiz-item-info">${quiz.questions.length} questions</div>
        </div>
        <div class="button-group">
          <button class="btn btn-primary take-quiz-btn" data-id="${quiz.id}">Take Quiz</button>
          <button class="btn btn-danger delete-quiz-btn" data-id="${quiz.id}">Delete</button>
        </div>
      </div>
    `;
  });
  
  quizzesContainer.innerHTML = quizzesHTML;
  
  // Add event listeners to the dynamically created buttons
  document.querySelectorAll('.take-quiz-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const quizId = e.target.getAttribute('data-id');
      startQuiz(quizId);
    });
  });
  
  document.querySelectorAll('.delete-quiz-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const quizId = e.target.getAttribute('data-id');
      if (confirm('Are you sure you want to delete this quiz?')) {
        deleteQuiz(quizId);
        displayQuizzes();
      }
    });
  });
}

function deleteQuiz(quizId) {
  const quizzes = getQuizzes();
  const updatedQuizzes = quizzes.filter(quiz => quiz.id !== quizId);
  localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
}

// Taking a quiz
function startQuiz(quizId) {
  currentQuiz = getQuizById(quizId);
  if (!currentQuiz) return;
  
  currentQuestionIndex = 0;
  userAnswers = new Array(currentQuiz.questions.length).fill(null);
  
  displayQuizQuestion();
  showScreen('takeQuiz');
}

function displayQuizQuestion() {
  const question = currentQuiz.questions[currentQuestionIndex];
  
  document.getElementById('taking-quiz-title').textContent = currentQuiz.title;
  document.getElementById('quiz-progress').textContent = `Question ${currentQuestionIndex + 1} of ${currentQuiz.questions.length}`;
  document.getElementById('current-question').textContent = question.text;
  
  const optionsContainer = document.getElementById('options-container');
  optionsContainer.innerHTML = '';
  
  question.options.forEach((option, index) => {
    const isSelected = userAnswers[currentQuestionIndex] === index;
    const optionElement = document.createElement('div');
    optionElement.className = `option ${isSelected ? 'selected' : ''}`;
    optionElement.setAttribute('data-index', index);
    optionElement.textContent = option;
    
    optionElement.addEventListener('click', () => {
      document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
      optionElement.classList.add('selected');
      userAnswers[currentQuestionIndex] = index;
    });
    
    optionsContainer.appendChild(optionElement);
  });
  
  // Update navigation buttons
  document.getElementById('prev-quiz-question').disabled = currentQuestionIndex === 0;
  
  if (currentQuestionIndex === currentQuiz.questions.length - 1) {
    document.getElementById('next-quiz-question').style.display = 'none';
    document.getElementById('submit-quiz').style.display = 'block';
  } else {
    document.getElementById('next-quiz-question').style.display = 'block';
    document.getElementById('submit-quiz').style.display = 'none';
  }
}

// Taking quiz event listeners
document.getElementById('prev-quiz-question').addEventListener('click', () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    displayQuizQuestion();
  }
});

document.getElementById('next-quiz-question').addEventListener('click', () => {
  if (userAnswers[currentQuestionIndex] === null) {
    alert('Please select an answer before proceeding.');
    return;
  }
  
  if (currentQuestionIndex < currentQuiz.questions.length - 1) {
    currentQuestionIndex++;
    displayQuizQuestion();
  }
});

document.getElementById('submit-quiz').addEventListener('click', () => {
  if (userAnswers[currentQuestionIndex] === null) {
    alert('Please select an answer before submitting.');
    return;
  }
  
  const hasUnanswered = userAnswers.includes(null);
  if (hasUnanswered) {
    const confirmSubmit = confirm('You have unanswered questions. Are you sure you want to submit?');
    if (!confirmSubmit) return;
  }
  
  showResults();
});

function showResults() {
  const results = calculateResults(currentQuiz, userAnswers);
  
  // Update results screen
  document.getElementById('score-value').textContent = results.score;
  document.getElementById('total-questions').textContent = results.totalQuestions;
  
  const percentage = Math.round((results.score / results.totalQuestions) * 100);
  document.getElementById('score-percentage').textContent = `${percentage}%`;
  
  const breakdownContainer = document.getElementById('results-breakdown');
  breakdownContainer.innerHTML = '';
  
  currentQuiz.questions.forEach((question, index) => {
    const userAnswerIndex = userAnswers[index];
    const isCorrect = parseInt(userAnswerIndex) === parseInt(question.correctAnswerIndex);
    
    const resultItem = document.createElement('div');
    resultItem.className = 'result-item';
    
    resultItem.innerHTML = `
      <div class="result-question">${index + 1}. ${question.text}</div>
      <div class="result-status ${isCorrect ? 'status-correct' : 'status-incorrect'}">
        ${isCorrect ? 'Correct' : 'Incorrect'}
      </div>
      <div class="result-answer">
        Your answer: ${userAnswerIndex !== null ? question.options[userAnswerIndex] : 'No answer'}
      </div>
      <div class="result-answer">
        Correct answer: ${question.options[question.correctAnswerIndex]}
      </div>
    `;
    
    breakdownContainer.appendChild(resultItem);
  });
  
  showScreen('results');
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  showScreen('home');
});