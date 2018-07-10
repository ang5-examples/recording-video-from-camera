const express = require('express');
const path = require('path');

const app = express();

const port = process.env.PORT || 8080;
const distPath = path.join(__dirname, '../dist/test-record');

// Serve only the static files form the dist directory
app.use(express.static(distPath));

app.get('/*', function(req, res) {
  res.sendFile(path.join(path.join(__dirname, '../dist/test-record/index.html')));
});

// Start the app by listening on the default Heroku port
app.listen(port, function() {
  console.log('Express server listening on port: ' + port);
  console.log('env = ' + process.env.NODE_ENV + '\n__dirname = ' + __dirname + '\nprocess.cwd = ' + process.cwd());
});
