//
// lib/lib.js
//
var Question = function (questionObj) {
    this.value = {
      text: "Question",
      answers: []
    };
  
    this.selectedAnswer = null;
    this.html = null;
    this.questionText = null;
    this.questionAnswers = null;
    this.questionFeedback = null;
  
    this.value = Object.assign(this.value, questionObj);
  
    this.onQuestionAnswered = ({ detail }) => {
      this.selectedAnswer = {
        value: detail.answer,
        html: detail.answerHtml
      };
      this.update();
  
      document.dispatchEvent(
        new CustomEvent("question-answered", {
          detail: {
            question: this,
            answer: detail.answer
          }
        })
      );
    };
  
    this.create = function () {
      this.html = document.createElement("div");
      this.html.classList.add("question");
  
      this.questionText = document.createElement("h2");
      this.questionText.textContent = this.value.text;
  
      this.questionAnswers = document.createElement("div");
      this.questionAnswers.classList.add("answers");
  
      for (let i = 0; i < this.value.answers.length; i++) {
        const ansObj = this.value.answers[i];
        let answer = createAnswer(ansObj);
  
        answer.onclick = (ev) => {
          if (this.selectedAnswer !== null) {
            this.selectedAnswer.html.classList.remove("selected");
          }
  
          answer.classList.add("selected");
  
          this.html.dispatchEvent(
            new CustomEvent("question-answered", {
              detail: {
                answer: ansObj,
                answerHtml: answer
              }
            })
          );
        };
  
        this.questionAnswers.appendChild(answer);
      }
  
      this.questionFeedback = document.createElement("div");
      this.questionFeedback.classList.add("question-feedback");
  
      this.html.appendChild(this.questionText);
      this.html.appendChild(this.questionAnswers);
      this.html.appendChild(this.questionFeedback);
  
      this.html.addEventListener("question-answered", this.onQuestionAnswered);
  
      return this.html;
    };
  
    this.disable = function () {
      this.html.classList.add("disabled");
      this.html.onclick = (ev) => {
        ev.stopPropagation();
      };
  
      this.html.removeEventListener("question-answered", this.onQuestionAnswered);
  
      let answers = this.html.querySelectorAll(".answer");
      for (let i = 0; i < answers.length; i++) {
        let answer = answers[i];
        answer.onclick = null;
      }
    };
  
    this.remove = function () {
      let children = this.html.querySelectorAll("*");
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        this.html.removeChild(child);
      }
  
      this.html.removeEventListener("question-answered", this.onQuestionAnswered);
  
      this.html.parentNode.removeChild(this.html);
      this.html = null;
    };
  
    this.update = function () {
      let correctFeedback, incorrectFeedback;
      this.html = this.html || document.createElement("div");
  
      correctFeedback = "Bravo! Vous avez bien compris.";
      incorrectFeedback = "Oh! Pas la bonne réponse.";
  
      if (this.selectedAnswer !== null) {
        if (this.selectedAnswer.value.isCorrect) {
          this.html.classList.add("correct");
          this.html.classList.remove("incorrect");
          this.questionFeedback.innerHTML = correctFeedback;
        } else {
          this.html.classList.add("incorrect");
          this.html.classList.remove("correct");
          this.questionFeedback.innerHTML = incorrectFeedback;
        }
      }
    };
  
    function createAnswer(obj) {
      this.value = {
        text: "Answer",
        isCorrect: false
      };
  
      this.value = Object.assign(this.value, obj);
  
      this.html = document.createElement("button");
      this.html.classList.add("answer");
  
      this.html.textContent = this.value.text;
  
      return this.html;
    }
  };
  
  //
  // main.js
  //
  
  let questionsData = [
    {//1
        text: " QUE SIGNIFIE VIH ? SIDA ? ",
        answers: [
          {
            text: "Synonyme interne des aidants",
            isCorrect: false
          },
          {
            text: 'Salaire Imminent Des Adhérants"',
            isCorrect: false
          },
          {
            text: "SYNDROME D'IMMUNO DÉFICIENCE ACQUISE ",
            isCorrect: true
          },
          {
              text: "SYNDROME D'IMMUNO DÉFICIENCE AVENIR ",
              isCorrect: false
          }
        ]
      },
      {//2
        text: "Est-ce qu'on peut avoir le sida en embrassant quelqu'un ?",
        answers: [
          {
            text: "Non",
            isCorrect: true
          },
          {
            text: "Oui",
            isCorrect: false
          }
        ]
      },
    {//3
      text: "Les moustiques peuvent-ils transmettre le VIH ? ",
      answers: [
        {
          text: "Oui",
          isCorrect: false
        },
        {
          text: "Non",
          isCorrect: true
        }
      ]
    },
    {//4
      text: "Le VIH peut-il se transmettre dès qu'on est contaminé ?",
      answers: [
        {
          text: " Oui ",
          isCorrect: true
        },
        {
          text: " Non ",
          isCorrect: false
        }
      ]
    },
   
    {//5
      text: "Où faire un test de dépistage??",
      answers: [
        {
          text: "Dans un laboratoire d’analyses biologiques ou dans une Consultation de Dépistage Anonyme et Gratuit (CDAG)",
          isCorrect: true
        },
        {
          text: "Dans la rue",
          isCorrect: false
        },
        {
          text: "Chez soi",
          isCorrect: true
        },
        {
          text: "A la gare",
          isCorrect: false
        }
      ]
    },
    {//6
        text: " La transmission est-elle systématique ? ",
        answers: [
          {
            text: " Oui ",
            isCorrect: false
          },
          {
            text: 'Non',
            isCorrect: true
          }
        ]
      },
      {//7
        text: " Etre séropositif(ve) est-ce la meme chose qu'avoir le SIDA ?? ",
        answers: [
          {
            text: "Non",
            isCorrect: true
          },
          {
            text: "Oui",
            isCorrect: false
          }
        ]
      },
      {//8
        text: " C'est quoi le TPE??",
        answers: [
          {
            text: "Le Traitement Post-Exposition",
            isCorrect: true
          },
          {
            text: " Travaux personnels encadrés ",
            isCorrect: false
          },
          {
            text: " Terminal de paiement ",
            isCorrect: false
          }
        ]

      },
      {//9
          text: " La Fellation est-ce que c'est un risque ? ",
          answers: [
            {
              text: " Oui ",
              isCorrect: false
            },
            {
              text: 'Non',
              isCorrect: true
            }
          ]
        },
        {//10
          text: "Si il y'a juste un début de pénétration ?? ",
          answers: [
            {
              text: "Risque présent ",
              isCorrect: true
            },
            {
              text: "Pas de rique",
              isCorrect: false
            }
          ]
        },
  ];
  
  // variables initialization
  let questions = [];
  let score = 0,
    answeredQuestions = 0;
  let appContainer = document.getElementById("questions-container");
  let scoreContainer = document.getElementById("score-container");
  scoreContainer.innerHTML = `Score: ${score}/${questionsData.length}`;
  
  /**
   * Shuffles array in place. ES6 version
   * @param {Array} arr items An array containing the items.
   */
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  shuffle(questionsData);
  
  // creating questions
  for (var i = 0; i < questionsData.length; i++) {
    let question = new Question({
      text: questionsData[i].text,
      answers: questionsData[i].answers
    });
  
    appContainer.appendChild(question.create());
    questions.push(question);
  }
  
  document.addEventListener("question-answered", ({ detail }) => {
    if (detail.answer.isCorrect) {
      score++;
    }
  
    answeredQuestions++;
    scoreContainer.innerHTML = `Score: ${score}/${questions.length}`;
    detail.question.disable();
  
    if (answeredQuestions == questions.length) {
      setTimeout(function () {
        alert(`Quiz completed! \nFinal score: ${score}/${questions.length}`);
      }, 100);
    }
  });
  
  console.log(questions, questionsData);
  