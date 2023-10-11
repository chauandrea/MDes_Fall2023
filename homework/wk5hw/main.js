let images = ["c1.jpg", "y1.jpg", "c2.jpg", "y2.jpg"]
let bigImg = document.getElementById("largeImg")
let imageIndex = 0

let switchImage = function(event){
    //console.log(event.target)
    if(typeof event === "undefined") {
        imageIndex = imageIndex + 1
        if (imageIndex == 4) {
            imageIndex = 0
        }

        bigImg.src = images[imageIndex]

    }
    else {
        bigImg.src=event.target.src
        imageIndex = parseInt(event.target.id.charAt( 1 )) - 1

        //document.getElementById("largeImg").src=event.target.src

    }
}

let myInterval = window.setInterval(switchImage, 2000);

document.getElementById("c1").addEventListener("click", switchImage)
document.getElementById("y1").addEventListener("click", switchImage)
document.getElementById("c2").addEventListener("click", switchImage)
document.getElementById("y2").addEventListener("click", switchImage)

