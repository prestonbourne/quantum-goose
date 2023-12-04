/**
 * @fileoverview
 * This file contains all the classes related to the geese.
 * @todo - Add support for multiple difficulty levels.
 * - @prestonbourne
 */

class Goose {
  /**
   * Creates a new instance of the Goose class.
   * @constructor
   * @param {string} color - The color of the goose.
   * @param {number} x - The x-coordinate of the goose.
   * @param {number} y - The y-coordinate of the goose.
   */
  constructor(color, x, y, classic) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.classic = classic
    this.size = 50;
    
  }

  /**
   * Renders the goose on the canvas. Must be called in
   * the p5.js {@linkcode draw} function.
   */
  render() {
    // fill(this.color);
    // image(this.classic,this.x, this.y);
    ellipse(this.x, this.y, this.size,this.size)
  }
}

class GooseManager {
  /**
   * Creates a new instance of Goose.
   * @constructor
   * @param {Object} options - The options object.
   * @param {number} [options.numGeese=7] - The number of geese.
   * @param {Flock} [options.flocker] - Handles the flocking behavior of the entangled geese.
   * @param {string} [options.playerColor='blue'] - The color of the player.
   * @param {string} [options.gooseColor='gray'] - The color of the geese.
   * @param {string} [options.leaderColor='red'] - The color of the leader goose.
   * @param {number} [options.gooseSize=50] - The width of the geese.
   * @param {number} [options.x=0] - The x coordinate of the geese.
   * @param {number} [options.y=0] - The y coordinate of the geese.
   * @param {boolean} [options.debug=false] - Whether or not to render debug information.
   */
  constructor({
    numGeese = 9,
    flocker,
    playerColor = "blue",
    gooseColor = "gray",
    leaderColor = "red",
    gooseSize = 50,
    x = 0,
    y = 0,
    debug = false,
    img,
    classic
  }) {
    if (numGeese < 1) throw new Error("numGeese must be greater than 0");
    if (numGeese % 2 === 0) throw new Error("numGeese must be an odd number");

    this.flocker = flocker;
    this.numGeese = numGeese;
    this.playerColor = playerColor;
    this.gooseColor = gooseColor;
    this.leaderColor = leaderColor;
    this.gooseSize = gooseSize;
    this.x = x;
    this.y = y;
    this.debug = debug;

    this.playerGoose = null;
    this.leaderGoose = null;
    this.leftGeese = [];
    this.rightGeese = [];
    this.entangledGeese = [];
    this.img = img
    this.classic = classic

    this.#init();
  }

  #init() {
    const geesePerSide = Math.floor(this.numGeese / 2);
    const gooseSpacing = 0;
    const formationWidth =
      (this.numGeese + 1) * (this.gooseSize + gooseSpacing);
    const formationHeight =
      (geesePerSide + 2) * (this.gooseSize + gooseSpacing);
    const formationX = (width -formationWidth) /2 ;
    const formationY = (height - formationHeight) /2;

