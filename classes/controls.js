/**
 * @fileoverview Contains classes for the controls of the game, ie when the user types in the gate
 * right now it's just a sequence of random characters.
 * 
 * @todo - This can be broken up into multiple files. There's likely going to be a lot of code here. When we add a class for managing 
 * Sound and Music
 * - @prestonbourne
 */
 


const ANIMATION_DURATION_MS = 250;

class GameManager{
  /**
   * @constructor
   * @param {}
   */
  constructor(){
    
  }

  victory(){
  }

  gameOver(){

  }

  start(){

  }

}

class Sound {
/**
 * @constructor
 * @param {Object} VictorySound 
 * @param {Object} LoseSound 
 */
constructor(victory, lose){
  this.victory = victory
  this.lose = lose
}

playVictory(){
  if (this.VictorySound.isPlaying()) {
    this.VictorySound.stop();
  } else {
    this.VictorySound.play();
  }
}

playLose(){
  if (this.LoseSound.isPlaying()) {
    this.LoseSound.stop();
  } else {
    this.LoseSound.play();
  }
}

}
  
class SequenceInput extends GameManager {
  /**
   * Creates a new Controls instance.
   * @constructor
   * @param {string} sequence - The sequence that the user needs to enter.
   * @param {number} duration - The duration in milliseconds that the user has to enter the sequence.
   * @param {Object} sound - The honk sound goose make when goose turn into quantum goose
   */
  constructor(sequence, duration) {
    super(sequence,duration)
    this.sequence = sequence;
    this.duration = duration;
    this.currentPhase = 0;
    this.timer = null;
    this.input = "";
    this.sound = new Sound()
    /**
     * @todo(@prestonbourne) - Add support for callbacks so that we can do something when the user succeeds or fails.
     */
    this.onSuccess = null;
    this.onError = null;
    this.view = new SequenceView({
      message: `Enter the following sequence within ${
        this.duration / 1000
      } seconds: ${this.sequence}`,
      sound: this.sound
      
    });
  }

  start() {
    console.log(
      `Enter the following sequence within ${this.duration} seconds: ${this.sequence}`
    );

    this.timer = setTimeout(() => {
      console.log("Time is up!");
      this.#stop();
      this.view.failure();
      if (this.onError) {
        this.onError("Time is up!");
      }
    }, this.duration);
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  #stop() {
    clearTimeout(this.timer);
    this.view.failedAttempts +=1;
    document.removeEventListener("keydown", this.handleKeyDown.bind(this));
  }

  handleKeyDown = (event) => {
  
    // ignore modifier keys
    if (event.metaKey || event.ctrlKey || event.altKey) {
      return;
    }
    const { key } = event;
    if (!isAlnumChar(key)) {
      return;
    }

    this.view.addText(key);
    if (key !== this.sequence[this.currentPhase]) {
      this.view.failure();
      console.error(
        `Error: Expected ${
          this.sequence[this.currentPhase]
        }, but received ${key}`
      );
      this.#stop();

      if (this.onError) {
        this.onError(
          `Expected ${
            this.sequence[this.currentPhase]
          }, but received ${key}`
        );
      }
    } else {
      this.input += key;
      this.currentPhase++;
      if (this.currentPhase === this.sequence.length) {
        this.view.success();
        console.log(this.view.successAttempts)
        this.#stop();
        if (this.onSuccess) {
          this.onSuccess(this.sound);
        }
      }
    }
  };
}

/**
 * Represents a prompt that displays a message for a specified duration.
 * @class
 */
class SequenceView extends GameManager {
  /**
   * Creates a new SequencePrompt object.
   * @constructor
   * @param {Object} options - The options for the prompt.
   * @param {string} options.message - The message to display in the prompt.
   */
  constructor({ message = "", sound}) {
    super(message, sound)
    this.message = message;
    this.promptBox = document.createElement("div");
    this.promptBox.classList.add("sequence-view");
    this.promptBox.innerText = this.message;

    this.promptBox.appendChild(document.createElement("br"));
    this.charBox = document.createElement("div");
    this.charBox.classList.add("sequence-view__char-box");
    this.promptBox.appendChild(this.charBox);
    this.promptBox.appendChild(this.charBox);
    this.sound = sound
    this.failedAttempts=0;
    this.successAttempts=0;
    document.body.appendChild(this.promptBox);
  }

  addText(text) {
    this.charBox.innerText += text;
  }

  success() {
    this.promptBox.style.backgroundColor = "lime";
    this.successAttempts ++;
    console.log(this.successAttempts)
    setTimeout(() => {
      this.promptBox.remove();
      if (this.sound.isPlaying()) {
        // .isPlaying() returns a boolean
        this.sound.stop();
      } else {
        this.sound.play();
      }
    }, ANIMATION_DURATION_MS);
  }

  failure() {
    this.promptBox.style.backgroundColor = "red";
    this.promptBox.classList.add("shake");
    this.failedAttempts ++;
    this.checkStatus();
    setTimeout(() => {
      this.promptBox.remove();
    }, ANIMATION_DURATION_MS);
    
  }

  checkStatus(){
    // console.log(this.failedAttempts)
    // if(this.failedAttempts >=4){
    //   return sceneNum = 4
    // }
    if(this.successAttempts ==3){
      return sceneNum = 5
    }
  }

}
