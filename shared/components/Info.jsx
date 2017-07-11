import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Info extends React.Component {
  constructor() {
    super();
    this.state = {
      isSoundAccepted: false
    };
    this.hasGetUserMedia = this.hasGetUserMedia.bind(this);
    this.soundAllowed = this.soundAllowed.bind(this);
    this.soundNotAllowed = this.soundNotAllowed.bind(this);
  }
  componentDidMount() {
    if (this.hasGetUserMedia()) {
      navigator.getUserMedia({audio:true}, this.soundAllowed, this.soundNotAllowed);
      // Good to go!
    } else {
      alert('getUserMedia() is not supported in your browser');
    }
  }
  hasGetUserMedia() {
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
              navigator.mozGetUserMedia || navigator.msGetUserMedia);
  }
  soundAllowed(stream) {
    this.setState({ isSoundAccepted: true })

    //Audio stops listening in FF without // window.persistAudioStream = stream;
    //https://bugzilla.mozilla.org/show_bug.cgi?id=965483
    //https://support.mozilla.org/en-US/questions/984179
    window.persistAudioStream = stream;
    var audioContent = new AudioContext();
    var audioStream = audioContent.createMediaStreamSource( stream );
    var analyser = audioContent.createAnalyser();
    audioStream.connect(analyser);
    analyser.fftSize = 1024;

    var frequencyArray = new Uint8Array(analyser.frequencyBinCount);

    //Through the frequencyArray has a length longer than 255, there seems to be no
    //significant data after this point. Not worth visualizing.
    const doDraw = () => {
      requestAnimationFrame(doDraw);
      analyser.getByteFrequencyData(frequencyArray);
      var adjustedLength;
      for (var i = 0 ; i < 255; i++) {
        adjustedLength = Math.floor(frequencyArray[i]) - (Math.floor(frequencyArray[i]) % 5);
      }
    }
    doDraw();
  }
  soundNotAllowed(error) {
    this.setState({ isSoundAccepted: false })
  }
  render() {
    return (
      <main className="info">
        {!this.state.isSoundAccepted
         ? <h2 className="welcome">Welcome. Please allow the use of your microphone to start the magic!!</h2>
         : <h2>Magic is about to happen. Shhhhh!</h2>
        }
        <h1>{"team_name"}</h1>
        <p className="channel">{"channel"}</p>
      </main>
    );
  }
}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps)(Info));

