/**
 * @fileoverview Contains classes for the controls of the game, ie when the user types in the gate
 * right now it's just a sequence of random characters.
 * 
 * @todo - This can be broken up into multiple files. There's likely going to be a lot of code here. When we add a class for managing 
 * Sound and Music
 * - @prestonbourne
 */
 


const ANIMATION_DURATION_MS = 250;


class SequenceInput {
  /**
   * Creates a new Controls instance.
   * @constructor
   * @param {string} sequence - The sequence that the user needs to enter.
   * @param {number} duration - The duration in milliseconds that the user has to enter the sequence.
   */
  constructor(sequence, duration,sound) {
    this.sequence = sequence;
    this.duration = duration;
    this.currentPhase = 0;
    this.timer = null;
    this.input = "";
    this.disable = null
    this.sound = sound
    /**
     * @todo(@prestonbourne) - Add support for callbacks so that we can do something when the user succeeds or fails.
     */
    this.onSuccess = null;
    this.onError = null;
    this.view = new SequenceView({
      message: `Enter the following sequence within ${
        this.duration / 1000
      } seconds: ${this.sequence}`,
      sound:sound
    });
  }

  start() {
    if(disable){
      this.view.promptBox.style.display = 'none'
      return
    }
    this.view.promptBox.style.display = 'block'
    console.log(
      `Enter the following sequence within ${this.duration} seconds: ${this.sequence}`
    );

    this.timer = setTimeout(() => {
      console.log("Time is up!");
      failedAttempts+=1
      this.#stop();
      this.view.failure();
      if (this.onError) {
        this.onError("Time is up!");
      }
    }, this.duration);
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  disabled(){
    disable = true;
    this.view.promptBox.remove();

  }

  #stop() {
    clearTimeout(this.timer);
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
      this.currentPhase = 0;
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
        currentPhase = 0
        this.sequence = ''
        this
        this.#stop();
        if (this.onSuccess) {
          this.onSuccess();
        }
      }
    }
  };
}

/**
 * Represents a prompt that displays a message for a specified duration.
 * @class
 */
class SequenceView{
  /**
   * Creates a new SequencePrompt object.
   * @constructor
   * @param {Object} options - The options for the prompt.
   * @param {string} options.message - The message to display in the prompt.
   */
  constructor({ message = "" ,sound}) {
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
    document.body.appendChild(this.promptBox);
  }

  addText(text) {
    // if(disable){
    //   this.promptBox.style.display = 'none'
    //   return
    // }
    // this.promptBox.style.display = 'block'
    this.charBox.innerText += text;
  }

  success() {
    this.promptBox.style.backgroundColor = "lime";
    setTimeout(() => {
      successAttempts+=1
      this.sound.play()
      this.promptBox.remove();
      this.sequence = null;
    }, ANIMATION_DURATION_MS);
  }

  failure() {
    this.promptBox.style.backgroundColor = "red";
    this.promptBox.classList.add("shake");
    setTimeout(() => {
      this.promptBox.remove();
    }, ANIMATION_DURATION_MS);
  }


}
