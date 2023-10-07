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
