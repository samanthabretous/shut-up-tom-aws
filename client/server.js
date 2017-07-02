const path = require('path');
const express = require('express');
const app = express();

const staticPath = path.join(__dirname, './app/build');
app.use(express.static(staticPath));

app.get('*', (req, res) => {
  res.sendfile(path.join(__dirname, 'app/index.html'))
})


app.listen(3000, () => {
  console.log('Shut Up tom client is listening to port 3000');
});
