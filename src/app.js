export const userRegex = /^[a-zA-Z0-9]{0,30}$/;
export const scoreRegex = /^[1-9][0-9]{0,2}$/;

const loadingOn = (btn, loading) => {
  loading.classList.add('spinner-border');
  btn.disabled = true;
};

const loadingOff = (btn, loading) => {
  loading.classList.remove('spinner-border');
  btn.disabled = false;
};

const validInput = (inputField) => {
  inputField.classList.remove('not-valid');
  inputField.classList.add('valid');
};

const notvalidInput = (inputField) => {
  inputField.classList.remove('valid');
  inputField.classList.add('not-valid');
};

const inputValidator = (inputField, regex, response = false) => {
  let answer;
  if (regex.test(inputField.value)) {
    validInput(inputField);
    answer = true;
  } else {
    notvalidInput(inputField);
    answer = false;
  }
  if (response) {
    return answer;
  }
  return response;
};

export const inputFieldCheck = (inputField, regex) => {
  inputField.addEventListener('change', () => {
    inputValidator(inputField, regex);
  });
};

export const getScores = async (btn, loading, callback) => {
  btn.addEventListener('click', async () => {
    loadingOn(btn, loading);
    await callback().catch((error) => error);
    loadingOff(btn, loading);
  });
};

export const postScores = async (btn, userData, scoreData, loading, callback) => {
  btn.addEventListener('click', async (e) => {
    e.preventDefault();
    if (inputValidator(userData, userRegex, true) && inputValidator(scoreData, scoreRegex, true)) {
      loadingOn(btn, loading);
      await callback(userData.value, scoreData.value).then(() => {
        userData.value = '';
        scoreData.value = '';
      }).catch((error) => error);
      loadingOff(btn, loading);
    }
  });
};