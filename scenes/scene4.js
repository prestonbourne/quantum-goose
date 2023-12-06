function scene4() {
    background("deepskyblue");

    flock.run();
    cloud1.display(); 

    cloud2.display();

    cloud3.display();

    // Draw the boids
  
    textSize(30);
    fill(255, 255, 200);
    text("Congratulations, You Won!", innerWidth / 2.5, innerHeight / 2);
  


}
