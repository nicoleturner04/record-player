const records = [
    {
        id: 1,
        name: "All I Wanna Do",
        artist: "The Beach Boys",
        message: "I have recently discovered this tune and its sick and I played it when were driving back from Butik and it now reminds me of that and looking at you driving you are so fit omg. I want to drive off to the Scottish Highlands with you and find a bush.",
        audioFile: "songs/beachboys.mp3",
        sleeveColor: "#ff6b6b",
        sleeveTextColor: "#ffffff"
    },
    {
        id: 2,
        name: "Inbetween Days",
        artist: "The Cure",
        message: "A James and Nicole pres classic. There was this one time we went out before a James and Nicole night and it was one of the most fun times and bonding times we have had out and we had a fun pres getting spangled and dancing in my room and it made me really happy.",
        audioFile: "songs/inbetweendays.mp3",
        sleeveColor: "#4ecdc4",
        sleeveTextColor: "#ffffff"
    },
    {
        id: 3,
        name: "Pictures of You",
        artist: "The Cure",
        message: "This is probably one of my if not my favourite song of all time and its probably the best love song of all time and no one has deserved this song before and then I met you so now when I listen to it I'm not sad but excited to spend my life with you.",
        audioFile: "songs/pictures.mp3",
        sleeveColor: "#ffe66d",
        sleeveTextColor: "#2a1a10"
    },
    {
        id: 4,
        name: "Faling Up",
        artist: "Carl Craig",
        message: "So I don't think I even have to explain this one but wow you have no idea what I felt watching you and dancing to you play, probably my most proud I have been of you our whole relationship, not that it will be the only one, but you did more for me than any other gig I have been to. It was unreal and special and my pants were on the floor. Honestly wow you are so talented and I cannot wait to dance to your tunes again.",
        audioFile: "songs/carl.mp3",
        sleeveColor: "#a8e6cf",
        sleeveTextColor: "#2a1a10"
    },
    {
        id: 5,
        name: "Bizzare Love Triangle",
        artist: "New Order",
        message: "This tune reminds me of when we went to Todmorden and just being in nature with you and the very start of our relationship. When I met you I didn't think you were a real person because you were just what I needed in my life and in some way the person I was looking for. Meeting you has changed my life, I have already learnt a lot about myself and am continuing to do so and I think you are making me a better person, and thank you for always trying. The start of our relationship was such a magical time and so exciting but I am also excited to experience everything in my life with you.",
        audioFile: "songs/neworder.mp3",
        sleeveColor: "#ff8a5c",
        sleeveTextColor: "#ffffff"
    },
    {
        id: 6,
        name: "Love Will Tear Us Apart",
        artist: "Joy Division",
        message: "Hello this reminds me of us and our home I mean the white hotel and when we were dancing at Rainy Miller and getting silly and falling in love with you. I know you didn't but I met you there and I was like wow who is this do you want to see my tits or something, wow I remember you walking in the DBA I was like yes lad wow so fit and then here we are who would've thought. I am so in love with you I don't think you understand, you are so beautiful and funny and smart and such a nice person and I can't wait to get to know you more and more everyday. ",
        audioFile: "songs/love.mp3",
        sleeveColor: "#6c5ce7",
        sleeveTextColor: "#ffffff"
    },
    {
        id: 7,
        name: "Tangerine",
        artist: "Led Zeppelin",
        message: "I don't know just funny. I bet this song reminds you of me",
        audioFile: "songs/song7.mp3",
        sleeveColor: "#fd79a8",
        sleeveTextColor: "#ffffff"
    },
    {
        id: 8,
        name: "While my guitar gently weeps",
        artist: "The Beatles",
        message: "When you came up in the taxi and this song came on as we were driving into Manchester and you could see the skyline but you were being bare annoying and pretending to know the lyrics but it was actuallly quite funny and I love you sometimes.",
        audioFile: "songs/song8.mp3",
        sleeveColor: "#00b894",
        sleeveTextColor: "#ffffff"
    },
    {
        id: 9,
        name: "The Rain Song",
        artist: "Led Zeppelin",
        message: "I want to make this our song because it's so beautiful and it was so nice when we came back from a night out and got silly and listened to this song like three times and I really like it and it's almost as beautiful as you. Fit.",
        audioFile: "songs/song9.mp3",
        sleeveColor: "#fdcb6e",
        sleeveTextColor: "#2a1a10"
    },
    {
        id: 10,
        name: "Your Song Title",
        artist: "Artist Name",
        message: "Your message here...",
        audioFile: "songs/song10.mp3",
        sleeveColor: "#e17055",
        sleeveTextColor: "#ffffff"
    }
];

