function titleScreen() {
    background("deepskyblue");
    textAlign(CENTER);
    fill("white");
    textFont('IBM Plex Serif');
    

    cloud1.display(); 
    cloud1.move();
    cloud2.display();
    cloud2.move();
    cloud3.display();
    cloud3.move();


  
    textSize(48);
    text("A Bird's Eye View", width/2, height/2 - 80);


    text("of Quantum Computing", width/2, height/2 - 45);
    image(sideGoose, width/2, height/2 + 50, sideGoose.width, sideGoose.height);
    

    let buttonX = width/2;

    let buttonY = height*5/6;
    let buttonWidth = 120;
    let buttonHeight = 40;
    let buttonRadius = 10;


    push();
    stroke("white");
    fill("deepskyblue");
    rectMode(CENTER);
    textSize(18);
    if (mouseX >= buttonX - buttonWidth/2 && mouseX <= buttonX + buttonWidth/2 && mouseY >= buttonY - buttonHeight/2 && mouseY <= buttonY + buttonHeight/2) {
        fill("skyblue");
        textSize(20);
        buttonWidth += 10;
        buttonHeight += 10;
        buttonRadius += 10;
    }
    if (mouseIsPressed && mouseX >= buttonX - buttonWidth/2 && mouseX <= buttonX + buttonWidth/2 && mouseY >= buttonY - buttonHeight/2 && mouseY <= buttonY + buttonHeight/2) {
        sceneNum ++;
    }
    rect(buttonX, buttonY, buttonWidth, buttonHeight, buttonRadius);
    fill("white");
    noStroke();
    text("Start!", buttonX, buttonY + 5);

pop();
}