document.getElementById('createRoom').addEventListener('click', () => {
    const roomNickname = prompt("Enter a nickname for your room:");
    if (roomNickname) {
        const roomCode = roomNickname.replace(/\s+/g, '-').toLowerCase();
        window.location.href = `https://meet.jit.si/${roomCode}`;
    } else {
        alert("Room nickname cannot be empty.");
    }
});

document.getElementById('joinRoom').addEventListener('click', () => {
    const roomCode = document.getElementById('roomCode').value.trim();
    if (roomCode) {
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