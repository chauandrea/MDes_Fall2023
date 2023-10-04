let switchImage = function(event){
    console.log(event.target)
    if(!undefined) {

    }
    else {
        document.getElementById("largeImg").src=event.target.src
    }
}

let myInterval = window.setInterval(function,2000);

document.getElementById("c1").addEventListener("click", switchImage)
document.getElementById("y1").addEventListener("click", switchImage)
document.getElementById("c2").addEventListener("click", switchImage)
document.getElementById("y2").addEventListener("click", switchImage)

