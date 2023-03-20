import Quiz from "./quiz.js";

class setting {
  constructor() {
    this.settingDom = document.querySelector(".Settings");
    this.quizDom = document.querySelector(".quiz");
    this.categoryDom = document.querySelector("#category");
    this.nQuestions = document.querySelector("#nQuestions");
    this.startBtn = document.querySelector("#start");
    this.difficulty = [
      // document.querySelector("#all"),
      document.querySelector("#easy"),
      document.querySelector("#medium"),
      document.querySelector("#hard"),
    ];
    this.quiz = {};
    this.startBtn.addEventListener("click", this.startQuizApp);
  }
  startQuizApp = async () => {
    try {
      const amount = this.getAmount();
      const categoryID = this.categoryDom.value;
      const difficulty = this.getDifficulty();

      const url = `https://opentdb.com/api.php?amount=${amount}&category=${categoryID}&difficulty=${difficulty}`;
      let { results } = await this.fetchData(url);

      this.quiz = new Quiz(this.quizDom, amount, results);
      this.toggleElements();
    } catch (error) {
      alert(error);
    }
  };

  fetchData = async (url) => {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  };

  toggleElements = () => {
    this.quizDom.style.display = "block";
    this.settingDom.style.display = "none";
  };

  getAmount = () => {
    const amount = this.nQuestions.value;
    if (amount > 0 && amount <= 100) {
      return amount;
    } else {
      alert(
        "please enter the correct number of questions.\n number of questions must be between 1 and 100"
      );
    }
  };

  getDifficulty = () => {
    const difficulty = this.difficulty.filter((item) => item.checked);
    if (difficulty.length === 1) {
      return difficulty[0].id;
    } else {
      alert("please select the difficulty of questions.");
    }
  };
}

export default setting;
