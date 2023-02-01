// game id S7kVdYcJIymZZTmBFEM0

// fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/S7kVdYcJIymZZTmBFEM0/scores/')
//     .then(response => console.log(response.body));

fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/S7kVdYcJIymZZTmBFEM0/scores/')
  .then(response => response.json())
  .then(json => console.log(json));

const getScores = document.getElementById('get-scores')

getScores.addEventListener('click', () => {
  getScores.classList.toggle('spinner-border')
})