// ============================================
// THE CODE
// ============================================

let currentRecord = null;
let isPlaying = false;
let currentAudio = null;
let isDraggingNeedle = false;
let needleStartX = 0;
let needleStartY = 0;
let needleStartRotate = 0;

// Shuffle function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Create records in the kallax - Square, black vinyl with colored center
function createRecords() {
    const shelf = document.getElementById('shelf');
    shelf.innerHTML = '';
    
    // Shuffle the records so they're random
    const shuffledRecords = shuffleArray([...records]);
    
    shuffledRecords.forEach((record, index) => {
        const sleeve = document.createElement('div');
        sleeve.className = 'record-sleeve';
        sleeve.dataset.id = record.id;
        sleeve.draggable = true;
        
        // Set the color for the center label (using currentColor)
        sleeve.style.color = record.sleeveColor;
        
        // Add tooltip with name on hover
        const tooltip = document.createElement('div');
        tooltip.className = 'sleeve-tooltip';
        tooltip.textContent = `${record.name} - ${record.artist}`;
        sleeve.appendChild(tooltip);
        
        // Play indicator
        const indicator = document.createElement('span');
        indicator.className = 'play-indicator';
        indicator.textContent = '▶';
        sleeve.appendChild(indicator);
        
        // Drag events
        sleeve.addEventListener('dragstart', handleDragStart);
        sleeve.addEventListener('dragend', handleDragEnd);
        
        // Click to play
        sleeve.addEventListener('click', () => playRecord(record.id));
        
        shelf.appendChild(sleeve);
    });
}

// Drag and drop handlers
function handleDragStart(e) {
    e.target.classList.add('dragging');
    e.dataTransfer.setData('text/plain', e.target.dataset.id);
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    document.getElementById('recordPlayer').classList.remove('drag-over');
}

// Setup drop zone
function setupDropZone() {
    const player = document.getElementById('recordPlayer');
    
    player.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        player.classList.add('drag-over');
    });
    
    player.addEventListener('dragleave', () => {
        player.classList.remove('drag-over');
    });
    
    player.addEventListener('drop', (e) => {
        e.preventDefault();
        player.classList.remove('drag-over');
        const id = e.dataTransfer.getData('text/plain');
        if (id) {
            playRecord(parseInt(id));
        }
    });
}

// Play a record
function playRecord(recordId) {
    const record = records.find(r => r.id === recordId);
    if (!record) return;
    
    // If same record is playing, stop it
    if (currentRecord === recordId && isPlaying) {
        stopRecord();
        return;
    }
    
    // Stop current if playing
    if (isPlaying) {
        stopRecord();
    }
    
    // Show the record on the player
    showRecordOnPlayer(record);
    
    // Play the song
    playSong(record.audioFile);
    
    // Show the message
    showMessage(record);
    
    // Update UI
    updateRecordUI(recordId);
    
    currentRecord = recordId;
    isPlaying = true;
    
    // Start spinning
    document.getElementById('platter').classList.add('spinning');
    document.getElementById('tonearm').classList.add('playing');
    
    // Setup needle interaction
    setupNeedleControl();
}

// Stop the record
function stopRecord() {
    isPlaying = false;
    currentRecord = null;
    isDraggingNeedle = false;
    
    // Stop audio
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }
    
    // Hide record from player
    document.getElementById('recordOnPlayer').classList.remove('show');
    document.getElementById('recordOnPlayer').style.display = 'none';
    
    // Stop spinning
    document.getElementById('platter').classList.remove('spinning');
    document.getElementById('tonearm').classList.remove('playing');
    
    // Reset message
    document.getElementById('songMessage').innerHTML = 'Choose a record';
    
    // Update UI
    document.querySelectorAll('.record-sleeve').forEach(el => {
        el.classList.remove('playing');
    });
}

// Show record on the player
function showRecordOnPlayer(record) {
    const recordDiv = document.getElementById('recordOnPlayer');
    recordDiv.style.display = 'block';
    recordDiv.style.background = `radial-gradient(circle at 30% 30%, #2a2a2a, #0a0a0a)`;
    recordDiv.innerHTML = `
        <div class="label" style="background: radial-gradient(circle at 30% 30%, ${record.sleeveColor}, ${adjustColor(record.sleeveColor, -40)})">
            ${record.name}
        </div>
    `;
    recordDiv.classList.add('show');
}

