let questions = [
    {
        "question": "Welches Vitamin ist fettlöslich?",
        "answer1": "Vitamin B12",
        "answer2": "Vitamin K",
        "answer3": "Vitamin C",
        "answer4": "Vitamin B2",
        "rightAnswer": 2
    },
    {
        "question": "Welches Vitamin ist förderlich für die Eisenaufnahme?",
        "answer1": "Vitamnin C",
        "answer2": "Vitamin A",
        "answer3": "Vitamin B12",
        "answer4": "Vitamin B6",
        "rightAnswer": 1
    },
    {
        "question": "Welches Lebensmittel beinhaltet über 500 mg Magnesium pro 100 Gramm?",
        "answer1": "Vollkornprodukte",
        "answer2": "Kürbiskerne",
        "answer3": "Nüsse",
        "answer4": "Kakao",
        "rightAnswer": 2
    },
    {
        "question": "Welche Kurkuma-Kombination hilft dem Körper bei Aufnahme des Wirkstoffes Curcumin?",
        "answer1": "Kurkuma mit Avocado",
        "answer2": "Kurkuma mit Vollkorntoast",
        "answer3": "Kurkuma mit Zitrone",
        "answer4": "Kurkuma mit Pfeffer",
        "rightAnswer": 4
    },
    {
        "question": "Welches Lebensmittel wirkt antibakteriell und entzündungshemmend?",
        "answer1": "Schokolade",
        "answer2": "Schlagobers",
        "answer3": "Ingwer",
        "answer4": "Mohr im Hemd",
        "rightAnswer": 3
    },
    {
        "question": "Was kann man mit Pancakes kombinieren, damit der Blutzuckerspiegel nicht so schnell nach oben geht?",
        "answer1": "Noch mehr Zucker in Form von Karamell DAVOR zu sich nehmen.",
        "answer2": "Zuckerwatte essen, durch die Luft verringert sich die Zuckeraufnahme innerhalb der nächsten 3 Stunden.",
        "answer3": "Pankcakes schneller essen, dadurch bekommt der Körper Stress. Stress ist immer gut.",
        "answer4": "Beeren dazu, denn sie besitzen sekundäre Pflanzenstoffe, Ballaststoffe und andere Inhaltsstoffe, die den Effekt ausgleichen.",
        "rightAnswer": 4
    }
];


let currentQuestion = 0;
let whichQuestionIsIt = 1;
let rightAnswers = 0;
let audioWrongAnswer = new Audio('./mp3/wrongAnswer.mp3');
let audioRightAnswer = new Audio('./mp3/rightAnswer.mp3');
let audioStartGame = new Audio('./mp3/startGame.mp3');
let audioEndOfGame = new Audio('./mp3/endOfGame.mp3');


function init() {
    document.getElementById('allQuestions').innerHTML = questions.length;
    showQuestion();
}


function showQuestion() {
    let question = questions[currentQuestion];
    let questiontext = document.getElementById('questiontext');
    questiontext.innerHTML = '';
    questiontext.innerHTML = question['question'];
    document.getElementById('answer1').innerHTML = question['answer1'];
    document.getElementById('answer2').innerHTML = question['answer2'];
    document.getElementById('answer3').innerHTML = question['answer3'];
    document.getElementById('answer4').innerHTML = question['answer4'];
    document.getElementById('whichQuestion').innerHTML = whichQuestionIsIt;
}


function answer(selection) {
    let question = questions[currentQuestion];
    let rightAnswer = question['rightAnswer'];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer${rightAnswer}`;

    if (selectedQuestionNumber == rightAnswer) {
        document.getElementById(selection).parentElement.classList.add('bg-success');
        rightAnswers++;
        audioStartGame.pause();
        audioStartGame.currentTime = 0;
        audioRightAnswer.pause();
        audioRightAnswer.currentTime = 0;
        audioWrongAnswer.pause();
        audioWrongAnswer.currentTime = 0;
        audioRightAnswer.play();
    } else {
        document.getElementById(selection).parentElement.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentElement.classList.add('bg-success');
        audioStartGame.pause();
        audioStartGame.currentTime = 0;
        audioRightAnswer.pause();
        audioRightAnswer.currentTime = 0;
        audioWrongAnswer.pause();
        audioWrongAnswer.currentTime = 0;
        audioWrongAnswer.play();
    }

    document.getElementById('nextButton').disabled = false;
}

function nextQuestion() {
    if (whichQuestionIsIt >= 6) {
        audioRightAnswer.pause();
        audioRightAnswer.currentTime = 0;
        audioWrongAnswer.pause();
        audioWrongAnswer.currentTime = 0;
        audioEndOfGame.play();

        currentQuestion++;
        let percent = currentQuestion / questions.length;
        percent = Math.round(percent * 100);
        document.getElementById('progressBar').style = `width: ${percent}%;`;
        document.getElementById('progressBar').innerHTML = `${percent}%`;

        document.getElementById('cardBody2').style = 'display: none';
        document.getElementById('cardBody1').style = '';
        document.getElementById('cardBody3').style = '';
        document.getElementById('endscreenButton').style = '';
        document.getElementById('headerImg').src = 'img/endScreenImg.jpg';
        document.getElementById('amountOfRightAnswers').innerHTML = rightAnswers;
        document.getElementById('amountOfAllAnswers').innerHTML= whichQuestionIsIt;
        
    } else {
        currentQuestion ++;
        whichQuestionIsIt++;
        let percent = currentQuestion / questions.length;
        percent = Math.round(percent * 100);
        document.getElementById('nextButton').disabled = true;
        document.getElementById('progressBar').style = `width: ${percent}%;`;
        document.getElementById('progressBar').innerHTML = `${percent}%`;

        resetAnswerButtons();
        showQuestion();
    }
}

function resetAnswerButtons() {
    document.getElementById('answer1').parentElement.classList.remove('bg-danger');
    document.getElementById('answer1').parentElement.classList.remove('bg-success');
    document.getElementById('answer2').parentElement.classList.remove('bg-danger');
    document.getElementById('answer2').parentElement.classList.remove('bg-success');
    document.getElementById('answer3').parentElement.classList.remove('bg-danger');
    document.getElementById('answer3').parentElement.classList.remove('bg-success');
    document.getElementById('answer4').parentElement.classList.remove('bg-danger');
    document.getElementById('answer4').parentElement.classList.remove('bg-success');
}

function newGame() {
    audioEndOfGame.pause();
    audioEndOfGame.currentTime = 0;
    audioStartGame.play();
    currentQuestion = 0;
    whichQuestionIsIt = 1;
    rightAnswers = 0;

    document.getElementById('progressBar').style = '';
    document.getElementById('progressBar').innerHTML = '';

    document.getElementById('cardBody2').style = '';
    document.getElementById('cardBody1').style = 'display: none';
    document.getElementById('cardBody3').style = 'display: none';
    document.getElementById('endscreenButton').style = 'display: none';
    document.getElementById('headerImg').src = 'img/quiz.jpg';

    resetAnswerButtons();
    showQuestion();
}