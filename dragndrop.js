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

<!DOCTYPE html>
<html>
<head>
    <title>Music Queue</title>
</head>
<body>
    <h1>Music Queue</h1>
    <div id="queue">
        <!-- Display the queue here -->
    </div>
    <audio id="audio" controls>
        <source src="" type="audio/mp3">
    </audio>
    <button id="playButton">Play</button>
    <button id="pauseButton">Pause</button>
    <button id="nextButton">Next</button>
    <button id="clearQueueButton">Clear Queue</button>
    <br>
    <input type="file" accept="audio/*" id="fileInput">
    <button id="addSongButton">Add Song</button>

    <script>
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
    </script>
</body>
</html>

