/* eslint-disable func-style */

const createNewAsteroids = function(n) {
  return _.range(0, n).map(i => {
    return {
      id: i,
      x: getX(),
      y: getY()
    };
  });
};

const getX = function() {
  return d3.scale
    .linear()
    .domain([0, 100])
    .range([0, 700])(Math.random() * 100);
};

const getY = function() {
  return d3.scale
    .linear()
    .domain([0, 100])
    .range([0, 500])(Math.random() * 100);
};

const getSpeed = function() {
  return d3.scale
    .linear()
    .domain([0, 100])
    .range([500, 2000])(Math.random() * 100);
};

const board = d3
  .select("div.board")
  .append("svg")
  .attr("width", 700)
  .attr("height", 500);

const player = board
  .selectAll(".player")
  .data([{ cx: 300, cy: 200, r: 10 }])
  .enter()
  .append("circle")
  .attr("class", "player")
  .attr("fill", "orange")
  .attr("x", d => d.x)
  .attr("y", d => d.y);

const enemies = board
  .selectAll(".enemies")
  .data(createNewAsteroids(10), function(d) {
    return d.id;
  })
  .enter()
  .append("image")
  .attr("class", "enemies")
  .attr("xlink:href", "asteroid.png")
  .attr("height", "50px")
  .attr("width", "50px")
  .attr("y", function(d) {
    return d.y;
  })
  .attr("x", function(d) {
    return d.x;
  });

const moveEnemy = function(element) {
  element
    .transition()
    .duration(getSpeed())
    .ease("cubic-in-out")
    .attr("x", getX)
    .attr("y", getY)
    .each("end", function() {
      moveEnemy(d3.select(this));
    });
};

moveEnemy(enemies);

board.on("mousemove", function() {
  const coordinates = d3.mouse(this);

  d3.select(".player")
    .attr("cx", coordinates[0])
    .attr("cy", coordinates[1])
    .attr("r", 10);
});

const checkCollision = function() {
  let collision = false;

  enemies.each(function() {
    const eX = +d3.select(this).attr("x") + 25;
    const eY = +d3.select(this).attr("y") + 25;

    const pX = player.attr("cx");
    const pY = player.attr("cy");

    const xDelta = pX - eX;
    const yDelta = pY - eY;

    const distance = Math.sqrt(xDelta * xDelta + yDelta * yDelta);

    // player radius 10. asteroid radius 25
    if (distance < 35) {
      collision = true;
    }
  });

  if (collision) {
    board.style("background-color", "blue");
    replaceHighScoreChecker();
    myCounter.resetCount();
  } else {
    board.style("background-color", "transparent");
  }
};

d3.timer(checkCollision);
