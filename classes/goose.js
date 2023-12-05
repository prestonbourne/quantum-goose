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
    constructor(color, x, y) {
        this.color = color;
        this.x = x;
        this.y = y;
    }

    /**
     * Renders the goose on the canvas. Must be called in
     * the p5.js {@linkcode draw} function.
     */
    render() {
        image(gooseSprite, this.x, this.y, 75, 50);
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
        numGeese = 5,
        flocker,
        playerColor = "blue",
        gooseColor = "gray",
        leaderColor = "red",
        gooseSize = 80,
        x = 0,
        y = 0,
        debug = false,
    }) {
        if (numGeese < 1) throw new Error("numGeese must be greater than 0");
        if (numGeese % 2 === 0)
            throw new Error("numGeese must be an odd number");

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

        this.#init();
    }

    #init() {
        const geesePerSide = Math.floor(this.numGeese / 2);
        const gooseSpacing = 20;
        const formationWidth =
            (this.numGeese + 1) * (this.gooseSize + gooseSpacing);
        const formationHeight =
            (geesePerSide + 2) * (this.gooseSize + gooseSpacing);
        const formationX = (width - formationWidth) / 2;
        const formationY = (height - formationHeight) / 2;

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
        this.leaderGoose = new Goose(this.leaderColor, leaderX, leaderY);

        for (let i = 0; i < geesePerSide; i++) {
            const spacing = (i + 1) * (this.gooseSize + gooseSpacing);
            const leftGooseX = leaderX - spacing;
            const rightGooseX = leaderX + spacing;
            const gooseY = leaderY + spacing;

            // render right side of formation, but leaves one space for the player
            const hasToRenderPlayer = i === geesePerSide - 1;
            if (hasToRenderPlayer) {
                this.playerGoose = new Boid({
                    color: this.playerColor,
                    x: leftGooseX,
                    y: gooseY,
                    size: this.gooseSize,
                });
                this.flocker.addBoid(this.playerGoose);
            } else {
                const leftGoose = new Goose(
                    this.gooseColor,
                    leftGooseX,
                    gooseY
                );
                this.leftGeese.push(leftGoose);
            }

            const rightGoose = new Goose(this.gooseColor, rightGooseX, gooseY);
            this.rightGeese.push(rightGoose);
        }
    }

    entangle() {
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
        });
        
        this.flocker.addBoid(entangledGoose);
        this.entangledGeese.push(entangledGoose);
    }

    render() {
        this.flocker.run();
        this.leaderGoose.render();
        this.leftGeese.forEach(goose => goose.render());
        this.rightGeese.forEach(goose => goose.render());
        this.entangledGeese.forEach(goose => goose.render());
        this.playerGoose.render();
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
        ellipse(this.x, this.y, 80, 80);
    }
}
