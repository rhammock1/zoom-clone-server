const myVideo = document.createElement('video');
myVideo.muted = true; // set true for testing purposes

let videoStream;

navigator.mediaDevices.getUserMedia({   // Get video and audio from Chrome
    video: true,
    audio: true,
}).then((stream) => {
    videoStream = stream;

    addVideoStream(myVideo, stream);
})

const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    })
}