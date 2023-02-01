import './style.scss';
import getScores from "./app.js";
import Leaderboard from './leaderboard.js';



const getScoresBtn = document.getElementById('get-scores')
const loadingScores = document.getElementById('get-scores-loading')
const leaderboardTable = document.getElementById('leaderboard-entries')

const leaderboardData = new Leaderboard(leaderboardTable)

leaderboardData.refreshList()

getScores(getScoresBtn, loadingScores)
