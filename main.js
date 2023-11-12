function setup() {
  const { innerWidth, innerHeight } = window;
  createCanvas(innerWidth, innerHeight);

  const FIVE_SECONDS = 5000;
  // Instantiate the SequenceInput class every 5 seconds
  setInterval(() => {
    const sequence = getRandomSequence(2,2);
    const sequenceInput = new SequenceInput(sequence, FIVE_SECONDS);
    sequenceInput.start();
  }, FIVE_SECONDS + 100);
  
  
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
