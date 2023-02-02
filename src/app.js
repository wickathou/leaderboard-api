// game id S7kVdYcJIymZZTmBFEM0

// fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/S7kVdYcJIymZZTmBFEM0/scores/')
//     .then(response => console.log(response.body));

// fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/S7kVdYcJIymZZTmBFEM0/scores/')
//   .then(response => response.json())
//   .then(json => console.log(json));

export const userRegex = /^[a-zA-Z0-9]{0,30}$/;
export const scoreRegex = /^[1-9][0-9]{0,2}$/;

const loadingOn = (btn, loading) => {
  loading.classList.add('spinner-border')
  btn.disabled = true
}

const loadingOff = (btn, loading) => {
  loading.classList.remove('spinner-border')
  btn.disabled = false
}

const validInput = (inputField) => {
  inputField.classList.remove('not-valid')
  inputField.classList.add('valid')
}

const notvalidInput = (inputField) => {
  inputField.classList.remove('valid')
  inputField.classList.add('not-valid')
}

export const inputFieldCheck = (inputField, regex) => {
  inputField.addEventListener('change', (e) => {
    inputValidation(inputField, regex)
  })
}

const inputValidation = (inputField, regex, response = false) => {
  let answer
  if (regex.test(inputField.value)) {
    validInput(inputField)
    answer = true
  } else {
    notvalidInput(inputField)
    answer = false
  }
  if (response) {
    return answer
  }
}

export const getScores = async (btn,loading,callback) => {
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
    if ((inputValidation(userData, userRegex, true) && inputValidation(scoreData, scoreRegex, true)) && (scoreData.value >= 10 || scoreData.value <= 999)) {
      loadingOn(btn, loading)
      await callback(userData.value, scoreData.value).then((res) => {
        userData.value = ''
        scoreData.value = ''
        console.log(res);
      }).catch((error) => {
        console.log(error);
      })
      loadingOff(btn, loading)
    } else {
      console.log('No user or score');
    }
  })
}