// Helper to darken colors
function adjustColor(color, percent) {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, Math.min(255, (num >> 16) + amt));
    const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amt));
    const B = Math.max(0, Math.min(255, (num & 0x0000FF) + amt));
    return `#${(1 << 24 | R << 16 | G << 8 | B).toString(16).slice(1)}`;
}

// Play song using MP3
function playSong(audioFile) {
    try {
        // Create audio element
        currentAudio = new Audio(audioFile);
        currentAudio.volume = 0.7;
        
        // Play
        currentAudio.play().catch(error => {
            console.log('Playback error:', error);
            document.getElementById('songMessage').innerHTML = 'Error playing song. Please check the file exists.';
        });
        
        // When song ends, stop the record
        currentAudio.addEventListener('ended', () => {
            stopRecord();
        });
        
    } catch (error) {
        console.log('Error:', error);
        document.getElementById('songMessage').innerHTML = 'Error loading song. Check the file path.';
    }
}

// Show the message
function showMessage(record) {
    const messageBox = document.getElementById('songMessage');
    messageBox.innerHTML = `
        <span class="highlight">${record.name}</span> 
        <span class="artist-name">by ${record.artist}</span>
        <br><br>
        ${record.message}
        <br><br>
        <span style="font-size: 11px; color: #888; font-style: italic;">Click the record again to stop</span>
        <br>
        <span style="font-size: 11px; color: #888; font-style: italic;">Drag the needle to skip through the song</span>
    `;
}

// Update the record shelf UI
function updateRecordUI(recordId) {
    document.querySelectorAll('.record-sleeve').forEach(el => {
        el.classList.remove('playing');
        if (parseInt(el.dataset.id) === recordId) {
            el.classList.add('playing');
        }
    });
}

// ============================================
// NEEDLE CONTROL - Drag to skip through song
// ============================================

function setupNeedleControl() {
    const tonearm = document.getElementById('tonearm');
    const platter = document.getElementById('platter');
    
    // Remove any existing listeners
    tonearm.removeEventListener('mousedown', startNeedleDrag);
    tonearm.removeEventListener('touchstart', startNeedleDragTouch);
    document.removeEventListener('mousemove', moveNeedle);
    document.removeEventListener('mouseup', endNeedleDrag);
    document.removeEventListener('touchmove', moveNeedleTouch);
    document.removeEventListener('touchend', endNeedleDragTouch);
    
    // Mouse events
    tonearm.addEventListener('mousedown', startNeedleDrag);
    document.addEventListener('mousemove', moveNeedle);
    document.addEventListener('mouseup', endNeedleDrag);
    
    // Touch events for mobile
    tonearm.addEventListener('touchstart', startNeedleDragTouch);
    document.addEventListener('touchmove', moveNeedleTouch);
    document.addEventListener('touchend', endNeedleDragTouch);
}

function startNeedleDrag(e) {
    if (!isPlaying || !currentAudio) return;
    e.preventDefault();
    isDraggingNeedle = true;
    needleStartX = e.clientX;
    needleStartY = e.clientY;
    
    // Get current rotation
    const tonearm = document.getElementById('tonearm');
    const style = window.getComputedStyle(tonearm);
    const transform = style.transform;
    if (transform !== 'none') {
        const matrix = transform.match(/matrix.*\((.+)\)/);
        if (matrix) {
            const values = matrix[1].split(', ');
            const angle = Math.atan2(parseFloat(values[1]), parseFloat(values[0]));
            needleStartRotate = angle * (180 / Math.PI);
        }
    } else {
        needleStartRotate = -35;
    }
    
    document.getElementById('tonearm').style.cursor = 'grabbing';
}

function startNeedleDragTouch(e) {
    if (!isPlaying || !currentAudio) return;
    e.preventDefault();
    const touch = e.touches[0];
    isDraggingNeedle = true;
    needleStartX = touch.clientX;
    needleStartY = touch.clientY;
    
    const tonearm = document.getElementById('tonearm');
    const style = window.getComputedStyle(tonearm);
    const transform = style.transform;
    if (transform !== 'none') {
        const matrix = transform.match(/matrix.*\((.+)\)/);
        if (matrix) {
            const values = matrix[1].split(', ');
            const angle = Math.atan2(parseFloat(values[1]), parseFloat(values[0]));
            needleStartRotate = angle * (180 / Math.PI);
        }
    } else {
        needleStartRotate = -35;
    }
}

