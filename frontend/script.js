const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');

const somPulo = document.getElementById('som-pulo');
const somGameOver = document.getElementById('som-gameover');

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

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = 'css/images/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        if (somGameOver) {
            somGameOver.currentTime = 0;
            somGameOver.play().catch(e => console.log("Erro no som de game over:", e));
        }

        clearInterval(loop);
    }
}, 10);

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