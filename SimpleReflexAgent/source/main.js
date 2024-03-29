import {oneStepOfBehavior} from "/SimpleReflexAgent/source/behaviour.js"

var canvas = document.getElementById("canvas");
canvas.width = 480;
canvas.height = 480;
var numberOfCells = 8;
var numberOfWalls = 6;

//the number of lines inside the canvas is: numberOfCells - 1
function drawAllLinesInsideBox(canvas, numberOfCells) {
    var canvasContext = canvas.getContext("2d");
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    var peaceBetwenCells = canvasWidth / numberOfCells;

    //creacion de los rectangulos de color rosado palido
    for (var i = 0; i < canvasWidth; i = i + peaceBetwenCells) {
        for (var j = 0; j < canvasHeight; j = j + peaceBetwenCells) {
            canvasContext.fillStyle = "rgba(130, 150, 210, 0.5)";
            canvasContext.fillRect(i, j, peaceBetwenCells, peaceBetwenCells);
        }
    }

    //creacion de las lineas dentro del canvas
    for (var i = 0; i < canvasWidth; i = i + peaceBetwenCells) {
        canvasContext.lineWidth = 4;
        canvasContext.strokeStyle = "#7c5bca";
        canvasContext.moveTo(i, 0);
        canvasContext.lineTo(i, canvasHeight);
        canvasContext.stroke();
    }
    for (var j = 0; j < canvasHeight; j = j + peaceBetwenCells) {
        canvasContext.lineWidth = 4;
        canvasContext.strokeStyle = "#7c5bca";
        canvasContext.moveTo(0, j);
        canvasContext.lineTo(canvasHeight, j);
        canvasContext.stroke();
    }
}

drawAllLinesInsideBox(canvas, numberOfCells);


//crear una matriz numberOfCells x numberOfCells llena de ceros
//crear en esa misma funcion, una lista de cordenadas 
//(i(row) , j(column)) random para los muros. Y una coordenada
//para el queso.
function getRandomMatrix(numberOfCells, numberOfWalls) {
    //lista de coordenadas de muros
    function isInList(list, element) {
        for (var i = 0; i < numberOfWalls; i++) {
            if (list[i].toString() === element.toString()) {
                return true;
            }
        }
        return false
    }

    //coordenadas de las paredes/obstaculos
    var wallsCoordinates = [];
    for (var i = 0; i < numberOfWalls; i++) {
        wallsCoordinates.push([Math.floor(Math.random() * numberOfCells), Math.floor(Math.random() * numberOfCells)])
    }
    //coordenadas del queso
    var goalCoordinates = [Math.floor(Math.random() * numberOfCells), Math.floor(Math.random() * numberOfCells)]
    while (isInList(wallsCoordinates, goalCoordinates) == true) {
        goalCoordinates = [Math.floor(Math.random() * numberOfCells), Math.floor(Math.random() * numberOfCells)]
    }

    //creacion de la matriz con agente(1) paredes(2) y la meta(3)
    var matriz = []
    for (var i=0;i<numberOfCells;i++)
        matriz[i] = new Array(numberOfCells);
    console.log(matriz)

    for (var i = 0; i < numberOfCells; i++) {
        for (var j = 0; j < numberOfCells; j++) {
            if (isInList(wallsCoordinates, [i, j]))
                matriz[i][j] = 2;
            else if (goalCoordinates.toString() == [i, j].toString())
                matriz[i][j] = 3;
            else
                matriz[i][j] = 0;
        }
    }
    matriz[4][4] = 1;
    console.log(matriz);
    return matriz;

}


var matriz = getRandomMatrix(numberOfCells, numberOfWalls);



//funcion que va a pintar el agente, las paredes, la meta
//agent:green; walls: black; goal:red
function drawAgentWallsGoal(numberOfCells, matriz) {
    var canvasContext = canvas.getContext("2d");

    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    var peaceBetwenCells = canvasWidth / numberOfCells;

    for (var i = 0; i < numberOfCells; i++) {
        for (var j = 0; j < numberOfCells; j++) {
            if (matriz[i][j] == 1) {
                canvasContext.fillStyle = "rgba(0, 225, 0, 0.5)";
                canvasContext.fillRect(i * peaceBetwenCells, j * peaceBetwenCells, peaceBetwenCells, peaceBetwenCells);
            }
            else if (matriz[i][j] == 2) {
                canvasContext.fillStyle = "rgba(0, 0, 0, 0.5)";
                canvasContext.fillRect(i * peaceBetwenCells, j * peaceBetwenCells, peaceBetwenCells, peaceBetwenCells);
            }
            else if (matriz[i][j] == 3) {
                canvasContext.fillStyle = "rgba(255, 150, 0, 0.5)";
                canvasContext.fillRect(i * peaceBetwenCells, j * peaceBetwenCells, peaceBetwenCells, peaceBetwenCells);
            }
        }
    }
}

drawAgentWallsGoal(numberOfCells, matriz);

async function doStuff(){
    
    drawAllLinesInsideBox(canvas, numberOfCells);
    drawAgentWallsGoal(numberOfCells,oneStepOfBehavior(numberOfCells,matriz));

    // Sleep for 3 seconds
    await new Promise(r => setTimeout(r, 250));
    doStuff()
}

doStuff()