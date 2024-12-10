// Theme handling
document.getElementById('themeToggle').addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);

    // Update theme icon
    const themeIcon = document.querySelector('#themeToggle i');
    themeIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

    // Update logo
    const logo = document.getElementById('logo');
    logo.src = newTheme === 'dark' ? 'assets/logo-dark.png' : 'assets/logo-light.png';

    // Save theme preference
    localStorage.setItem('theme', newTheme);
});

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
document.querySelector('#themeToggle i').className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

// Set logo on load
const logo = document.getElementById('logo');
logo.src = savedTheme === 'dark' ? 'assets/logo-dark.png' : 'assets/logo-light.png';

// Room creation
document.getElementById('createRoom').addEventListener('click', () => {
    const roomName = document.getElementById('roomName').value.trim();
    const roomType = document.getElementById('roomType').value;

    if (!roomName) {
        alert('Please enter a room name');
        return;
    }

    // Generate room code from name
    const roomCode = roomName.toLowerCase().replace(/\s+/g, '-') + '-' + Math.random().toString(36).substr(2, 4);

    // Save room to recent rooms
    saveRecentRoom(roomCode, roomName, roomType);

    // Redirect to Jitsi with room settings
    const username = prompt('Enter your display name:');
    if (username) {
        joinRoom(roomCode, username);
    }
});

// Room joining
document.getElementById('joinRoom').addEventListener('click', () => {
    const roomCode = document.getElementById('roomCode').value.trim();
    
    if (!roomCode) {
        alert('Please enter a room code');
        return;
    }

    const username = prompt('Enter your display name:');
    if (username) {
        joinRoom(roomCode, username);
    }
});

// Join room function
function joinRoom(roomCode, username) {
    const roomURL = `https://meet.jit.si/${roomCode}#userInfo.displayName="${username}"`;
    window.location.href = roomURL;
}

// Save recent room
function saveRecentRoom(code, name, type) {
    const recentRooms = JSON.parse(localStorage.getItem('recentRooms') || '[]');
    
    // Add new room to beginning of array
    recentRooms.unshift({
        code,
        name,
        type,
        timestamp: new Date().toISOString()
    });

    // Keep only last 5 rooms
    if (recentRooms.length > 5) {
        recentRooms.pop();
    }

    localStorage.setItem('recentRooms', JSON.stringify(recentRooms));
    updateRecentRoomsList();
}

// Update recent rooms list
function updateRecentRoomsList() {
    const recentRooms = JSON.parse(localStorage.getItem('recentRooms') || '[]');
    const roomsList = document.getElementById('roomsList');
    
    roomsList.innerHTML = recentRooms.map(room => `
        <div class="room-card">
            <h3>${room.name}</h3>
            <p>Type: ${room.type}</p>
            <p>Created: ${new Date(room.timestamp).toLocaleDateString()}</p>
            <button class="secondary-button" onclick="joinRoom('${room.code}', prompt('Enter your display name:'))">
                <i class="fas fa-sign-in-alt"></i> Join
            </button>
        </div>
    `).join('');
}

// Initial load of recent rooms
updateRecentRoomsList();