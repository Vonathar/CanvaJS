// DOM Import

const submitButton = document.querySelector("#submitUserParameters");
const canvasDom = document.querySelector("canvas");
const canvas = canvasDom.getContext("2d");
const drawingSpeedInput = document.querySelector("#drawingSpeedInput");
const maxTicksInput = document.querySelector("#maxTicksInput");
const startingPositionInputX = document.querySelector("#startingPositionInputX");
const startingPositionInputY = document.querySelector("#startingPositionInputY");


// User preferences

let currentDrawingCycle;
let drawingTick = 0;
let drawingSpeed = 10;
let maxTicks = 120;
let startingPositionX = 500;
let startingPositionY = 500;



// Main drawing function


let draw = () => {

    if (drawingTick < maxTicks) {
        canvas.lineTo(drawingTick * Math.random() * 6, drawingTick * Math.random() * 6);
        canvas.fillStyle = (`rgb(${drawingTick} , ${drawingTick} , ${drawingTick})`);
        canvas.fill();
        drawingTick++;
    }
}

let startDrawing = () => {
    console.log(`Called with DS ${drawingSpeed} SpX ${startingPositionX} SpY ${startingPositionY}`);
    canvas.clearRect(0, 0, canvasDom.width , canvasDom.height);
    canvas.beginPath();
    
    canvas.lineTo(startingPositionX, startingPositionY);
    clearInterval(currentDrawingCycle);
    drawingTick = 0;
    currentDrawingCycle = setInterval(draw , drawingSpeed);
}


// Event listeners

drawingSpeedInput.addEventListener("input" , function() {
    drawingSpeed = drawingSpeedInput.value;
})

maxTicksInput.addEventListener("input" , function() {
    maxTicks = maxTicksInput.value;
})

submitButton.addEventListener("click" , event => {
    event.preventDefault();
    startDrawing();
})

startingPositionInputX.addEventListener("input" , function() {
    startingPositionX = startingPositionInputX.value;
})

startingPositionInputY.addEventListener("input" , function() {
    startingPositionY = startingPositionInputY.value;
})