import Final from "./final.js";
import Question from "./question.js";

class Quiz {
  constructor(quizElement, amount, questions) {
    this.quizElement = quizElement;
    this.currentElement = document.querySelector(".current");
    this.totalElement = document.querySelector(".total");
    this.finalElement = document.querySelector(".final");
    this.nextBtn = document.querySelector("#next");

    this.totalAmount = amount;
    this.answerAmount = 0;

    this.questions = this.setQuestion(questions);
    this.nextBtn.addEventListener("click", this.nextQuestion);
    this.renderQuestion();
  }

  setQuestion(questions) {
    return questions.map((question) => new Question(question));
  }

  renderQuestion() {
    this.questions[this.answerAmount].render();
    this.currentElement.innerHTML = this.answerAmount + 1;
    this.totalElement.innerHTML = this.totalAmount;
  }

  nextQuestion = () => {
    const ckechElement = this.questions[
      this.answerAmount
    ].answerElements.filter((ele) => ele.firstChild.checked);
    if (ckechElement.length == 0) {
      alert("Check Element");
    } else {
      this.questions[this.answerAmount].answer(ckechElement);
      this.answerAmount++;
      this.answerAmount < this.totalAmount
        ? this.renderQuestion()
        : this.endQuizApp();
    }
  };

  endQuizApp() {
    this.quizElement.style.display = "none";
    this.finalElement.style.display = "block";
    const correct = this.countCorrectAnswers();
    new Final(correct, this.totalAmount);
  }

  countCorrectAnswers() {
    let count = 0;
    this.questions.forEach((element) => {
      if (element.isCorrect) {
        count++;
      }
    });
    return count;
  }
}

export default Quiz;
