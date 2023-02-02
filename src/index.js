import './style.scss';
import {
  getScores, postScores, inputFieldCheck, userRegex, scoreRegex,
} from './app.js';
import Leaderboard from './leaderboard.js';

const getScoresBtn = document.getElementById('get-scores');
const postScoresBtn = document.getElementById('post-scores');
const loadingScores = document.getElementById('get-scores-loading');
const postingScores = document.getElementById('post-scores-loading');
const leaderboardTable = document.getElementById('leaderboard-entries');
const newUser = document.getElementById('new-user');
const newScore = document.getElementById('new-score');

inputFieldCheck(newUser, userRegex);
inputFieldCheck(newScore, scoreRegex);

const leaderboardData = new Leaderboard(leaderboardTable);

leaderboardData.refreshList();
getScores(getScoresBtn, loadingScores, leaderboardData.refreshList);
postScores(postScoresBtn, newUser, newScore, postingScores, leaderboardData.addData);
