class Counter {
  constructor() {
    this.count = 0;
  }

  resetCount() {
    this.count = 0;
  }

  incrementCount() {
    this.count += 1;
  }

  currentCount() {
    return this.count;
  }
}

const getHighScore = function() {
  return parseInt(document.getElementById("high_count").innerHTML, 10);
};

const setHighScore = function(str) {
  document.getElementById("high_count").innerHTML = str;
};

const getCurrentScore = function() {
  return parseInt(document.getElementById("current_count").innerHTML, 10);
};

const setCurrentScore = function(str) {
  document.getElementById("current_count").innerHTML = str;
};

const replaceHighScoreChecker = function() {
  const highScore = getHighScore();
  const currentScore = getCurrentScore();
  if (currentScore > highScore) {
    setHighScore(currentScore);
  }
};

// counter to increase
const myCounter = new Counter();
const startCounter = setInterval(() => {
  myCounter.incrementCount();
  setCurrentScore(myCounter.currentCount());
}, 50);
