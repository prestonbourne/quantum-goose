function setup() {
  const { innerWidth, innerHeight } = window;
  createCanvas(innerWidth, innerHeight);

}

function draw() {

  /**
   * For some reason instantiating the GooseManager class outside of the draw function
   * throws an undefined error.
   * Something to do with p5.js magic, It's a small memory leak but it's fine unless we start to see 
   * performance issues.
   */
  const gooseManager = new GooseManager({
    numGeese: 13,
  });
  gooseManager.render();

}
