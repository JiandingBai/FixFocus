const script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/npm/webgazer";
document.head.appendChild(script);

script.onload = () => {
  console.log("WebGazer.js has loaded successfully.");
  webgazer.setGazeListener((data, timestamp) => {
    console.log("Gaze Data:", data);
  }).begin();
};

script.onerror = () => {
  console.error("Failed to load WebGazer.js. Check your internet connection or URL.");
};

let gazeOffScreen = false;

window.onload = async () => {
  // Wait for WebGazer to load
  await webgazer.setGazeListener((data, timestamp) => {
    if (!data) return;

    // Define on-screen bounds (adjust as needed)
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const x = data.x; // Gaze X coordinate
    const y = data.y; // Gaze Y coordinate

    // Check if gaze is within bounds
    if (x < 0 || x > screenWidth || y < 0 || y > screenHeight) {
      gazeOffScreen = true;
      pauseVideo();
    } else {
      gazeOffScreen = false;
      resumeVideo();
    }
  }).begin();
};

// Pause all videos
function pauseVideo() {
  const videos = document.querySelectorAll("video");
  videos.forEach(video => {
    if (!video.paused) video.pause();
  });
}

// Resume all videos
function resumeVideo() {
  const videos = document.querySelectorAll("video");
  videos.forEach(video => {
    if (video.paused && !gazeOffScreen) video.play();
  });
}