    if (this.debug) {
      fill("pink");
      rect(formationX, formationY, formationWidth, formationHeight);
    }


    
    /* 
    Place leader goose first so that:
    1. it's on top of the other geese 
    2. their position is based on the leader
    */
    const leaderX = formationWidth / 2 + formationX;
    const leaderY = gooseSpacing * 3 + formationY;
    this.leaderGoose = new Goose(this.leaderColor, leaderX, leaderY, this.classic);
    for (let i = 0; i < geesePerSide; i++) {
      const spacing = (i + 1) * (this.gooseSize + gooseSpacing);
      const leftGooseX = leaderX - spacing;
      const rightGooseX = leaderX + spacing;
      const gooseY = leaderY + spacing;

      // render right side of formation, but leaves one space for the player
      const hasToRenderPlayer = i === geesePerSide - 1;
      if (hasToRenderPlayer) {
        console.log(this.gooseSize)
    
        
        this.playerGoose = new Boid({
          color: 'red',
          x: leftGooseX,
          y: gooseY,
          size: this.gooseSize,

        });
        this.flocker.addBoid(this.playerGoose);
      } else {
        const leftGoose = new Goose(this.gooseColor, leftGooseX, gooseY, this.classic);
        this.leftGeese.push(leftGoose);
      }

      const rightGoose = new Goose(this.gooseColor, rightGooseX, gooseY,this.classic) ;
      this.rightGeese.push(rightGoose);
    }
  }

  entangle() {
    // this.playerGoose.entangle();

    if (this.leftGeese.length === 0 && this.rightGeese.length === 0) {
      console.error("No more geese to entangle");
      return;
    }

    // get reference to the next goose
    const hasMoreLeftGeese = this.leftGeese.length > 0;
    const gooseList = hasMoreLeftGeese ? this.leftGeese : this.rightGeese;

    // remove goose from the array
    let nextGooseToEntagle = gooseList.pop();
    const { x, y } = nextGooseToEntagle;


    const entangledGoose = new Boid({
      x,
      y,
      size: this.gooseSize,
      color: this.playerColor,
      img: this.img
    });

    this.flocker.addBoid(entangledGoose);
    this.entangledGeese.push(entangledGoose);
  }



  // shortestPath() {

  //   let closestLeftGooseElement = null;
  //   let closestLeftGooseElementDistance;
  //   console.log(this.leftGeese)
  //   this.leftGoose.forEach(()=>{
  //     const distance = Math.abs(this.playerGoose.position.x - element.x);
  //     if (distance < closestLeftGooseElementDistance) {
  //       closestLeftGooseElement = element;
  //       closestLeftGooseElementDistance = distance;
  //     }
  //   })
  

  //   let closestRightGooseElement = null;
  //   let closestRightGooseElementDistance = Infinity;
    
  //   this.rightGoose.forEach(()=>{
  //     const distance = Math.abs(this.playerGoose.position.x - element.x);
  //     if (distance < closestRightGooseElementDistance) {
  //       closestRightGooseElement = element;
  //       closestRightGooseElementDistance = distance;
  //     }
  //   })
  
  //   const closestLeftGooseDistance = Math.abs(this.playerGoose.position.x - closestLeftGooseElement.x);
  //   const closestRightGooseDistance = Math.abs(this.playerGoose.position.x - closestRightGooseElement.x);
  
  //   if (closestLeftGooseDistance < closestRightGooseDistance) {
  //     return closestLeftGooseElement;
  //   } else if (closestLeftGooseDistance > closestRightGooseDistance) {
  //     return closestRightGooseElement;
  //   } else { // Both geese are equidistant from the player goose
  //     return Math.random() < 0.5 ? closestLeftGooseElement : closestRightGooseElement; // Randomly choose one of the elements
  //   }
  // }
  

  ////



  render() {
    this.flocker.run();
    this.leaderGoose.render();
    this.leftGeese.forEach((goose) => goose.render());
    this.rightGeese.forEach((goose) => goose.render());
    this.entangledGeese.forEach((goose) => goose.render());
    this.playerGoose.render();
  }
}

class PlayerGoose extends Goose {
  constructor(color, x, y) {
    super(color, x, y);
  }

  entangle() {
    console.log("entangle");
  }
}

class EntangledGoose extends Goose {
  constructor(color, x, y) {
    super(color, x, y);
    this.originX = x;
    this.originY = y;
  }
  render() {
    fill(this.color);
    /**
     * @todo
     * apply the boids algorithm to the entangled geese
     * for now they'll just do a funky dance
     * - @prestonbourne
     */
    const JITTER = 10;
    this.x = random(this.originX - JITTER, this.originX + JITTER);
    this.y = random(this.originY - JITTER, this.originY + JITTER);
    ellipse(this.x, this.y, this,size, this.size);
  }
}
