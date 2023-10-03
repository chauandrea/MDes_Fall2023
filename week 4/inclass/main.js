let switchImage = function(event){
    console.log(event.target.id)
    document.getElementById("largeImg").src=event.target.id+".jpg"
}



document.getElementById("c1").addEventListener("click", switchImage)
document.getElementById("y1").addEventListener("click", switchImage)
document.getElementById("c2").addEventListener("click", switchImage)
document.getElementById("y2").addEventListener("click", switchImage)