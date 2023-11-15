let angle = 0

function setup(){
    createCanvas(800,600);
}

function draw(){
    background(200, 215, 205)
    //drawing a grid
    
    fill(225, 190, 210)
    push()
    translate(100, 200)
    rotate(QUARTER_PI)
    rect(0, 0, 150, 100)
    pop()
    drawGrid()

    push()
    translate(width*0.5, height*0.5)
    rotate(angle)
    fill(180, 230, 205)
    ellipse(0, 0, 300, 200)
    pop()

    angle += 0.01
}

function drawGrid(){
    for (let x = 0; x <= width; x += (width/10)){
        stroke(255, 0, 0)
        line(x, 0, x, height)
    }
    //rotating a rectangle
    for (let y = 0; y <= height; y += (height/10)) {
        stroke(0, 0, 225)
        line(0, y, width, y)
    }
}
