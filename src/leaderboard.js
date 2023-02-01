import Score from './scores.js';

const getUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/S7kVdYcJIymZZTmBFEM0/scores/'




export default class Leaderboard {
  constructor(listElement) {
    this.scoreList = []
    this.count = 0
    this.listElement = listElement
  }

  #addToDom = (scoreElement) => {
    this.listElement.appendChild(scoreElement);
  }
  
  getData = async () => {
    try {
      const res = await fetch(getUrl)
      const data = await res.json()
      return data.result
    } catch (error) {
      console.log(error);
    }
  }

  refreshList = async () => {
    const listData = await this.getData()
    console.log(listData);
    this.scoreList = []
    this.count = 0
    listData.forEach(entry => {
      this.count += 1
      this.scoreList.push(new Score(entry.user, entry.score))
    });
    console.log(this.scoreList);
    this.generateDOM()
  }

  scoreEntryDOM = (entry) => {
    const li = document.createElement('li')
    li.classList = 'list-group-item d-flex justify-content-between align-items-start';
    // li.id = `score-${score.index}`;
    li.innerHTML = 
      `
      <span class="col-2"></span>
      <div class="col-8">
        <h4>${entry.user}</h4>
      </div>
      <span class="col-2 badge bg-primary rounded-pill">${entry.score}</span>`
    return li;
  }

  generateDOM = () => {
    this.scoreList.forEach(score => {
      this.#addToDom(this.scoreEntryDOM(score))
    });
  }
}