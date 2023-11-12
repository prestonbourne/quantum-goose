class SequenceInput {
  constructor(sequence, duration) {
    this.sequence = sequence;
    this.duration = duration;
    this.currentPhase = 0;
    this.timer = null;
    this.input = "";
    /**
     * @prestonbourne
     * @todo - Add supoort for callbacks so that we can do something when the user succeeds or fails.
     */
    this.onSuccess = null;
    this.onError = null;
    this.view = new SequenceView({
      message: `Enter the following sequence within ${
        this.duration / 1000
      } seconds: ${this.sequence}`,
    });
  }

  start() {
    console.log(
      `Enter the following sequence within ${this.duration} seconds: ${this.sequence}`
    );

    this.timer = setTimeout(() => {
      console.log("Time is up!");
      this.#stop();
      this.view.remove();
      if (this.onError) {
        this.onError("Time is up!");
      }
    }, this.duration);
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  #stop() {
    clearTimeout(this.timer);
    document.removeEventListener("keydown", this.handleKeyDown.bind(this));
  }

  handleKeyDown = (event) => {
    const inputChar = event.key;

    // Ignore non-alphanumeric characters
    if (!isAlnum(inputChar)) {
      return;
    }

    this.view.addText(inputChar);
    if (inputChar !== this.sequence[this.currentPhase]) {
      this.view.failure();
      console.error(
        `Error: Expected ${
          this.sequence[this.currentPhase]
        }, but received ${inputChar}`
      );
      this.#stop();

      if (this.onError) {
        this.onError(
          `Expected ${
            this.sequence[this.currentPhase]
          }, but received ${inputChar}`
        );
      }
    } else {
      this.input += inputChar;

      this.currentPhase++;
      if (this.currentPhase === this.sequence.length) {
        this.view.success();

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
class SequenceView {
  /**
   * Creates a new SequencePrompt object.
   * @constructor
   * @param {Object} options - The options for the prompt.
   * @param {string} options.message - The message to display in the prompt.
   * 
   * @liz435
   * @todo Move styles to a stylesheet and use classes instead of inline styles.
   */
  constructor({ message = "" }) {

    this.message = message;
    this.promptBox = document.createElement("div");
    this.promptBox.classList.add("sequence-view");
    this.promptBox.innerText = this.message;

    this.promptBox.appendChild(document.createElement("br"));
    this.charBox = document.createElement("div");
    this.charBox.classList.add("sequence-view__char-box");
    this.promptBox.appendChild(this.charBox);
    this.promptBox.appendChild(this.charBox);
    document.body.appendChild(this.promptBox);
  }

  addText(text) {
    this.charBox.innerText += text;
  }

  success() {
    this.promptBox.style.backgroundColor = "lime";
    setTimeout(() => {
      this.promptBox.remove();
    }, 250);
  }

  failure() {
    this.promptBox.style.backgroundColor = "red";
    setTimeout(() => {
      this.promptBox.remove();
    }, 250);
  }
  remove() {
    this.promptBox.remove();
  }
}
