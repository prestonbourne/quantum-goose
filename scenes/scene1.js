function scene1() {
    background("deepskyblue");

    cloud1.display(); 
    cloud1.move();
    cloud2.display();
    cloud2.move();
    cloud3.display();
    cloud3.move();  

    push();
        noStroke();
        fill(100, 150, 200, 100);
        rect(width/2 - 20, height/2 + 20, 400, 400, 2);
        fill("navajowhite");
        rect(width/2, height/2, 400, 400, 2);

        fill("saddlebrown");
        text("Instructions", width/2, height/3);
        textAlign(LEFT);
        textSize(20);
        text(
            "Help Quantum Goose entangle his\nclassical goose flock members by\ntyping the required quantum\ngates on your keyboard!\n\nEntangle all classical geese,\nincluding Goose Leader, to win\nthe game and complete the\nquantum swarm.", 
            width/2 - 150, 
            height/3 + 50
            );
    pop();

    // Next Button:
    let buttonX = width/2;
    let buttonY = height*2.85/4;
    let buttonWidth = 100;
    let buttonHeight = 30;
    let buttonRadius = 5;
    push();
        if (mouseX >= buttonX - buttonWidth/2 && mouseX <= buttonX + buttonWidth/2 && mouseY >= buttonY - buttonHeight/2 && mouseY <= buttonY + buttonHeight/2) {
            fill("skyblue");
            textSize(20);
            buttonWidth += 8;
            buttonHeight += 8;
            buttonRadius += 8;
            stroke("white");
            rect(buttonX, buttonY, buttonWidth, buttonHeight, buttonRadius);
            fill("white");
            text("Go!", buttonX, buttonY + 5);
        } else {
            stroke("white");
            fill("deepskyblue");
            rectMode(CENTER);
            textSize(18);
            rect(buttonX, buttonY, buttonWidth, buttonHeight, buttonRadius);
            fill("white");
            noStroke();
            text("Ready?", buttonX, buttonY + 5);
        }
        if (mouseIsPressed && mouseX >= buttonX - buttonWidth/2 && mouseX <= buttonX + buttonWidth/2 && mouseY >= buttonY - buttonHeight/2 && mouseY <= buttonY + buttonHeight/2) {
            sceneNum ++;
        }
    pop();
}