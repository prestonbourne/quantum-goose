function scene3() {
    background("deepskyblue");
    fill("white");
    textSize(30)
    text("You didn't entangle all the geese!\nTry Again!", width/2, height/2);
    ledflock.run()
    cloud1.display(); 
    cloud1.move();
    cloud2.display();
    cloud2.move();
    cloud3.display();
    cloud3.move();
}

