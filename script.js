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
let currentMenu = 0;
let whichQuestionIsIt = 1;
let rightAnswers = 0;
let audioWrongAnswer = new Audio('./mp3/wrongAnswer.mp3');
let audioRightAnswer = new Audio('./mp3/rightAnswer.mp3');
let audioStartGame = new Audio('./mp3/startGame.mp3');
let audioEndOfGame = new Audio('./mp3/endOfGame.mp3');


function startNow() {
    showBackground();
    showQuestion();
}

function showBackground() {
    document.getElementById('startDisplay').style = 'display: none';
    document.getElementById('questionFooter').style = '';
    document.getElementById('leftSpace').style = '';
    document.getElementById('card').classList.remove('flexAuto');
    document.getElementById('card').classList.remove('startScreenBgImg');
    document.getElementById('cardBody2').style = '';
    document.getElementById('allQuestions').innerHTML = questions.length;
}

function showQuestion() {
    let question = questions[currentQuestion];
    let questiontext = document.getElementById('questiontext');
    questiontext.innerHTML = '';
    questiontext.innerHTML = question['question'];
    for (let i = 1; i < 5; i++) {
        document.getElementById(`answer${i}`).innerHTML = question[`answer${i}`];
    }
    document.getElementById('whichQuestion').innerHTML = whichQuestionIsIt;
}


function answer(selection) {
    let question = questions[currentQuestion];
    let rightAnswer = question['rightAnswer'];
    let selectedQuestionNumber = selection.slice(-1);

    resetAudioForAnswers();
    rightOrFalseAnswer(selection, selectedQuestionNumber, rightAnswer);
    buttonClickable();
}

function resetAudioForAnswers() {
    audioStartGame.pause();
    audioStartGame.currentTime = 0;
    audioRightAnswer.pause();
    audioRightAnswer.currentTime = 0;
    audioWrongAnswer.pause();
    audioWrongAnswer.currentTime = 0;
}

function rightOrFalseAnswer(selection, selectedQuestionNumber, rightAnswer) {
    if (selectedQuestionNumber == rightAnswer) {
        theRightAnswer(selection);
    } else {
        theFalseAnswer(selection);
    }
}

function theRightAnswer(selection){
    rightAnswerColor(selection);
    rightAnswerAudio();
    rightAnswerAddAmount();
}

function rightAnswerColor(selection) {
    let selectedQuestionNumber = selection.slice(-1);
    let idOfLetter = `letter${selectedQuestionNumber}`;

    document.getElementById(selection).parentElement.classList.add('bg-success');
    document.getElementById(idOfLetter).classList.add('letterBgSuccess');
}

function rightAnswerAudio() {
    audioRightAnswer.play();
}

function rightAnswerAddAmount() {
    rightAnswers++;
}

function theFalseAnswer(selection) {
    falseAnswerColor(selection);
    falseAnswerAudio();
}

