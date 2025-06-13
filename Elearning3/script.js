//Cấu trúc câu hỏi
class Quiz {
  constructor(id, title, questions = []) {
    this.id = id;
    this.title = title;
    this.questions = questions;
  }
}
//Cấu trúc câu trả lời
class Question {
  constructor(id, text, options, correctAnswerIndex) {
    this.id = id;
    this.text = text;
    this.options = options;
    this.correctAnswerIndex = correctAnswerIndex;
  }
}

//Tạo id
function generateId() {
  return Math.random().toString(36).substring(2, 9);
}
//Lưu trữ quiz vào localStorage
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
// Lấy danh sách quiz từ localStorage
function getQuizzes() {
  const quizzes = localStorage.getItem('quizzes');
  return quizzes ? JSON.parse(quizzes) : [];
}
// Lấy quiz theo id
function getQuizById(id) {
  const quizzes = getQuizzes();
  return quizzes.find(q => q.id === id);
}
// Tính toán kết quả quiz
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

//Hiển thị screen
function showScreen(screenId) {
  Object.values(screens).forEach(screen => {
    screen.classList.remove('active');
  });
  screens[screenId].classList.add('active');
}

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
    alert('Vui lòng điền tiêu đề.');
    return;
  }
  
  currentQuiz = new Quiz(generateId(), title, []);
  quizQuestions = [];
  currentQuestionIndex = 0;
  
  //set up câu hỏi
  document.getElementById('quiz-title-display').textContent = `Tiều đề: ${title}`;
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
  
  //Lưu quiz
  currentQuiz.questions = quizQuestions;
  saveQuiz(currentQuiz);
  
  alert('Đã tạo thành công!');
  showScreen('home');
});

//Xem danh sách câu hỏi
document.getElementById('back-to-home').addEventListener('click', () => {
  showScreen('home');
});

//Kết quả quiz
document.getElementById('retake-quiz').addEventListener('click', () => {
  startQuiz(currentQuiz.id);
});

document.getElementById('back-to-home-from-results').addEventListener('click', () => {
  showScreen('home');
});

//Hàm xử lý câu hỏi
function updateQuestionFormProgress() {
  const progressText = `Câu ${currentQuestionIndex + 1} / ${questionCount}`;
  document.getElementById('progress-indicator').textContent = progressText;
  

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
    alert('Vui lòng điền câu hỏi.');
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
    alert('Vui lòng điền đáp án.');
    return false;
  }
  
  const correctAnswer = document.getElementById('correct-answer').value;
  if (!correctAnswer) {
    alert('Vui lòng chọn câu hỏi.');
    return false;
  }
  
  return true;
}

function saveCurrentQuestion() {
  if (currentQuestionIndex >= quizQuestions.length) {
    //Tạo câu hỏi mới
    const questionText = document.getElementById('question-text').value.trim();
    const options = Array.from(document.querySelectorAll('.option-input')).map(input => input.value.trim());
    const correctAnswerIndex = document.getElementById('correct-answer').value;
    
    const newQuestion = new Question(generateId(), questionText, options, correctAnswerIndex);
    quizQuestions.push(newQuestion);
  } else {
    //Cập nhật câu hỏi hiện tại
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

// Hiển thị danh sách quiz
function displayQuizzes() {
  const quizzesContainer = document.getElementById('quizzes-container');
  const quizzes = getQuizzes();
  
  if (quizzes.length === 0) {
    quizzesContainer.innerHTML = `
      <div class="empty-state">
        <p>Bạn chưa có bài kiểm tra nào.</p>
        <button id="create-first-quiz" class="btn btn-primary">Tạo bài đầu tiên</button>
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
          <div class="quiz-item-info">${quiz.questions.length} Câu hỏi</div>
        </div>
        <div class="button-group">
          <button class="btn btn-primary take-quiz-btn" data-id="${quiz.id}">Làm bài</button>
          <button class="btn btn-danger delete-quiz-btn" data-id="${quiz.id}">Xóa</button>
        </div>
      </div>
    `;
  });
  
  quizzesContainer.innerHTML = quizzesHTML;
  
  //Thêm sự kiện cho các nút
  document.querySelectorAll('.take-quiz-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const quizId = e.target.getAttribute('data-id');
      startQuiz(quizId);
    });
  });
  
  document.querySelectorAll('.delete-quiz-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const quizId = e.target.getAttribute('data-id');
      if (confirm('Bạn có chắc chắn muốn xóa quiz này không?')) {
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

// Bắt đầu quiz
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
  document.getElementById('quiz-progress').textContent = `Câu hỏi ${currentQuestionIndex + 1} / ${currentQuiz.questions.length}`;
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
  
  //Cập nhật trạng thái nút
  document.getElementById('prev-quiz-question').disabled = currentQuestionIndex === 0;
  
  if (currentQuestionIndex === currentQuiz.questions.length - 1) {
    document.getElementById('next-quiz-question').style.display = 'none';
    document.getElementById('submit-quiz').style.display = 'block';
  } else {
    document.getElementById('next-quiz-question').style.display = 'block';
    document.getElementById('submit-quiz').style.display = 'none';
  }
}

//Gọi sự kiện cho các nút điều hướng quiz
document.getElementById('prev-quiz-question').addEventListener('click', () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    displayQuizQuestion();
  }
});

document.getElementById('next-quiz-question').addEventListener('click', () => {
  if (userAnswers[currentQuestionIndex] === null) {
    alert('Vui long chọn một đáp án trước khi tiếp tục.');
    return;
  }
  
  if (currentQuestionIndex < currentQuiz.questions.length - 1) {
    currentQuestionIndex++;
    displayQuizQuestion();
  }
});

document.getElementById('submit-quiz').addEventListener('click', () => {
  if (userAnswers[currentQuestionIndex] === null) {
    alert('Vui lòng chọn một đáp án cho câu hỏi hiện tại trước khi nộp.');
    return;
  }
  
  const hasUnanswered = userAnswers.includes(null);
  if (hasUnanswered) {
    const confirmSubmit = confirm('Bạn có chắc chắn muốn nộp bài quiz này không? Bạn vẫn chưa trả lời tất cả các câu hỏi.');
    if (!confirmSubmit) return;
  }
  
  showResults();
});

function showResults() {
  const results = calculateResults(currentQuiz, userAnswers);
  
  // Hiển thị kết quả
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
        ${isCorrect ? 'Đúng' : 'Không đúng'}
      </div>
      <div class="result-answer">
        Đáp án của bạn: ${userAnswerIndex !== null ? question.options[userAnswerIndex] : 'Không trả lời'}
      </div>
      <div class="result-answer">
        Câu trả lời đúng: ${question.options[question.correctAnswerIndex]}
      </div>
    `;
    
    breakdownContainer.appendChild(resultItem);
  });
  
  showScreen('results');
}

// Hiển thị
document.addEventListener('DOMContentLoaded', () => {
  showScreen('home');
});