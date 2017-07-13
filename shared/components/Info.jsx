import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { hasGetUserMedia } from '../utils/sound.js';

class Info extends React.Component {

  render() {
    return (
      <main className="info">
        {!this.state.isSoundAccepted
         ? <h2 className="welcome">Welcome. Please allow the use of your microphone to start the magic!!</h2>
         : <h2>Magic is about to happen. Shhhhh!</h2>
        }
        <h1>{this.props.team.team_name}</h1>
        <p className="channel">{this.props.team.incoming_webhook.channel}</p>
        <p>{this.state.soundLevel}</p>
      </main>
    );
  }
}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps)(Info));

