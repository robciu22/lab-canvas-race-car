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
let topToBottom = 0

window.onload = () => {
    canvas.style.display = 'none'
    document.getElementById('start-button').onclick = () => {
        //the next line is for proofing if...
        console.log("Startbutton was clicked")
        startGame();
    };

    function drawRoad() {
        ctx.beginPath()
        ctx.drawImage(roadImage, 0, 0, 500, 700)
        ctx.closePath()
    }

    function drawCar() {
        ctx.beginPath()
        ctx.drawImage(carImage, carX, 450, carWidth, carHeight)
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
        ctx.closePath()
    }


    function drawObstacle() {
        ctx.beginPath()
        ctx.fillStyle = "rgb(126,46,31)"
        ctx.fillRect(20, topToBottom, 100, 20)
        ctx.closePath()

        //next code is for the obstacle-speed
        topToBottom += 2
        if (topToBottom >= 700) {
            topToBottom = 0
        }
    }


    function drawScore() {
        ctx.beginPath();
        ctx.font = "30px sans-serif";
        ctx.fillStyle = "white";
        ctx.fillText(`Score : ${score}`, 80, 50);
        ctx.closePath();
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

        drawObstacle()




        if (gameOver) {
            cancelAnimationFrame(intervalId);
        } else {
            intervalId = requestAnimationFrame(startGame);
        }

    }

};