document.getElementById('createRoom').addEventListener('click', () => {
    const roomCode = Math.random().toString(36).substring(2, 8);
    window.location.href = `https://meet.jit.si/${roomCode}`;
});

document.getElementById('joinRoom').addEventListener('click', () => {
    const roomCode = document.getElementById('roomCode').value.trim();
    if (roomCode) {
        window.location.href = `https://meet.jit.si/${roomCode}`;
    } else {
        alert("Please enter a room code.");
    }
});