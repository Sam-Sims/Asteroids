var ship;
var asteroids = [];
var lasers = [];
var score = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship();
  for (var i = 0; i < 5; i++){
    asteroids.push(new Asteroid());
  }
}

function draw() {
  background(0);
  for (var i = 0; i < asteroids.length; i++){
    if (ship.hits(asteroids[i])){
      ship.destroy();
    }
    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edges();
  }

  for (var i = lasers.length-1; i >= 0; i--){
    lasers[i].render();
    lasers[i].update();
    if (lasers[i].offscreen()){
      lasers.splice(i, 1);
    }
    else{
      for (var j = asteroids.length-1; j >= 0; j--){
        if(lasers[i].hits(asteroids[j])){
          if(asteroids[j].r > 10){
            var newAsteroids = asteroids[j].breakup();
            asteroids = asteroids.concat(newAsteroids);
          }
          asteroids.splice(j, 1);
          lasers.splice(i, 1);
          score += 10;
          break;
        }
      }
    }
  }

  ship.render();
  ship.turn();
  ship.update();
  ship.edges();
  textSize(32);
  fill(50);
  text(str(score), 10, 30);
}

function keyReleased(){
  if (keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW)
    ship.setRotation(0);
  if (keyCode === UP_ARROW) {
    ship.boosting(false);
  }
}

function keyPressed(){
  if (key === " "){
    lasers.push(new laser(ship.pos, ship.heading));
  }
  else if (keyCode === RIGHT_ARROW){
    ship.setRotation(0.075);
  }
  else if (keyCode === LEFT_ARROW){
    ship.setRotation(-0.075);
  }
  else if (keyCode === UP_ARROW){
    ship.boosting(true);
  }
}
