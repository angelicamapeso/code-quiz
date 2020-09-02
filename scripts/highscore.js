//Highscores
const HIGHSCORE_TABLE = document.getElementById("highscores-table");
const CLEAR_HIGHSCORE_BTN = document.getElementById("clear-highscores");

updateTable();

function updateTable() {
  let highscores = localStorage.getItem("scoreList");

  if (highscores) {
    highscores = JSON.parse(highscores);

    highscores.forEach(function(scoreItem, index) {
      const tableRow = document.createElement('tr');
    
      const rank = document.createElement('td');
      rank.textContent = `#${index + 1}`;
    
      const score = document.createElement('td');
      score.textContent = scoreItem.score;
    
      const initials = document.createElement('td');
      initials.textContent = scoreItem.intials;
    
      tableRow.appendChild(rank);
      tableRow.appendChild(score);
      tableRow.appendChild(initials);
    
      HIGHSCORE_TABLE.appendChild(tableRow);
    });
  } else {
    while (HIGHSCORE_TABLE.children.length > 1) {
      HIGHSCORE_TABLE.removeChild(HIGHSCORE_TABLE.lastChild);
    }
  }
}

CLEAR_HIGHSCORE_BTN.addEventListener('click', function(){
  let emptyHighscores = [];
  localStorage.setItem('scoreList', emptyHighscores);
  updateTable();
});
