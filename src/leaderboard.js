import Score from './scores.js';

const scoresUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/S7kVdYcJIymZZTmBFEM0/scores/';

export default class Leaderboard {
  constructor(listElement) {
    this.scoreList = [];
    this.count = 0;
    this.listElement = listElement;
  }

  #addToDom = (scoreElement) => {
    this.listElement.appendChild(scoreElement);
  }

  #clearDom = () => {
    this.listElement.innerHTML = '';
  }

  addData = async (user, score) => {
    try {
      const res = await fetch(scoresUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user,
          score,
        }),
      });
      const data = res.json();
      this.refreshList();
      return data.result;
    } catch (error) {
      return error;
    }
  }

  getData = async () => {
    try {
      const res = await fetch(scoresUrl);
      const data = await res.json();
      return data.result;
    } catch (error) {
      return error;
    }
  }

  #sortList = (list) => {
    list.sort((a, b) => b.score - a.score);
  }

  refreshList = async () => {
    const listData = await this.getData();
    this.#sortList(listData);
    this.scoreList = [];
    this.count = 0;
    listData.forEach((entry) => {
      this.count += 1;
      this.scoreList.push(new Score(entry.user, entry.score, this.count));
    });
    this.#clearDom();
    this.generateDOM();
  }

  scoreEntryDOM = (entry) => {
    const li = document.createElement('li');
    li.classList = 'list-group-item d-flex justify-content-between align-items-start';
    li.id = `score-${entry.position}`;
    li.innerHTML = `
      <span class="col-2">${entry.position}</span>
      <div class="col-8">
        <h4>${entry.user}</h4>
      </div>
      <span class="col-2 badge bg-primary rounded-pill">${entry.score}</span>`;
    return li;
  }

  generateDOM = () => {
    for (let i = 0; i < this.scoreList.length && i < 10; i += 1) {
      this.#addToDom(this.scoreEntryDOM(this.scoreList[i]));
    }
  }
}