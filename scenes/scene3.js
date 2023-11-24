// function scene3() {
//     background("skyblue");
//     fill("white");
//     text("Scene 3: Measurement Minigame", width/2, height/2);
// }

//need to add delay in between each small scenes, add QG image/or swarm boids code to replace the current circle, add CG image.
//also need to integrate with other code.

let evasionScene = 0;
let safe = false;
let goose1;
let areas = [];
let areasNum = 4;
let areaImg1;
let timer = 5;

function setup() {
  createCanvas(600, 600);
  goose1 = new Goose();
  for (let i = 0; i < areasNum; i++) {
    areas[i] = new Areas(random(width - 100), random(height - 100), random(1, 3), areaImg1);
  }
}

function draw() {
  background(220);
  goose1.display();
  goose1.move();
  areas[evasionScene].display();
  goose1.checkCollision(evasionScene);

  // Timer countdown
  textAlign(CENTER, CENTER);
  textSize(100);
  text(timer, width / 2, height / 2);

  if (frameCount % 60 == 0 && timer > 0) {
    timer--;
  }

  if (timer == 0) {
    if (safe) {
      text("NEXT ROUND", width / 2, height * 0.7);
      evasionScene++;
    } else {
      text("FAILED", width / 2, height * 0.7);
      evasionScene = 0;
    }
    timer = 5;
  }

  if (evasionScene == 4) {
    text('YAY You won.', width / 2, height / 2);
    //sceneNum++;
  }
}

class Areas {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = random(70, 100);
    this.h = random(70, 100);
  }

  display() {
    rect(this.x, this.y, this.w, this.h);
  }
}

class Goose {
  constructor() {
    this.x = 200;
    this.y = 200;
    this.d = 50;
  }

  display() {
    circle(this.x, this.y, this.d);
  }

  move() {
    if (keyIsDown(83)) this.y += 3;
    if (keyIsDown(87)) this.y -= 3;
    if (keyIsDown(65)) this.x -= 3;
    if (keyIsDown(68)) this.x += 3;
  }

  checkCollision(scene) {
    let currentArea = areas[scene];
    if (
      this.x - this.d / 2 > currentArea.x &&
      this.x + this.d / 2 < currentArea.x + currentArea.w &&
      this.y - this.d / 2 > currentArea.y &&
      this.y + this.d / 2 < currentArea.y + currentArea.h
    ) {
      safe = true;
    }
  }
}
