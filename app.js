const roomHistoryKey = "studySyncRoomHistory";

function saveRoomToHistory(roomCode) {
    let history = JSON.parse(localStorage.getItem(roomHistoryKey)) || [];
    if (!history.includes(roomCode)) {
        history.push(roomCode);
        localStorage.setItem(roomHistoryKey, JSON.stringify(history));
    }
}

function displayRoomHistory() {
    const history = JSON.parse(localStorage.getItem(roomHistoryKey)) || [];
    const historyContainer = document.getElementById("historyContainer");
    historyContainer.innerHTML = "";

    if (history.length === 0) {
        historyContainer.innerHTML = "<p>No room history yet.</p>";
        return;
    }

    history.forEach((room) => {
        const roomLink = document.createElement("button");
        roomLink.textContent = room;
        roomLink.onclick = () => {
            window.location.href = `https://meet.jit.si/${room}`;
        };
        roomLink.className = "history-button";
        historyContainer.appendChild(roomLink);
    });
}

// Save and load room history
document.getElementById('createRoom').addEventListener('click', () => {
    const roomNickname = prompt("Enter a nickname for your room:");
    if (roomNickname) {
        const roomCode = roomNickname.replace(/\s+/g, '-').toLowerCase();
        saveRoomToHistory(roomCode);
        window.location.href = `https://meet.jit.si/${roomCode}`;
    } else {
        alert("Room nickname cannot be empty.");
    }
});

document.getElementById('joinRoom').addEventListener('click', () => {
    const roomCode = document.getElementById('roomCode').value.trim();
    if (roomCode) {
        saveRoomToHistory(roomCode);
        const username = prompt("Enter your username:");
        if (username) {
            const roomURL = `https://meet.jit.si/${roomCode}#userInfo.displayName="${username}"`;
            window.location.href = roomURL;
        } else {
            alert("Username cannot be empty.");
        }
    } else {
        alert("Please enter a room code.");
    }
});

// Display history on page load
document.addEventListener('DOMContentLoaded', displayRoomHistory);