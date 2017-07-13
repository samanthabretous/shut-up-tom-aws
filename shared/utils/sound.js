export const hasGetUserMedia = () => {
  return !!(
    navigator.getUserMedia || 
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia
  );
}


export const getSound = (stream) => {
  // Audio stops listening in FF without // window.persistAudioStream = stream;
  // https://bugzilla.mozilla.org/show_bug.cgi?id=965483
  //https://support.mozilla.org/en-US/questions/984179
  window.persistAudioStream = stream;
  var audioContent = new AudioContext();
  var audioStream = audioContent.createMediaStreamSource( stream );
  var analyser = audioContent.createAnalyser();
  audioStream.connect(analyser);
  analyser.fftSize = 1024;

  var frequencyArray = new Uint8Array(analyser.frequencyBinCount);

  return { frequencyArray, analyser };
}