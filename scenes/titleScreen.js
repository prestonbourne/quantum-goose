function titleScreen() {
    background("deepskyblue");
    textAlign(CENTER);
    fill("white");
    textFont('IBM Plex Serif');
    
    drawCloud(0.1, 1, 1);
    drawCloud(0.3, 1, 3);

    textSize(32);
    text("A Bird's Eye View", width/2, height/2 - 70);
    textSize(18);
    text("of Quantum Computing", width/2, height/2 - 45);
    image(sideGoose, width/2, height/2 + 50, sideGoose.width, sideGoose.height);
    
    drawCloud(0.5, 1, 5);

}

function drawCloud(scaleFactor, cloudSpeed, cHeight) {
    image(cloud, cLocation*scaleFactor, height*cHeight/6, cloud.width*scaleFactor, cloud.height*scaleFactor);
    if (cLocation < width*(-5)){
        cLocation = width*5;
    }
    cLocation -= cloudSpeed*cHeight/5;
}