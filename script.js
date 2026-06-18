const questions = [
    {
        question: "¿Cuánto es 5 + 3?",
        options: ["6", "7", "8", "9"],
        correct: 2
    },
    {
        question: "¿Cuánto es 12 - 4?",
        options: ["6", "7", "8", "9"],
        correct: 2
    },
    {
        question: "¿Cuánto es 3 × 4?",
        options: ["10", "11", "12", "13"],
        correct: 2
    },
    {
        question: "¿Cuánto es 20 ÷ 4?",
        options: ["4", "5", "6", "7"],
        correct: 1
    },
    {
        question: "¿Cuál es el siguiente número: 2, 4, 6, 8, ...?",
        options: ["9", "10", "11", "12"],
        correct: 1
    },
    {
        question: "¿Cuánto es 15 + 25?",
        options: ["35", "40", "45", "50"],
        correct: 1
    },
    {
        question: "¿Cuánto es 9 × 2?",
        options: ["16", "17", "18", "19"],
        correct: 2
    },
    {
        question: "¿Cuánto es 100 - 30?",
        options: ["60", "65", "70", "75"],
        correct: 2
    },
    {
        question: "¿Cuántos lados tiene un triángulo?",
        options: ["2", "3", "4", "5"],
        correct: 1
    },
    {
        question: "¿Cuánto es 7 × 7?",
        options: ["47", "48", "49", "50"],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;
let canAnswer = true;

function startGame() {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('question-screen').classList.remove('hidden');
    document.getElementById('question-screen').classList.add('visible');
    currentQuestion = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    canAnswer = true;
    const question = questions[currentQuestion];
    document.getElementById('question').textContent = question.question;
    
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option';
        button.textContent = option;
        button.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(button);
    });

    document.getElementById('feedback').style.display = 'none';
    
    // Actualizar barra de progreso
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';
    
    // Iniciar temporizador
    timeLeft = 15;
    updateTimer();
    timer = setInterval(() => {
        timeLeft--;
        updateTimer();
        if (timeLeft <= 0) {
            clearInterval(timer);
            timeUp();
        }
    }, 1000);
}

function updateTimer() {
    const timerElement = document.getElementById('timer');
    timerElement.textContent = timeLeft;
    if (timeLeft <= 5) {
        timerElement.classList.add('warning');
    } else {
        timerElement.classList.remove('warning');
    }
}

function selectAnswer(index) {
    if (!canAnswer) return;
    canAnswer = false;
    clearInterval(timer);

    const question = questions[currentQuestion];
    const options = document.querySelectorAll('.option');
    
    options.forEach((option, i) => {
        option.onclick = null;
        if (i === question.correct) {
            option.classList.add('correct');
        } else if (i === index && index !== question.correct) {
            option.classList.add('incorrect');
        }
    });

    const feedback = document.getElementById('feedback');
    if (index === question.correct) {
        score++;
        feedback.textContent = '¡Correcto! 🎉';
        feedback.className = 'feedback correct';
    } else {
        feedback.textContent = 'Incorrecto 😢';
        feedback.className = 'feedback incorrect';
    }
    feedback.style.display = 'block';

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showFinalScreen();
        }
    }, 2000);
}

function timeUp() {
    if (!canAnswer) return;
    canAnswer = false;

    const question = questions[currentQuestion];
    const options = document.querySelectorAll('.option');
    
    options.forEach((option, i) => {
        option.onclick = null;
        if (i === question.correct) {
            option.classList.add('correct');
        }
    });

    const feedback = document.getElementById('feedback');
    feedback.textContent = '¡Tiempo agotado! ⏰';
    feedback.className = 'feedback incorrect';
    feedback.style.display = 'block';

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showFinalScreen();
        }
    }, 2000);
}

function showFinalScreen() {
    document.getElementById('question-screen').classList.add('hidden');
    document.getElementById('final-screen').classList.remove('hidden');
    document.getElementById('final-screen').classList.add('visible');
    
    document.getElementById('final-score').textContent = score + '/10';
    
    let message = '';
    if (score === 10) {
        message = '¡Excelente! Eres un genio de las matemáticas 🌟';
    } else if (score >= 7) {
        message = '¡Muy bien! Tienes buenos conocimientos matemáticos 👍';
    } else if (score >= 5) {
        message = '¡Bien hecho! Sigue practicando para mejorar 💪';
    } else {
        message = '¡No te rindas! La práctica hace al maestro 📚';
    }
    document.getElementById('final-message').textContent = message;
}

function restartGame() {
    document.getElementById('final-screen').classList.add('hidden');
    document.getElementById('start-screen').classList.remove('hidden');
    document.getElementById('start-screen').classList.add('visible');
}