function moveNeedle(e) {
    if (!isDraggingNeedle || !isPlaying || !currentAudio) return;
    e.preventDefault();
    
    const deltaX = e.clientX - needleStartX;
    const deltaY = e.clientY - needleStartY;
    
    // Calculate rotation based on horizontal and vertical movement
    // Moving right increases rotation (moves needle toward center)
    // Moving up also increases rotation
    const rotationChange = (deltaX * 0.15) - (deltaY * 0.1);
    const newRotation = Math.max(-45, Math.min(-5, needleStartRotate + rotationChange));
    
    // Apply rotation to tonearm
    const tonearm = document.getElementById('tonearm');
    tonearm.style.transform = `rotate(${newRotation}deg)`;
    
    // Map rotation to seek position (0 to 1)
    // -45deg = start of song, -5deg = end of song
    const seekPercent = (newRotation + 45) / 40; // Maps -45 to -5 → 0 to 1
    const clampedSeek = Math.max(0, Math.min(1, seekPercent));
    
    // Seek in the audio
    if (currentAudio && currentAudio.duration) {
        const seekTime = clampedSeek * currentAudio.duration;
        currentAudio.currentTime = seekTime;
        
        // Update message to show position
        updateSeekMessage(clampedSeek);
    }
}

function moveNeedleTouch(e) {
    if (!isDraggingNeedle || !isPlaying || !currentAudio) return;
    e.preventDefault();
    const touch = e.touches[0];
    
    const deltaX = touch.clientX - needleStartX;
    const deltaY = touch.clientY - needleStartY;
    
    const rotationChange = (deltaX * 0.15) - (deltaY * 0.1);
    const newRotation = Math.max(-45, Math.min(-5, needleStartRotate + rotationChange));
    
    const tonearm = document.getElementById('tonearm');
    tonearm.style.transform = `rotate(${newRotation}deg)`;
    
    const seekPercent = (newRotation + 45) / 40;
    const clampedSeek = Math.max(0, Math.min(1, seekPercent));
    
    if (currentAudio && currentAudio.duration) {
        const seekTime = clampedSeek * currentAudio.duration;
        currentAudio.currentTime = seekTime;
        updateSeekMessage(clampedSeek);
    }
}

function endNeedleDrag(e) {
    if (isDraggingNeedle) {
        isDraggingNeedle = false;
        document.getElementById('tonearm').style.cursor = 'pointer';
        
        // Return to playing position smoothly
        const tonearm = document.getElementById('tonearm');
        tonearm.style.transition = 'transform 0.5s ease';
        tonearm.style.transform = `rotate(-15deg)`;
        
        // Reset transition after animation
        setTimeout(() => {
            tonearm.style.transition = 'transform 1s ease';
        }, 500);
    }
}

function endNeedleDragTouch(e) {
    if (isDraggingNeedle) {
        isDraggingNeedle = false;
        const tonearm = document.getElementById('tonearm');
        tonearm.style.transition = 'transform 0.5s ease';
        tonearm.style.transform = `rotate(-15deg)`;
        
        setTimeout(() => {
            tonearm.style.transition = 'transform 1s ease';
        }, 500);
    }
}

function updateSeekMessage(percent) {
    const timeInSeconds = percent * currentAudio.duration;
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const totalMinutes = Math.floor(currentAudio.duration / 60);
    const totalSeconds = Math.floor(currentAudio.duration % 60);
    
    const messageBox = document.getElementById('songMessage');
    // Only update the time display, keep the rest of the message
    const currentHTML = messageBox.innerHTML;
    const timeDisplay = `<br><span style="font-size: 11px; color: #666;">⏱ ${minutes}:${seconds.toString().padStart(2, '0')} / ${totalMinutes}:${totalSeconds.toString().padStart(2, '0')}</span>`;
    
    // Remove old time display and add new one
    const baseMessage = currentHTML.replace(/<br><span style="font-size: 11px; color: #666;">.*?<\/span>/, '');
    messageBox.innerHTML = baseMessage + timeDisplay;
}

// Initialize everything
function init() {
    createRecords();
    setupDropZone();
}

// Start when page loads
window.addEventListener('DOMContentLoaded', init);