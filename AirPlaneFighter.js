let container = document.querySelector('.container');
let containerWidth = container.clientWidth;
let containerHeight = container.clientHeight;
let obstacleWidth = 50;
let obstacleSpeed = 100; 

document.addEventListener('keydown', function(event) {
    let airPlane = document.getElementById('plane');
    let currentPosition = parseInt(airPlane.style.left) || (containerWidth / 2);

    switch (event.key) {
        case 'ArrowLeft':
            if (currentPosition > 1) {
                currentPosition -= 20;
                airPlane.style.left = currentPosition + 'px';
            }
            break;
        case 'ArrowRight':
            if (currentPosition < containerWidth - 50) {
                currentPosition += 20;
                airPlane.style.left = currentPosition + 'px';
            }
            break; 
    }
    console.log(currentPosition);
});

function generateObstacle() {
    let obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    let randomPosition = Math.floor(Math.random() * (containerWidth - obstacleWidth));
    obstacle.style.left = randomPosition + 'px';
    obstacle.style.top = '0px'; 
    container.appendChild(obstacle);
}

function moveObstaclesDown() {
    let obstacles = document.querySelectorAll('.obstacle');
    obstacles.forEach(obstacle => {
        let currentTop = obstacle.offsetTop;
        obstacle.style.top = currentTop + obstacleSpeed + 'px';
        if (currentTop >= containerHeight - obstacleSpeed) {
            obstacle.remove(); 
        }
    });
}

setInterval(generateObstacle, 1000); 
setInterval(moveObstaclesDown, 1000);
