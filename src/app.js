// game id S7kVdYcJIymZZTmBFEM0

// fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/S7kVdYcJIymZZTmBFEM0/scores/')
//     .then(response => console.log(response.body));



// fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/S7kVdYcJIymZZTmBFEM0/scores/')
//   .then(response => response.json())
//   .then(json => console.log(json));

const userRegex = /^\S/;
const scoreRegex = /^[1-9][0-9]{0,2}$/;

const loadingOn = (btn, loading) => {
  loading.classList.add('spinner-border')
  btn.disabled = true
}

const loadingOff = (btn, loading) => {
  loading.classList.remove('spinner-border')
  btn.disabled = false
}


export const getScores = async (btn,loading,callback) => {
  console.log(btn);
  btn.addEventListener('click', async (e) => {
    loadingOn(btn, loading)
    await callback().then((res) => {
      console.log(res);
    }).catch((error) => {
      console.log(error);
    });
    loadingOff(btn, loading)
  })
}

export const postScores = async (btn, userData, scoreData, loading, callback) => {
  btn.addEventListener('click', async (e) => {
    e.preventDefault()
    if (scoreRegex.test(scoreData.value) && userRegex.test(userData.value)) {
      loadingOn(btn, loading)
      // await callback(user, score).then((res) => {
      //   console.log(res);
      // }).catch((error) => {
      //   console.log(error);
      // })
      // loadingOff(btn, loading)
    } else {
      console.log('No user or score');
    }
  })
}