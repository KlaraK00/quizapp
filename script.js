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
        "rightAnswer": 3
    },
    {
        "question": "Welche Kurkuma-Kombination hilft dem Körper bei Aufnahme des Wirkstoffes Curcumin?",
        "answer1": "Kurkuma mit Avocado",
        "answer2": "Kurkuma mit Vollkorntoast",
        "answer3": "Kurkuma mit Zitrone",
        "answer4": "Kurkuma mit Pfeffer",
        "rightAnswer": 3
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
        "question": "Was mit Pancakes (100g Zucker) kombinieren, damit der Blutzuckerspiegel nicht so viel in die Höhe rast?",
        "answer1": "Noch mehr Zucker in Form von Karamell DAVOR zu sich nehmen.",
        "answer2": "Zuckerwatte essen, durch die Luft verringert sich die Zuckeraufnahme innerhalb der nächsten 3 Stunden.",
        "answer3": "Pankcakes schneller essen, dadurch bekommt der Körper Stress. Stress ist immer gut.",
        "answer4": "Beeren dazu, denn sie besitzen sekundäre Pflanzenstoffe, Ballaststoffe und andere Inhaltsstoffe, die den Effekt ausgleichen.",
        "rightAnswer": 4
    }
];


let currentQuestion = 0;


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
}


function answer(selection) {
    let question = questions[currentQuestion];
    let rightAnswer = question['rightAnswer'];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer${rightAnswer}`;

    if (selectedQuestionNumber == rightAnswer) {
        console.log('Richtige Anwort!!');
        document.getElementById(selection).parentElement.classList.add('bg-success');
    } else {
        console.log('Falsche Antwort!!');
        document.getElementById(selection).parentElement.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentElement.classList.add('bg-success');
    }

    document.getElementById('nextButton').disabled = false;
}