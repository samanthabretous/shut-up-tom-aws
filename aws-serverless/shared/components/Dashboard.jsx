import React from 'react';

export default class Dashboard extends React.Component {
  render() {
    console.log(props)
    return (
      <main className="dashboard">
        <section className="reading">
          <h3>82 dB</h3>
          <p className="level"></p>
        </section>
        <section className="characters">
          <figure className="character">
            <img className="character__bubble character__cloud" src="/images/cloud.svg" alt=""/>
            <button id="stress" className="character__button character__button-js character__stress" type="button" name="button">
              <img className="character__monster" src="/images/stress-character.png" alt=""/>
            </button>
          </figure>
          <figure className="character">
            <img className="character__bubble character__speak" src="/images/speak.svg" alt=""/>
            <button id="tall" className="character__button character__button-js character__tall" type="button" name="button">
              <img className="character__monster" src="/images/tall-character.png" alt=""/>
            </button>
          </figure>
          <figure className="character">
            <img className="character__bubble character__music" src="/images/music.svg" alt=""/>
            <button id="horn" className="character__button character__button-js character__horn" type="button" name="button">
              <img className="character__monster" src="/images/horn-character.png" alt=""/>
            </button>
          </figure>
        </section>
      </main>
    );
  }
}
