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

/**
 * Load and declare goose sprite images, 
 * start keeping time so the sprite is animated
 * -@lees846
 */
let gooseSprite;
let sideGoose;
let cLocation; //for cloud animations in Title Screen

function preload(){
    sideGoose = loadImage('assets/sideGoose.png');
    cloud = loadImage('assets/quantumCloud.png');
    gooseSprite = loadImage('assets/gooseSprite.gif');
}

function setup() {
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
  const FOUR_SECONDS = 4000;
  /* Prompt the user to create a new sequence every 4.5 seconds, internally this class removes itself from the DOM after the alloted duration + some buffer time for animations. */
  setInterval(() => {
    const MIN_SEQUENCE_LENGTH = 2;
    const MAX_SEQUENCE_LENGTH = 2;
    const sequence = getRandomSequence(
      MIN_SEQUENCE_LENGTH,
      MAX_SEQUENCE_LENGTH
    );
    const sequenceInput = new SequenceInput(sequence, FOUR_SECONDS);
    sequenceInput.onSuccess = () => {
      console.log("Success!");
      gooseManager.entangle();
    };
    sequenceInput.start();
  }, FOUR_SECONDS + 500);
  const flocker = new Flock();
  gooseManager = new GooseManager({
    numGeese: 13,
    flocker
  });
}

/**
 * main.js should be the game manager, we shouldn't have things like background
 * in here I don't think. Each scene (now in separate files) should do its own
 * formatting, rendering, thinking, etc.
 * - @lees846
 */
function draw() {  

  
  // Swich case for scenes
  switch(sceneNum){
      // Scene 0: Title Screen 
        case 0:
          titleScreen();
        break;

      // Scene 1: Instruction Screen
        case 1:
          scene1();
        break;

      // Scene 2: Entanglement Minigame
        case 2:
          scene2();
          gooseManager.render();
        break;
        
      // Scene 3: QG Abandoned, Lose + Retry Screen
        case 3:
          scene3();
        break;
      
      // Scene 4: Quantum Swarm, Win + Retry Screen
        case 4:
          scene4();
        break;
    }
}