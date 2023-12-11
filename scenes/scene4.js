function scene4() {
    background("deepskyblue");
    
    // Draw the boids
    flock.run();
    cloud1.display(); 
    cloud1.move();
    cloud2.display();
    cloud2.move();
    cloud3.display();
    cloud3.move();
  
    textSize(30);
    fill("white");
    text("Congratulations,\nYou Won!", width / 2, height / 2);

}
