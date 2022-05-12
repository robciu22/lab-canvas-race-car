let canvas = document.querySelector('canvas')
canvas.style.border = '2px solid black'
let ctx = canvas.getContext('2d')

let roadImage = new Image()
roadImage.src = './images/road.png'

let carImage = new Image()
carImage.src = "./images/car.png"

let startScreen = document.querySelector('.game-intro')
    //let roadScreen = document.querySelector('.road')

const carWidth = 100
const carHeight = 200
const carSpeedValue = 3
    /*
    const paddleWidth = 150;
    const paddleHeight = 15;
    let paddleX = canvas.width / 2 - paddleWidth / 2;
    let paddleY = canvas.height - paddleHeight;
    */
let isCarGoingLeft = false
let isCarGoingRight = false
let score = 0
let gameOver = false
let intervalId = 0
let carX = 200
let topToBottomOne = 0
let topToBottomTwo = 0
let topToBottomThree = 0

window.onload = () => {
    canvas.style.display = 'none'
    document.getElementById('start-button').onclick = () => {
        //the next line is for proofing if connected and StartButton is working...
        console.log("Startbutton was clicked")

        startGame();
    };

    function drawRoad() {
        ctx.beginPath()
        ctx.drawImage(roadImage, 0, 0, canvas.width, canvas.height)
        ctx.closePath()
    }

    function drawCar() {
        ctx.beginPath()
        ctx.drawImage(carImage, carX, 450, carWidth, carHeight)
        ctx.closePath()
            //carX = carX - 1
        if (isCarGoingLeft) {
            if (carX > 0) {
                carX -= carSpeedValue;
            }
        } else if (isCarGoingRight) {
            if (carX < canvas.width - carWidth) {
                carX += carSpeedValue;
            }
        }
    }

    function drawObstacleOne() {
        ctx.beginPath()
        ctx.fillStyle = "rgb(126,46,31)"
        ctx.fillRect(65, topToBottomOne, 100, 20)
        ctx.closePath()

        //next code is for the obstacle-speed
        topToBottomOne += 2
        if (topToBottomOne >= 700) {
            topToBottomOne = 0
        }
    }

    function drawObstacleTwo() {
        ctx.beginPath()
        ctx.fillStyle = "rgb(126,46,31)"
        ctx.fillRect(200, topToBottomTwo, 100, 20)
        ctx.closePath()

        //next code is for the obstacle-speed
        topToBottomTwo += 2
        if (topToBottomTwo >= 700) {
            topToBottomTwo = 0
        }
    }

    function drawObstacleThree() {
        ctx.beginPath()
        ctx.fillStyle = "rgb(126,46,31)"
        ctx.fillRect(340, topToBottomThree, 100, 20)
        ctx.closePath()

        //next code is for the obstacle-speed
        topToBottomThree += 2
        if (topToBottomThree >= 700) {
            topToBottomThree = 0
        }
    }

    function drawScore() {
        ctx.beginPath();
        ctx.font = "30px sans-serif";
        ctx.fillStyle = "white";
        ctx.fillText(`Score : ${score}`, 80, 50);
        ctx.closePath();
    }


    /*function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        drawCar()
        drawScore()

        if (gameOver) {
            cancelAnimationFrame(animationFrameId);
            restartBtn.style.display = "block";
        } else {
            animationFrameId = requestAnimationFrame(animate);
        }
    }
*/

    function startGame() {
        startScreen.style.display = 'none'
        canvas.style.display = 'block'
            //now only the road-screen has to appear
            // roadScreen.style.display = 'visible'
        drawRoad()

        drawCar()

        drawScore()

        drawObstacleOne()
        setInterval(drawObstacleOne, 10000)

        drawObstacleTwo()
        setInterval(drawObstacleTwo, 15000)

        drawObstacleThree()
        setInterval(drawObstacleThree, 20000)




        if (gameOver) {
            cancelAnimationFrame(intervalId);
        } else {
            intervalId = requestAnimationFrame(startGame);
        }

    }

    document.addEventListener("keydown", event => {
        console.log('this event', event)
        if (event.code === "ArrowLeft") {
            isCarGoingLeft = true;
        }
        if (event.code === "ArrowRight") {
            isCarGoingRight = true;
        }
    });

    document.addEventListener("keyup", event => {
        isCarGoingLeft = false;
        isCarGoingRight = false;
    });

};