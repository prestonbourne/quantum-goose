let sceneNum = 2;
let flocker = null;
let gooseManager = null;
let gameManager = null;


function preload(){
  quantumGooseImg = loadImage('assets/goose.png')
  classicGooseImg = loadImage('assets/goose3.png')
  sound = loadSound('assets/GeeseHonk.wav')
}

function setup() {
  const { innerWidth, innerHeight } = window;
  createCanvas(innerWidth, innerHeight);

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
    gameManager = new GameManager()
    const sequenceInput = new SequenceInput(sequence, FOUR_SECONDS);
    sequenceInput.onSuccess = () => {
      console.log("Success!");
      console.log("this code runs");
      gameManager.successAttempt();
      gooseManager.entangle();
    };
    sequenceInput.start();
  }, FOUR_SECONDS + 500);


  flocker = new Flock();
  gooseManager = new GooseManager({
    numGeese: 7,
    flocker: flocker,
    img: quantumGooseImg,
    classic: classicGooseImg
  });
}
function draw() {
  gameManager = new GameManager()
  // gameManager.victory();
  switch (sceneNum) {
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
      // gameManager.checkStatus();
      gooseManager.render()
      // gameManager.checkStatus()
      break;

    // Scene 3: Measurement Minigame
    case 3:
      scene3();
      break;

    // Scene 4: QG Abandoned, Lose + Retry Screen
    case 4:
      scene4();
      break;

    // Scene 5: Quantum Swarm, Win + Retry Screen
    case 5:
      scene5();
      break;
      
    default:
      sceneNum = 2;
      break;
  }
}
