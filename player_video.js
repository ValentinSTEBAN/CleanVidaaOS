const player = document.getElementById("player");
const video = document.getElementById("mainPlayer");
const play = document.getElementById("play");
const back = document.getElementById("back");
const forward = document.getElementById("forward");
const progress = document.getElementById("progress");
const time = document.getElementById("time");
const volume = document.getElementById("volume");
const mute = document.getElementById("mute");
const fullscreen = document.getElementById("fullscreen");

play.addEventListener("click", function () {
    if (video.paused) {
        video.play();
        play.textContent = "❚❚";
    } else {
        video.pause();
        play.textContent = "▶";
    }
});

back.addEventListener("click", function () {
    video.currentTime -= 10;
});

forward.addEventListener("click", function () {
    video.currentTime += 10;
});

video.addEventListener("timeupdate", function () {
    if (!isNaN(video.duration)) {
        const percentage =
            (video.currentTime / video.duration) * 100;
        progress.value = percentage;
        time.textContent =
            formatTime(video.currentTime)
            + " / "
            + formatTime(video.duration);
    }
});

progress.addEventListener("input", function () {
    if (!isNaN(video.duration)) {
        video.currentTime =
            (progress.value / 100) * video.duration;
    }
});

volume.addEventListener("input", function () {
    video.volume = volume.value;
    if (video.volume === 0) {
        mute.textContent = "🔇";
    } else {
        mute.textContent = "🔊";
    }
});

mute.addEventListener("click", function () {
    video.muted = !video.muted;
    if (video.muted) {
        mute.textContent = "🔇";
    } else {
        mute.textContent = "🔊";
    }
});

fullscreen.addEventListener("click", async function () {
    try {
        if (!document.fullscreenElement) {
            await player.requestFullscreen();
        } else {
            await document.exitFullscreen();
        }
    } catch (error) {
        console.error(
            "Erreur plein écran :",
            error
        );
    }
});


const resultatsFullScreen = document.getElementById('resultatsFullScreen');
const srtIn = document.getElementById('srtFileInput');
let fullscreenBool = false;

document.addEventListener("fullscreenchange", function () {
    if (document.fullscreenElement) {
        if (srtIn.value != '') {
            resultatsFullScreen.style.display = 'block';
        } else {
            resultatsFullScreen.style.display = 'none';
        }
        fullscreen.textContent = "✕";
        player.style.border = '1px black solid';
    } else {
        resultatsFullScreen.style.display = 'none';
        fullscreen.textContent = "⛶";
        player.style.border = '1px red solid';
    }
});

function formatTime(seconds) {
    if (isNaN(seconds)) {
        return "0:00";
    }
    const minutes =
        Math.floor(seconds / 60);
    const secondes =
        Math.floor(seconds % 60);
    return minutes
        + ":"
        + String(secondes).padStart(2, "0");
}

let hideTimeout;

function showControls() {
    player.classList.remove("hide-controls");
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(function () {
        if (!video.paused) {
            player.classList.add("hide-controls");
        }
    }, 3000);
}

player.addEventListener("mousemove", showControls);

player.addEventListener("touchstart", showControls);

video.addEventListener("click", function () {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
});

video.addEventListener("play", function () {
    play.textContent = "❚❚";
    showControls();
});


video.addEventListener("pause", function () {
    play.textContent = "▶";
    player.classList.remove("hide-controls");
});

document.addEventListener("keydown", function (event) {
    if (
        event.code === "Space"
        && document.activeElement.tagName !== "INPUT"
    ) {
        event.preventDefault();
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }

    if (event.code === "ArrowLeft") {
        video.currentTime -= 5;
        showControls();
    }

    if (event.code === "ArrowRight") {
        video.currentTime += 5;
        showControls();
    }

    if (
        event.key.toLowerCase() === "f"
        && document.activeElement.tagName !== "INPUT"
    ) {
        fullscreen.click();
    }
});
