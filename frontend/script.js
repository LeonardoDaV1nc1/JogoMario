const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');

const somPulo = document.getElementById('som-pulo');
const somGameOver = document.getElementById('som-gameover');

const jump = () => {
    mario.classList.add('jump');

    if (somPulo) {
        somPulo.currentTime = 0;
        somPulo.play();
    }

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = 'css/images/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        if (somGameOver) {
            somGameOver.play();
        }

        clearInterval(loop);
    }
}, 10);

document.addEventListener('keydown', jump);