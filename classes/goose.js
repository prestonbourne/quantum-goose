class Goose {
  constructor(color, x, y) {
    this.color = color;
    this.x = x;
    this.y = y;
  }

  render() {
    fill(this.color);
    ellipse(this.x, this.y, 80, 80);
  }
}

class GooseManager {
  /**
   * Creates a new instance of Goose.
   * @constructor
   * @param {Object} options - The options object.
   * @param {number} [options.numGeese=7] - The number of geese.
   * @param {string} [options.playerColor='blue'] - The color of the player.
   * @param {string} [options.gooseColor='gray'] - The color of the geese.
   * @param {string} [options.leaderColor='red'] - The color of the leader goose.
   * @param {number} [options.gooseSize=50] - The width of the geese.
   * @param {number} [options.x=0] - The x coordinate of the geese.
   * @param {number} [options.y=0] - The y coordinate of the geese.
   * @param {boolean} [options.debug=false] - Whether or not to render debug information.
   */
  constructor({
    numGeese = 5,
    playerColor = "blue",
    gooseColor = "gray",
    leaderColor = "red",
    gooseSize = 50,
    x = 0,
    y = 0,
    debug = false,
  }) {
    if (numGeese < 1) throw new Error("numGeese must be greater than 0");
    if (numGeese % 2 === 0) throw new Error("numGeese must be an odd number");

    this.numGeese = numGeese;
    this.playerColor = playerColor;
    this.gooseColor = gooseColor;
    this.leaderColor = leaderColor;
    this.gooseSize = gooseSize;
    this.x = x;
    this.y = y;
    this.debug = debug;
  }

  render() {
    const geesePerSide = Math.floor(this.numGeese / 2);
    const gooseSpacing = 20;
    const formationWidth = (this.numGeese + 1) * (this.gooseSize + gooseSpacing);
    const formationHeight = (geesePerSide + 2) * (this.gooseSize + gooseSpacing);
    const formationX = (width - formationWidth) / 2;
    const formationY = (height - formationWidth) / 2;

    if (this.debug) {
      fill("pink");
      rect(formationX, formationY, formationWidth, formationHeight);
    }

    /* 
    render leader goose first so that: 
        1. it's on top of the other geese 
        2. their position is based on the leader
    */
    const leaderX = formationWidth / 2 + formationX;
    const leaderY = gooseSpacing * 3 + formationY;
    const leaderGoose = new Goose(this.leaderColor, leaderX, leaderY);
    leaderGoose.render();

    
    for (let i = 0; i < geesePerSide; i++) {
      const spacing = (i + 1) * (this.gooseSize + gooseSpacing);
      const leftGooseX = leaderX - spacing;
      const rightGooseX = leaderX + spacing;
      const gooseY = leaderY + spacing;

      const leftGoose = new Goose(this.gooseColor, leftGooseX, gooseY);
      leftGoose.render();

      // render right side of formation, but leaves one space for the player
      const hasToRenderPlayer = i === geesePerSide - 1;
      if (hasToRenderPlayer) {
        const playerGoose = new Goose(this.playerColor, rightGooseX, gooseY);
        playerGoose.render();
      } else {
        const rightGoose = new Goose(this.gooseColor, rightGooseX, gooseY);
        rightGoose.render();
      }
    }
  }
}
