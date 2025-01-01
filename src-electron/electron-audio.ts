
let audioContext:AudioContext;
let audioAnalyser:any
export function setupAudioContext() {
  audioContext = new AudioContext();
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(function (stream) {
      const microphoneSource = audioContext.createMediaStreamSource(stream);
      // Connect microphoneSource to your audio visualization logic.
    })
    .catch(function (error) {
      console.error('Error accessing microphone:', error);
    });

}
