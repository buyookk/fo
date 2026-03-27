// Links das Imagens do seu GitHub
const imgs = {
    office: "https://github.com/buyookk/fo/blob/main/imagens/escrit%C3%B3rio.png?raw=true",
    corredor_escuro: "https://github.com/buyookk/fo/blob/main/imagens/corredor%20sem%20luz.png?raw=true",
    corredor_vazio: "https://github.com/buyookk/fo/blob/main/imagens/corredor.png?raw=true",
    corredor_freddy: "https://github.com/buyookk/fo/blob/main/imagens/freddy%20no%20corredor.png?raw=true",
    palco_vazio: "https://github.com/buyookk/fo/blob/main/imagens/palco.png?raw=true",
    palco_freddy: "https://github.com/buyookk/fo/blob/main/imagens/freddy%20no%20palco.png?raw=true",
    cozinha_vazia: "https://github.com/buyookk/fo/blob/main/imagens/cozinha%20sem%20o%20freddy.png?raw=true",
    cozinha_freddy: "https://github.com/buyookk/fo/blob/main/imagens/cozinha%20com%20freddy.jpeg?raw=true",
    gerador_vazio: "https://github.com/buyookk/fo/blob/main/imagens/gerador%20sem%20freddy.png?raw=true",
    gerador_freddy: "https://github.com/buyookk/fo/blob/main/imagens/freddy%20no%20palco.png?raw=true" 
};

let freddyLocation = "palco";
let timeLeft = 300; 
let gameActive = false;
let isCamsOpen = false;

function startGame() {
    document.getElementById('menu').classList.remove('active');
    document.getElementById('office').classList.add('active');
    gameActive = true;
    startTimer();
    moveFreddy();
}

function startTimer() {
    const timerLabel = document.getElementById('timer');
    let countdown = setInterval(() => {
        if (!gameActive) { clearInterval(countdown); return; }
        timeLeft--;
        let mins = Math.floor(timeLeft / 60);
        let secs = timeLeft % 60;
        timerLabel.innerText = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        if (timeLeft <= 0) {
            gameActive = false;
            document.getElementById('win-screen').style.display = 'block';
        }
    }, 1000);
}

function moveFreddy() {
    let ai = setInterval(() => {
        if (!gameActive) { clearInterval(ai); return; }
        const locations = ["palco", "cozinha", "gerador", "corredor", "sala"];
        let currentIndex = locations.indexOf(freddyLocation);
        if (Math.random() > 0.4) { 
            freddyLocation = locations[currentIndex + 1] || "sala";
        }
    }, 8000); 
}

function goToCorridor() {
    if (isCamsOpen) return;
    document.getElementById('office').classList.remove('active');
    const corr = document.getElementById('corridor');
    corr.classList.add('active');
    corr.style.backgroundImage = `url('${imgs.corredor_escuro}')`;
}

function goToOffice() {
    document.getElementById('corridor').classList.remove('active');
    document.getElementById('office').classList.add('active');
    if (freddyLocation === "sala") triggerJumpscare();
}

function flashLight() {
    const corr = document.getElementById('corridor');
    if (freddyLocation === "corredor") {
        corr.style.backgroundImage = `url('${imgs.corredor_freddy}')`;
        setTimeout(() => { freddyLocation = "palco"; }, 800); 
    } else {
        corr.style.backgroundImage = `url('${imgs.corredor_vazio}')`;
    }
    setTimeout(() => { if(document.getElementById('corridor').classList.contains('active')) corr.style.backgroundImage = `url('${imgs.corredor_escuro}')`; }, 400);
}

function openMonitor() {
    isCamsOpen = true;
    document.getElementById('camera-ui').style.display = 'flex';
    viewCam('palco');
}

function closeMonitor() {
    isCamsOpen = false;
    document.getElementById('camera-ui').style.display = 'none';
    if (freddyLocation === "sala") triggerJumpscare();
}

function viewCam(name) {
    const display = document.getElementById('cam-display');
    let imgUrl = imgs[`${name}_vazio`];
    if (freddyLocation === name) imgUrl = imgs[`${name}_freddy`];
    display.style.backgroundImage = `url('${imgUrl}')`;
}

function triggerJumpscare() {
    gameActive = false;
    const video = document.getElementById('jumpscare-video');
    video.style.display = 'block';
    video.play();
    video.onended = () => {
        video.style.display = 'none';
        document.getElementById('game-over-screen').style.display = 'block';
    };
}
