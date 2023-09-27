let firstDiv = document.getElementById("divOne")
let colorChangeButton = document.getElementById("btnChangeColor")
let addTextButton = document.getElementById("btnAddText")

console.log(colorChangeButton)

let changeColor = function(){
    let redComp = Math.random() * 255
    let greenComp = Math.random() * 255
    let blueComp = Math.random() * 255
    let bgColor = "rgb(" + redComp + ", " + greenComp + ", " + blueComp + ")"
    firstDiv.style.backgroundColor = bgColor
}

let addText = function(){
    let someText = "Hello, this is some text!"
    let parag = document.createElement("p")
    parag.innerText = someText
    firstDiv.appendChild(parag)

}

// fat arrow notation
// let changeColor = ()=>{
// }

firstDiv.style.backgroundColor = "rgb(230, 170, 170)"
colorChangeButton.addEventListener("click", changeColor)
addTextButton.addEventListener("click", addText)