function falseAnswerColor(selection) {
    let question = questions[currentQuestion];
    let rightAnswer = question['rightAnswer'];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer${rightAnswer}`;
    let idOfRightLetter = `letter${rightAnswer}`;
    let idOfLetter = `letter${selectedQuestionNumber}`;

    document.getElementById(selection).parentElement.classList.add('bg-danger');
    document.getElementById(idOfLetter).classList.add('letterBgDanger');
    document.getElementById(idOfRightAnswer).parentElement.classList.add('bg-success');
    document.getElementById(idOfRightLetter).classList.add('letterBgSuccess');
}

function falseAnswerAudio() {
    audioWrongAnswer.play(); 
}

function buttonClickable() {
    document.getElementById('nextButton').style.pointerEvents= 'auto';
    document.getElementById('nextButton').src = './img/arrowForwardLavendel.png';
    document.getElementById('circleBlack').classList.add('d-none');    
}

function nextQuestion() {
    currentQuestionAddAmount();
    nextQuestionOrEnd();
}

function currentQuestionAddAmount() {
    currentQuestion++;
}

function nextQuestionOrEnd() {
    if (whichQuestionIsIt >= 6) {
        basicEnd();
        endByScore();
    } else {
        showNextPageQuestions();
    }
}

function basicEnd() {
    resetAndPlayAudioEndscreen();
    processBar100Perc();
    basicEndBackground();
}

function endByScore() {
    if (rightAnswers < 3) {
        youAreNotSoSmart();
    } else if (rightAnswers > 4) {
        youAreSmart();
    } else {
        youAreMiddleSmart();
    }
}

function showNextPageQuestions() {
    whichQuestionIsItAddAmount();
    processBarFitPerc();
    resetAnswerButtons();
    showQuestion();
    doTheRightMenu();
}

function resetAndPlayAudioEndscreen() {
    audioRightAnswer.pause();
    audioRightAnswer.currentTime = 0;
    audioWrongAnswer.pause();
    audioWrongAnswer.currentTime = 0;
    audioEndOfGame.play();
}

function processBar100Perc() {
    let percent = currentQuestion / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById('progressBar').style = `width: ${percent}%;`;
    document.getElementById('progressBar').innerHTML = `${percent}%`;
}

function basicEndBackground() {
    document.getElementById('card').classList.add('centerCenter');
    document.getElementById('cardBody2').style = 'display: none';
    document.getElementById('cardBody1').style = '';
    document.getElementById('cardBody3').style = '';
    document.getElementById('endscreenButton').style = '';
    document.getElementById('amountOfRightAnswers').innerHTML = rightAnswers;
    document.getElementById('amountOfAllAnswers').innerHTML= whichQuestionIsIt;
    document.getElementById('questionFooter').classList.add('d-none');
    document.getElementById('leftSpace').classList.add('d-none');
}

function youAreNotSoSmart() {
    document.getElementById('brain').src = './img/brainResultRed.png';
    document.getElementById('card').classList.add('looseBackground');
}

function youAreSmart() {
    document.getElementById('brain').src = './img/brainResult.png';
    document.getElementById('card').classList.add('winnerBackground');
}

function youAreMiddleSmart() {
    document.getElementById('brain').src = './img/brainResultOrange.png';
    document.getElementById('card').classList.add('middleWinnerBackground');
}

function whichQuestionIsItAddAmount() {
    whichQuestionIsIt++;
}

function processBarFitPerc() {
    let percent = currentQuestion / questions.length;

    percent = Math.round(percent * 100);
    document.getElementById('nextButton').style.pointerEvents= 'none';
    document.getElementById('nextButton').src = './img/arrowForward.png';
    document.getElementById('circleBlack').classList.remove('d-none');
    document.getElementById('progressBar').style = `width: ${percent}%;`;
    document.getElementById('progressBar').innerHTML = `${percent}%`;
}

function resetAnswerButtons() {
    for (let i = 1; i < 5; i++) {
        document.getElementById(`answer${i}`).parentElement.classList.remove('bg-danger');
        document.getElementById(`answer${i}`).parentElement.classList.remove('bg-success');
        document.getElementById(`letter${i}`).classList.remove('letterBgSuccess');
        document.getElementById(`letter${i}`).classList.remove('letterBgDanger');
    }
}

function doTheRightMenu() {
    if (whichQuestionIsIt == 3) {
        secondMenu();
    }
    if (whichQuestionIsIt == 4) {
        thirdMenu();
    }
    if (whichQuestionIsIt == 5) {
        fourthMenu();
    }
    if (whichQuestionIsIt == 6) {
        fifthMenu();
    }
}

function secondMenu() {
    document.getElementById('menu1').classList.remove('borderLeftWhite');
    document.getElementById('menu2').classList.add('borderLeftWhite');
}

function thirdMenu() {
    document.getElementById('menu2').classList.remove('borderLeftWhite');
    document.getElementById('menu3').classList.add('borderLeftWhite');
}

function fourthMenu() {
    document.getElementById('menu3').classList.remove('borderLeftWhite');
    document.getElementById('menu4').classList.add('borderLeftWhite');   
}

function fifthMenu() {
    document.getElementById('menu4').classList.remove('borderLeftWhite');
    document.getElementById('menu5').classList.add('borderLeftWhite');  
}

function newGame() {
    resetAndPlayAudioNewGame();
    resetAllAmounts();
    resetBackground();
    resetMenu();
    resetProcessBar();
    resetArrowButton();
    resetCard();
    resetAnswerButtons();
    showQuestion();
}

function resetAndPlayAudioNewGame() {
    audioEndOfGame.pause();
    audioEndOfGame.currentTime = 0;
    audioStartGame.play();
}

function resetAllAmounts() {
    currentQuestion = 0;
    whichQuestionIsIt = 1;
    rightAnswers = 0;
}

function resetBackground() {
    document.getElementById('card').classList.remove('middleWinnerBackground');
    document.getElementById('card').classList.remove('winnerBackground');
    document.getElementById('card').classList.remove('looseBackground');
}

function resetMenu() {
    document.getElementById('menu5').classList.remove('borderLeftWhite');
    document.getElementById('menu1').classList.add('borderLeftWhite');
}

function resetProcessBar() {
    document.getElementById('progressBar').style = '';
    document.getElementById('progressBar').innerHTML = '';
}

function resetArrowButton() {
    document.getElementById('nextButton').src = './img/arrowForward.png';
    document.getElementById('circleBlack').classList.remove('d-none');
    document.getElementById('questionFooter').classList.remove('d-none');
    document.getElementById('leftSpace').classList.remove('d-none');
    document.getElementById('nextButton').style.pointerEvents= 'none';
}

function resetCard() {
    document.getElementById('card').classList.remove('centerCenter');
    document.getElementById('cardBody2').style = '';
    document.getElementById('cardBody1').style = 'display: none';
    document.getElementById('cardBody3').style = 'display: none';
    document.getElementById('endscreenButton').style = 'display: none';
}