// const five = require("johnny-five");
// const board = new five.Board();
const axios = require('axios');
// board.on("ready", () => {
    /**
      @summary {} 
      data: device will keep track of sound level for the hour and will then call a lambda infomation 
      sound level: 

    */
//   const envelope = new five.Sensor({
//     pin: "A0",
//     freq: 250,
//     threshold: 4,
//   });
     let isOkayToSendNewMessage = true; 
//   envelope.on("change", (value) => {
//     console.log("value env", value);
      if ( value > 52 && isOkayToSendNewMessage) {
        axios.post('https://hooks.slack.com/services/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', {
          text: 'Hey Shut Up'
        })
        isOkayToSendNewMessage = false;
        setTimeout(() => {
          isOkayToSendNewMessage = true;
        }, 5000)
      }
//   });
// });