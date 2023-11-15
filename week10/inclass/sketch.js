let numRings = 10
let radius
let strWeight = 20

let backColor

function setup() {
    createCanvas(800, 800)
    colorMode(HSB, TWO_PI, 1, 1)
    radius = width*0.1
    backColor = color(0, 0, 0)

    setTimeout(()=>{
        backColor = color(0, 0, 1)
    }, 5000)
    
    setInterval(()=>{
        backColor = color(random(TWO_PI), 0.8, 0.8)
    }, 2000)
}
function draw(){
    background(backColor)
    stroke(255, 0, 0)
    noFill()
    strokeWeight(strWeight)

    for (let i = 0; i < numRings; i++){
        push()
        translate(width*0.5, height*0.5)
        rotate(sin(millis() *0.001*(i*0.5+1))*0.5)
        stroke(i*TWO_PI/numRings, 0.8, 0.8)
        arc(0, 0, radius*2 + i*strWeight*2, radius*2 + i*strWeight*2, PI*0.75, PI*2 + PI*0.25)
        pop()

    }
}