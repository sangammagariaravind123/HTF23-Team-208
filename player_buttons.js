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
        function playPreviousSong() {
            if (currentSongIndex < queue.length - 1) {
                currentSongIndex--;
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