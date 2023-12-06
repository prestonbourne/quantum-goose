/**
 * @fileoverview
 *
 * @todo - There will likely need to be some restructuring of the code in the {@linkcode setup} if we really want to hit that stretch goal of multiple difficulty levels.
 */

/**
 * Manages the geese, for some reason instantiating the GooseManager class outside of a p5.js function
 * throws an undefined error.
 * Something to do with p5.js magic, It's memory leaky but it's fine.
 * @type {GooseManager | null}
 */
let gooseManager = null;
let sequenceInput = null;
let currentPhase = 0;
let disable = false;


/**
 * The sceneNum variable indicates which scene is actively displaying in the browser
 * Scene 0: Title Screen
 * Scene 1: Instruction Screen
 * Scene 2: Entanglement Minigame
 * Scene 3: QG Abandoned, Lose + Retry Screen
 * Scene 4: Quantum Swarm, Win + Retry Screen
 * - @lees846
 */
let sceneNum = 0;
let flock
/**
 * Load and declare goose sprite images, 
 * start keeping time so the sprite is animated
 * -@lees846
 */
let gooseSprite;
let sideGoose;
let cLocation; //for cloud animations in Title Screen

let successAttempts =0;
let failedAttempts = 0;
let ledflock;

function preload(){
    sideGoose = loadImage('assets/sideGoose.png');
    cloud = loadImage('assets/quantumCloud.png');
    gooseSprite = loadImage('assets/gooseSprite.gif');
    sound = loadSound('assets/GeeseHonk.wav')
}

function setup() {

  flock = new Flock(); // Initialize the flock
  
  // Add an initial set of boids into the system
  for (let i = 0; i < 50; i++) {
    let theta = i * 2 * PI / 50;  // Calculate angle for each boid
    let radius = 300;             // Set the radius of the circle
    let x = radius * cos(theta);  // Calculate x-coordinate using parametric equation
    let y = radius * sin(theta);  // Calculate y-coordinate using parametric equation
    let b = new Boid({             // Create a new Boid object
      x: x + 700,                        // Set x-coordinate
      y: y + 400,                        // Set y-coordinate
    });
    flock.addBoid(b);              // Add the Boid to the flock
  }
  

  ledflock = new Flock();
  let bb = new Boid({
    x:700,
    y:500
  })
  ledflock.addBoid(bb);

  
  const { innerWidth, innerHeight } = window;
  createCanvas(innerWidth, innerHeight);
  imageMode(CENTER);

  cLocation = width*5;
  /**
   * @todo
   * These numbers need to change based on the difficulty level.
   * You'd likely want to create a class that handles the difficulty level
   * and then pass that into the {@linkcode SequenceInput} class.
   * - @prestonbourne
   */
  const SIX_SECONDS = 6000;
  /* Prompt the user to create a new sequence every 4.5 seconds, internally this class removes itself from the DOM after the alloted duration + some buffer time for animations. */
  setInterval(() => {
    // const MIN_SEQUENCE_LENGTH = 2;
    // const MAX_SEQUENCE_LENGTH = 6;
    const sequence = getRandomSequence();
    sequenceInput = new SequenceInput(sequence, SIX_SECONDS,sound);
    sequenceInput.onSuccess = () => {
      console.log("Success!");
      gooseManager.entangle();
    };
      sequenceInput.start()
  }, SIX_SECONDS + 500);
  const flocker = new Flock();
  gooseManager = new GooseManager({
    numGeese: 11,
    flocker
  });
}

function statCheck(){
  if(failedAttempts >=1){
    sceneNum = 3
  }

  //9
  if(successAttempts >9){
    sceneNum = 4
  }
}

/**
 * main.js should be the game manager, we shouldn't have things like background
 * in here I don't think. Each scene (now in separate files) should do its own
 * formatting, rendering, thinking, etc.
 * - @lees846
 */
function draw() {  
  statCheck()
  
  // Swich case for scenes
  switch(sceneNum){
      // Scene 0: Title Screen 
        case 0:
          titleScreen();
          disable = true
        break;

      // Scene 1: Instruction Screen
        case 1:
          scene1();
          disable = true
        break;

      // Scene 2: Entanglement Minigame
        case 2:

          disable = false;
          scene2()
          gooseManager.render();

        break;
        
      // Scene 3: QG Abandoned, Lose + Retry Screen
        case 3:
          
          disable = true
          scene3();

   
        break;
      
      // Scene 4: Quantum Swarm, Win + Retry Screen
        case 4:
          disable = true
          scene4();
 
    
        break;
    }
}