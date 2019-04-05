// DOM Import

const submitButton = document.querySelector("#submitUserParameters");
const canvasDom = document.querySelector("canvas");
const canvas = canvasDom.getContext("2d");
const drawingSpeedInput = document.querySelector("#drawingSpeedInput");
const maxTicksInput = document.querySelector("#maxTicksInput");
const maxLineLengthInput = document.querySelector("#maxLineLengthInput");
const startingPositionInputX = document.querySelector("#startingPositionInputX");
const startingPositionInputY = document.querySelector("#startingPositionInputY");
const userChoiceRedInput = document.querySelector("#userChoiceRedInput");
const userChoiceGreenInput = document.querySelector("#userChoiceGreenInput");
const userChoiceBlueInput = document.querySelector("#userChoiceBlueInput");
let radioButtons = document.querySelectorAll("[name=drawingStyle");
const enableShadowsCheckbox = document.querySelector("#enableShadowsCheckbox");
const enableQuadraticCurvesCheckbox = document.querySelector("#enableQuadraticCurvesCheckbox");
const enableLinesCheckbox = document.querySelector("#enableLinesCheckbox");
const enableCanvasBorderCheckbox = document.querySelector("#enableCanvasBorderCheckbox");
const canvasBorderSizeSelect = document.querySelector("#canvasBorderSizeSelect");


// User preferences

let currentDrawingCycle;
let drawingTick = 0;
let drawingSpeed = 15;
let drawingStyle = "fillStyle";
let areShadowsEnabled = true;
let areLinesEnabled = true;
let areQuadraticCurvesEnabled = false;
let shadowsMultiplier = 1;
let maxTicks = 120;
let maxLineLength = 10;
let userChoiceRed = 160;
let userChoiceGreen = 30;
let userChoiceBlue = 50;
let startingPositionX = 1000;
let startingPositionY = 1000;
let isCanvasBorderEnabled = false;
let canvasBorderSizeString = "smallCanvasBorder";


// Main drawing function

let redInitialValue = userChoiceRed;
let greenInitialValue = userChoiceGreen;
let blueInitialValue = userChoiceBlue;
let redMaxIncrease = redInitialValue * 1.20;
let greenMaxIncrease = greenInitialValue * 1.20;
let blueMaxIncrease = blueInitialValue * 1.20;

// The function which runs every second; dynamically updates the value of all variables

let draw = () => {

    if (drawingTick < maxTicks) {
        if (areLinesEnabled) {
            canvas.lineTo(drawingTick * Math.random() * maxLineLength, drawingTick * Math.random() * maxLineLength);
        }
        if (areQuadraticCurvesEnabled) {
            canvas.quadraticCurveTo(drawingTick * Math.random() * maxLineLength , drawingTick * Math.random() * maxLineLength , drawingTick * Math.random() * maxLineLength , drawingTick * Math.random() * maxLineLength );
        }

        // Gradually increases the RGB values up until +20%; does not allow the value to go over 255
        if (areShadowsEnabled) {

            canvas.fillStyle = (`rgb(${userChoiceRed} , ${userChoiceGreen} , ${userChoiceBlue})`);

            if ((userChoiceRed * shadowsMultiplier) < redMaxIncrease && userChoiceRed < 255) {
                userChoiceRed *= shadowsMultiplier;
            }
            if ((userChoiceGreen * shadowsMultiplier) < greenMaxIncrease && userChoiceGreen < 255) {
                userChoiceGreen *= shadowsMultiplier;
            }
            if ((userChoiceBlue * shadowsMultiplier) < blueMaxIncrease && userChoiceBlue < 255) {
                userChoiceBlue *= shadowsMultiplier;
            }

            shadowsMultiplier += 0.00003;
            console.log(userChoiceBlue * shadowsMultiplier);
        } else {
            canvas.fillStyle = (`rgb(${userChoiceRed} , ${userChoiceGreen} , ${userChoiceBlue})`);
        }

        // Fill or stroke the lines, then procede to the next tick
        if (drawingStyle == "fillStyle") {
            canvas.fill();
        } else {
            canvas.stroke();
        }
        drawingTick++;
        console.log(`Tick with DS ${drawingSpeed} SpX ${startingPositionX} SpY ${startingPositionY} DSty ${drawingStyle} R${userChoiceRed} G${userChoiceGreen} B${userChoiceBlue}`);

    } else {
        stopAndResetDrawing();
    }
}

