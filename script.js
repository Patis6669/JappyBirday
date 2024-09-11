const starsElement = document.getElementById('stars');
for (let i = 0; i < 300; i++) {
    const star = document.createElement('div');
    star.style.position = 'absolute';
    star.style.backgroundColor = 'white';
    star.style.width = star.style.height = `${Math.random() * 2 + 1}px`;
    star.style.top = `${Math.random() * window.innerHeight}px`;
    star.style.left = `${Math.random() * window.innerWidth}px`;
    star.style.borderRadius = '50%';
    star.style.boxShadow = `0 0 ${Math.random() * 5 + 5}px rgba(255,255,255,0.5)`;
    star.style.animation = `twinkle ${Math.random() * 5 + 5}s infinite ease-in-out`;
    starsElement.appendChild(star);
}

window.onload = function() {
    var audio = document.getElementById("autoplayAudio");
    var playButton = document.getElementById("playButton");
    audio.volume = 0.04
    audio.play().then(function() {
        setTimeout(function() {
            audio.pause(); // Detiene la música
            audio.currentTime = 0; // Reinicia la música
        }, 30000);
    }).catch(function(error) {
        
        console.log("El navegador bloqueó la reproducción automática: ", error);
        playButton.style.display = "block"; 
    });

    // Reproduce la canción al hacer clic en el botón
    playButton.addEventListener("click", function() {
        audio.play();
        playButton.style.display = "none"; 
        setTimeout(function() {
            audio.pause(); 
            audio.currentTime = 0; 
        }, 30000);
    });
};
