const mario = document.querySelector('.mario');
const obstacle = document.querySelector('.pipe'); 
const clouds = document.querySelector('.clouds');

const somPulo = document.getElementById('som-pulo');
const somGameOver = document.getElementById('som-gameover');

let score = 0;
let scoreInterval = null;

scoreInterval = setInterval(() => {
    score++;
    const scoreElement = document.getElementById('score');
    if (scoreElement) {
        scoreElement.innerText = score;
    }
}, 100);

const jump = () => {
    if (!mario.classList.contains('jump')) {
        mario.classList.add('jump');

        if (somPulo) {
            somPulo.currentTime = 0;
            somPulo.play().catch(e => console.log("Erro no som de pulo:", e));
        }

        setTimeout(() => {
            mario.classList.remove('jump');
        }, 500);
    }
}

const duck = (isDucking) => {
    if (!mario.classList.contains('jump')) {
        if (isDucking) {
            mario.classList.add('duck');
            mario.src = 'css/images/mario-duck.png'; 
            mario.style.height = '40px'; 
        } else {
            mario.classList.remove('duck');
            mario.src = 'css/images/mario.gif';
            mario.style.height = '150px'; 
        }
    }
};

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown' || event.code === 'KeyS') {
        duck(true);
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowDown' || event.code === 'KeyS') {
        duck(false);
    }
});

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' || event.key === ' ' || event.key === 'ArrowUp') {
        jump();
    }
});

let audioIniciado = false; 

const iniciarAudio = () => {
    if (audioIniciado) return; 
    audioIniciado = true;

    const musicaFundo = new Audio('https://nu.vgmtreasurechest.com/soundtracks/super-mario-bros/gvlupoaj/01.%20Ground%20Theme.mp3');
    musicaFundo.loop = true;
    musicaFundo.volume = 0.4;
    musicaFundo.play().then(() => {
        console.log("Música de fundo a tocar com sucesso!");
    }).catch(error => {
        console.log("Erro ao reproduzir música de fundo:", error);
        audioIniciado = false; 
    });
};

window.addEventListener('click', iniciarAudio);
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' || event.key === ' ' || event.key === 'ArrowUp') {
        iniciarAudio();
    }
});

obstacle.addEventListener('animationiteration', () => {
    const sortearBala = Math.random() < 0.4; 
    if (sortearBala) {
        obstacle.classList.add('bullet');
        obstacle.src = 'css/images/bullet.png';
    } else {
        obstacle.classList.remove('bullet');
        obstacle.src = 'css/images/pipe.png';
    }
});

const loop = setInterval(() => {
    if (!obstacle) return;

    const obstaclePosition = obstacle.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    const isDucking = mario.classList.contains('duck');
    const isBullet = obstacle.classList.contains('bullet');

    let colidiu = false;

    if (obstaclePosition <= 120 && obstaclePosition > 0) {
        if (!isBullet && marioPosition < 80) {
            colidiu = true;
        } else if (isBullet && marioPosition < 70 && !isDucking) {
            colidiu = true;
        }
    }

    if (colidiu) {
        obstacle.style.animation = 'none';
        obstacle.style.left = `${obstaclePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = 'css/images/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        if (somGameOver) {
            somGameOver.currentTime = 0;
            somGameOver.play().catch(e => console.log("Erro no som de game over:", e));
        }

        clearInterval(scoreInterval);
        clearInterval(loop);

        const gameOverScreen = document.getElementById('game-over-screen');
        if (gameOverScreen) {
            gameOverScreen.style.display = 'flex';
        }
    }
}, 10);

const restartButton = document.getElementById('restart-button');
if (restartButton) {
    restartButton.addEventListener('click', () => {
        location.reload();
    });
}