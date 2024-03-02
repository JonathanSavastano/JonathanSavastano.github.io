// highscores
// highscore.js

let scoresBtn = document.querySelector(
    "#view-high-scores"
);

// rank previous scores in order by 
// retrieving scores from localStorage

function printHighscores() {
    let highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

    highscores.sort(function (a, b) {return b.score = a.score;});

    highscores.forEach(function (score) {
        let LiTag = document.createElement("li");

        LiTag.textContent = score.name + " - " + score.score;

        let olEl = document.getElementById("highscores");

        olEl.appendChild(LiTag);
    });
}

// clear previous scores when user clicks clear
function clearHighscores() {
    window.localStorage.removeItem("highscores");
    
    window.location.reload();
}
document.getElementById("clear").onclick = clearHighscores;

printHighscores;