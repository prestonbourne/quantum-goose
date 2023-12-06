// This class is for drawing clouds on the title screen and maybe lose screen
class Cloud {
    constructor() {
      this.xPos = width; // Start xPos at the width of the canvas
      this.yPos = random(height); // Initialize yPos
      this.scaleFactor = random(0.5, 1.5); // Generate a random scale factor
    }
  
    move() {
      // Calculate a speed factor based on yPos (slower at top because further away)
      const speedFactor = map(this.yPos, 0, height, 0.5, 1, 0.1);
  
      // Update xPos over time based the speed factor
      this.xPos -= 1 * speedFactor; // Adjust the speed of movement as needed
  
      // Reset xPos and change yPos when the ellipse moves off the canvas
      if (this.xPos < 0 - cloudImg.width/4 * this.scaleFactor) {
        this.yPos = random(height);
        this.scaleFactor = random(0.5, 2); // Generate a new scale factor
        this.xPos = width + cloudImg.width/4 * this.scaleFactor/2;
      }
    }
  
    display() {
      // Draw an ellipse at xPos on the right side at the current yPos with scaled size
      image(cloudImg, this.xPos, this.yPos, cloudImg.width/4 * this.scaleFactor, cloudImg.height/4 * this.scaleFactor);
    }
  }