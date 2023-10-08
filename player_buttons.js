console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "kuley_kuley", filePath: "songs/kuley_kuley.mp3", coverPath: "covers/1.jpg"},
    {songName: "NEFFEX_fight_back", filePath: "songs/NEFFEX_fight_back.mp3", coverPath: "covers/2.jpg"},
    {songName: "NEFFEX_never_give_up", filePath: "songs/NEFFEX_never_give_up.mp3", coverPath: "covers/3.jpg"},
    {songName: "thinking_about_you", filePath: "songs/thinking_about_you.mp3", coverPath: "covers/4.jpg"},
    {songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Rabba - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/6.jpg"},
    {songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/7.jpg"},
    {songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/8.jpg"},
    {songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/9.jpg"},
    {songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/4.mp3", coverPath: "covers/10.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
fileInput.addEventListener('change', () => {
            const file = fileInput.files[0];
            if (file) {
                addSongToQueue(file);
                fileInput.value = ''; // Clear the file input
            }
        });
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
const audio = document.getElementById('audio');
const playButton = document.getElementById('playButton');
const pauseButton = document.getElementById('pauseButton');
const nextButton = document.getElementById('nextButton');
const clearQueueButton = document.getElementById('clearQueueButton');
const fileInput = document.getElementById('fileInput');
const addSongButton = document.getElementById('addSongButton');
const queue = [];
let currentSongIndex = -1;

playButton.addEventListener('click', () => {
    if (currentSongIndex >= 0 && currentSongIndex < queue.length) {
        audio.play();
    }
});

pauseButton.addEventListener('click', () => {
    audio.pause();
});

nextButton.addEventListener('click', () => {
    playNextSong();
});

clearQueueButton.addEventListener('click', () => {
    clearQueue();
});

fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (file) {
        addSongToQueue(file);
        fileInput.value = ''; // Clear the file input
    }
});

addSongButton.addEventListener('click', () => {
    fileInput.click(); // Trigger file input click event
});

audio.addEventListener('ended', () => {
    playNextSong();
});

function addSongToQueue(file) {
    queue.push(file);
    displayQueue();
    if (currentSongIndex === -1) {
        playNextSong();
    }
}

function playNextSong() {
    if (currentSongIndex < queue.length - 1) {
        currentSongIndex++;
        audio.src = URL.createObjectURL(queue[currentSongIndex]);
        audio.play();
        displayQueue();
    } else {
        // End of the queue, stop playback
        audio.src = '';
        currentSongIndex = -1;
        displayQueue();
    }
}

function clearQueue() {
    queue.length = 0;
    audio.src = '';
    currentSongIndex = -1;
    displayQueue();
}

function displayQueue() {
    const queueElement = document.getElementById('queue');
    queueElement.innerHTML = '';
    for (let i = 0; i < queue.length; i++) {
        const song = queue[i];
        const listItem = document.createElement('div');
        listItem.textContent = `Song ${i + 1}: ${song.name}`;
        queueElement.appendChild(listItem);
    }
}
function displayQueue() {
const queueElement = document.getElementById('queue');
queueElement.innerHTML = '';
for (let i = 0; i < queue.length; i++) {
const song = queue[i];
const listItem = document.createElement('div');
listItem.textContent = `Song ${i + 1}: ${song.name}`;
listItem.draggable = true; // Make the item draggable
listItem.setAttribute('data-index', i); // Add data-index attribute to track the item's position
listItem.setAttribute('ondragstart', 'drag(event)'); // Add dragstart event handler
queueElement.appendChild(listItem);
}
}


function allowDrop(event) {
event.preventDefault();
}

function drag(event) {
event.dataTransfer.setData('text', event.target.getAttribute('data-index'));
}

function drop(event) {
event.preventDefault();
const fromIndex = event.dataTransfer.getData('text');
const toIndex = event.target.getAttribute('data-index');

// Swap the songs in the queue array based on the dragged positions
const temp = queue[fromIndex];
queue[fromIndex] = queue[toIndex];
queue[toIndex] = temp;

// Update the displayed queue
displayQueue();
}