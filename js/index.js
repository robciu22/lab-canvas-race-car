let canvas = document.querySelector('canvas')
let startScreen = document.querySelector('.game-intro')
let roadScreen = document.querySelector('.road')


window.onload = () => {
    document.getElementById('start-button').onclick = () => {
        //the next line is for proofing if...
        console.log("Startbutton was clicked")
        startGame();
    };

    function startGame() {
        startScreen.style.display = 'none'
            //now only the road-screen has to appear
        roadScreen.style.display = 'visible'
    }
};