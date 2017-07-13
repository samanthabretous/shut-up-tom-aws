import React from "react";
import { NavLink, Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { CustomMessages, Dashboard, Info } from "../components";

class Main extends React.Components {
    constructor() {
    super();
    this.state = {
      isSoundAccepted: false,
      soundLevel: 0,
    };
    this.hasGetUserMedia = this.hasGetUserMedia.bind(this);
    this.soundAllowed = this.soundAllowed.bind(this);
    this.soundNotAllowed = this.soundNotAllowed.bind(this);
  }
  componentDidMount() {
    if (hasGetUserMedia()) {
      navigator.getUserMedia({audio:true}, this.soundAllowed, this.soundNotAllowed);
      // Good to go!
    } else {
      alert('getUserMedia() is not supported in your browser');
    }
  }
  hasGetUserMedia() {
    return !!(
      navigator.getUserMedia || 
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia
    );
  }
  soundAllowed(stream) {
    this.setState({ isSoundAccepted: true })
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
    let fpsInterval = 500;
    let then = Date.now();
    let now, elapsed;
    const doDraw = () => {
      requestAnimationFrame(() => doDraw());

      now = Date.now();
      elapsed = now - then;

      // if enough time has elapsed, draw the next frame
      if (elapsed > fpsInterval) {

          // Get ready for next frame by setting then=now, but also adjust for your
          // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
          then = now - (elapsed % fpsInterval);

          let sum = 0;
          analyser.getByteFrequencyData(frequencyArray);
          for (var i = 0 ; i < 255; i++) {
            if(frequencyArray[i] > 400) {
              count += 1
            }
            sum += frequencyArray[i];
          }
          const avg = (sum / 255);
          if(avg > 125) {
            console.log(true)
          }
          // if(oldAvg <= (avg + 50)) {
          //   console.log( oldAvg, avg + 50)
            this.setState({ soundLevel: avg })
          // }

      }
    }

    doDraw();


  }
  soundNotAllowed(error) {
    this.setState({ isSoundAccepted: false })
  }
  render() {
    return (
      <div className="main-container">
        <aside className="sidebar">
          <nav>
            <NavLink className="link__dashboard" to={`${props.relURL}/dashboard`}><i className="fa fa-home fa-2x" aria-hidden="true"></i></NavLink>
            <NavLink className="link__info" to={`${props.relURL}/info`}><i className="fa fa-info fa-2x" aria-hidden="true"></i></NavLink>
            <NavLink className="link__custom-messages" to={`${props.relURL}/custom-messages`}><i className="fa fa-comments fa-2x" aria-hidden="true"></i></NavLink>
            <NavLink className="link__graph" to={`${props.relURL}/graph`}><i className="fa fa-signal fa-2x" aria-hidden="true"></i></NavLink>
            <NavLink className="link__schedule" to={`${props.relURL}/schedule`}><i className="fa fa-clock-o fa-2x" aria-hidden="true"></i></NavLink>
          </nav>
        </aside>
        <Switch>
          <Route path={`${props.relPath}/custom-messages`} component={CustomMessages}/>
          <Route path={`${props.relPath}/dashboard`} component={Dashboard}/>
          <Route path={`${props.relPath}/info`} component={Info}/>
        </Switch>
      </div>
    )
  }
}
const mapStateToProps = (state) => (state)

export default withRouter(connect(mapStateToProps)(Main));
