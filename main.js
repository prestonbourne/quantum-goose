

function setup() {
  const { innerWidth, innerHeight } = window;
  createCanvas(innerWidth, innerHeight);
}

function draw() {
  const goose = new Goose('red', 12, 12);
  background(0);
  fill(255);
  rect(10, 10, 50, 50);
  goose.render();
}