// Stop current cycle and reset the drawing variables

let stopAndResetDrawing = () => {
    clearInterval(currentDrawingCycle);

    drawingTick = 0;
    shadowsMultiplier = 1;

    if (!userChoiceRedInput.value) {
        userChoiceRed = userChoiceRedInput.placeholder;
    } else {
        userChoiceRed = userChoiceRedInput.value;
    }

    if (!userChoiceGreenInput.value) {
        userChoiceGreen = userChoiceGreenInput.placeholder;
    } else {
        userChoiceGreen = userChoiceGreenInput.value;
    }

    if (!userChoiceBlueInput.value) {
        userChoiceBlue = userChoiceBlueInput.placeholder;
    } else {
        userChoiceBlue = userChoiceBlueInput.value;
    }


    redInitialValue = userChoiceRed;
    greenInitialValue = userChoiceGreen;
    blueInitialValue = userChoiceBlue;
    redMaxIncrease = redInitialValue * 1.20;
    greenMaxIncrease = greenInitialValue * 1.20;
    blueMaxIncrease = blueInitialValue * 1.20;
}

// Clean the canvas, initialise the drawing path and move the starting point to the user's preferred position

let startDrawing = () => {

    stopAndResetDrawing();
    console.log(`Called with DS ${drawingSpeed} SpX ${startingPositionX} SpY ${startingPositionY} DSty ${drawingStyle} R${userChoiceRed} G${userChoiceGreen} B${userChoiceBlue}`);
    canvas.clearRect(0, 0, canvasDom.width , canvasDom.height);
    canvas.beginPath();
    canvas.lineTo(startingPositionX, startingPositionY);

    currentDrawingCycle = setInterval(draw , drawingSpeed);
}


// Window options

// Enable the border around the canvas and assign it the currenty selected size option
let enableCanvasBorder = () => {
    if (canvasBorderSizeString == "smallCanvasBorder") {
        canvasDom.style.border =  "1px solid black";
    }
    else if (canvasBorderSizeString == "mediumCanvasBorder") {
        canvasDom.style.border = "3px solid black";
    }
    else if (canvasBorderSizeString == "largeCanvasBorder") {
        canvasDom.style.border = "5px solid black";
    }
}

let disableCanvasBorder = () => {
    canvasDom.style.border = "";
}


// Event listeners

drawingSpeedInput.addEventListener("input" , function() {
    drawingSpeed = drawingSpeedInput.value;
})

maxTicksInput.addEventListener("input" , function() {
    maxTicks = maxTicksInput.value;
})

maxLineLengthInput.addEventListener("input" , function(){
    maxLineLength = maxLineLengthInput.value;
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

for (let option of Array.from(radioButtons)) {
    option.addEventListener("change" , function() {
        drawingStyle = option.value;
    })
}

userChoiceRedInput.addEventListener("input" , function() {
    userChoiceRed = userChoiceRedInput.value;
})

userChoiceGreenInput.addEventListener("input" , function() {
    userChoiceGreen = userChoiceGreenInput.value;
})

userChoiceBlueInput.addEventListener("input" , function() {
    userChoiceBlue = userChoiceBlueInput.value;
})

enableShadowsCheckbox.addEventListener("change" , function() {
    if (enableShadowsCheckbox.checked) {
        areShadowsEnabled = true;
    } else {
        areShadowsEnabled = false;
    }
})

enableQuadraticCurvesCheckbox.addEventListener("change" , function() {
    if (enableQuadraticCurvesCheckbox.checked) {
        areQuadraticCurvesEnabled = true;
    } else {
        areQuadraticCurvesEnabled = false;
    }
})

enableLinesCheckbox.addEventListener("change" , function() {
    if (enableLinesCheckbox.checked) {
        areLinesEnabled = true;
    } else {
        areLinesEnabled = false;
    }
})

enableCanvasBorderCheckbox.addEventListener("change" , function() {
    if (enableCanvasBorderCheckbox.checked) {
        isCanvasBorderEnabled = true;
        enableCanvasBorder();
    } else {
        isCanvasBorderEnabled = false;
        disableCanvasBorder();
    }
})

// Update the border size and update it only if the option to enable it is already active
canvasBorderSizeSelect.addEventListener("change" , function() {
    canvasBorderSizeString = canvasBorderSizeSelect.value;
    if (enableCanvasBorderCheckbox.checked) {
        enableCanvasBorder();
    }
})