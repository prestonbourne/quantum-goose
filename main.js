function setup() {
  const { innerWidth, innerHeight } = window;
  createCanvas(innerWidth, innerHeight);
}

function draw() {

  background(255);

  new GooseManager({
    debug: true,
    numGeese: 3,
  }).render();

}
