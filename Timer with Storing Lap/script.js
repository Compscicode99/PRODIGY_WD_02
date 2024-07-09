
let startTime, updatedTime, difference, tInterval;
let running = false;
let lapCounter = 1;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('laps');

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 1);
        startStopBtn.innerText = 'Pause';
        running = true;
    } else {
        clearInterval(tInterval);
        startStopBtn.innerText = 'Start';
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    startStopBtn.innerText = 'Start';
    display.innerText = '00:00:00.000';
    difference = 0;
    lapsContainer.innerHTML = '';
    lapCounter = 1;
}

function lap() {
    if (running) {
        const lapTime = document.createElement('div');
        lapTime.className = 'lap-item';
        lapTime.innerText = `Lap ${lapCounter}: ${display.innerText}`;
        lapsContainer.appendChild(lapTime);
        lapCounter++;
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000));

    display.innerText = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${padMilliseconds(milliseconds)}`;
}

function pad(number) {
    return number < 10 ? `0${number}` : number;
}

function padMilliseconds(number) {
    if (number < 10) return `00${number}`;
    if (number < 100) return `0${number}`;
    return number;
}
