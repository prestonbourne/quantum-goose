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
    const sequenceInput = new SequenceInput(sequence, FOUR_SECONDS);
    sequenceInput.onSuccess = () => {
      console.log("Success!");
      gooseManager.entangle();
    };
    sequenceInput.start();
  }, FOUR_SECONDS + 500);

  gooseManager = new GooseManager({
    numGeese: 13,
  });
}

function draw() {
  background(255);

  gooseManager.render();
}
