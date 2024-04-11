let board = document.getElementById('board');
let plane = document.getElementById('pl');
plane.innerHTML = '&#9992;';
let score = 10;
let getTitle = document.querySelector('.firstTitle');
let title = getTitle.innerText;
let isOn = 1;
let arrayColors = ['red', 'blue', 'green', 'purple', 'black', 'red'];
let planePosition = 0;
let currentPlanePoz = 330;
let planeSpeed = 5;
let keyStates = {};

function changeTitleColors() {
    let coloredTitle = '';
    for (let i = 0; i < title.length; ++i) {
        let randomColor = arrayColors[Math.floor(Math.random() * arrayColors.length)];
        coloredTitle += '<span style="color: ' + randomColor + ';">' + title[i] + '</span>';
    }
    getTitle.innerHTML = coloredTitle;
}

setInterval(changeTitleColors, 1000);

document.addEventListener('keydown', function(event) {
    keyStates[event.key] = true;
});
document.addEventListener('keyup', function(event) {
    keyStates[event.key] = false;
});
function updatePlanePosition() {
    if (isOn === 0) {
        return;
    }
    if (keyStates['ArrowLeft'] && planePosition > -340) {
        planePosition -= planeSpeed;
        currentPlanePoz -= planeSpeed;
    }
    if (keyStates['ArrowRight'] && planePosition < 310) {
        planePosition += planeSpeed;
        currentPlanePoz += planeSpeed;
    }
    plane.style.left = planePosition + 'px';
}

setInterval(updatePlanePosition, 16);

document.addEventListener('keydown', (e) => {
    if (e.code === "Space") {
        let bullet = document.createElement('div');
        bullet.className = 'bullet';
        board.appendChild(bullet);
        let planeRect = plane.getBoundingClientRect();
        let bulletPosition = planeRect.left + (planeRect.width - 53);
        bullet.style.position = 'absolute';
        bullet.style.left = bulletPosition + 'px';
        bullet.style.top = plane.offsetTop + 'px';
    }
});

function moveUpBullet() {
    if (isOn === 0) {
        return;
    }
    let bullets = document.querySelectorAll('.bullet');
    let obstacles = document.querySelectorAll('.obst'); 
    for (let i = 0; i < bullets.length; ++i) { 
        let bulletPos = parseInt(bullets[i].style.top) || 0;
        bulletPos -= 1;
        bullets[i].style.top = bulletPos + 'px';
        if (bulletPos <= 0) {
            bullets[i].remove();
        }
        for (let j = 0; j < obstacles.length; ++j) { 
            if (isColliding(bullets[i], obstacles[j])) { 
                obstacles[j].remove();
                bullets[i].remove();
                document.getElementById('score').innerHTML = "Score " + score;
                score += 10;
            }
        }
    }
}

setInterval(moveUpBullet, 2);

function createObstacles() {
    if (isOn === 0) {
        return;
    }
    let obstacles = document.createElement('div');
    obstacles.className = 'obst';
    let randomPosition = Math.floor(Math.random() * (board.offsetWidth) - 50);
    if (randomPosition > 10 && randomPosition < (board.offsetWidth) - 60) {
        obstacles.style.left = randomPosition + 'px';
        board.appendChild(obstacles);
    }
}

setInterval(createObstacles, 300);

function moveDownObst() {
    if (isOn === 0) {
        return;
    }
    let obstacles = document.querySelectorAll('.obst');
    for (let i = 0; i < obstacles.length; ++i) {
        let obstPosition = parseInt(obstacles[i].style.top) || 0;
        obstPosition += 1;
        if (isColliding(obstacles[i], plane)) {
            gameOver();
            return;
        }
        if (obstPosition < board.offsetHeight - 50) {
            obstacles[i].style.top = obstPosition + 'px';
        } else {
            obstacles[i].remove();
        }
    }
}

setInterval(moveDownObst, 3);

function isColliding(elem1, elem2) {
    let rect1 = elem1.getBoundingClientRect();
    let rect2 = elem2.getBoundingClientRect();
    return !(rect1.right < rect2.left || 
             rect1.left > rect2.right || 
             rect1.bottom < rect2.top || 
             rect1.top > rect2.bottom);
}

function gameOver() {
    alert("Game Over! Your final score is: " + score);
    setTimeout(function() {
        location.reload();
    }, 2000);
    isOn = 0;
}
