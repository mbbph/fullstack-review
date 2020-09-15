const express = require('express');
let app = express();
const helpers = require('../helpers/github.js');

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  let {username} = req.body;
  if (!username) {
    res.sendStatus(400);
    res.end();
  }
  helpers.getReposByUsername(username, (err, repos) => {
    if (err) {
      res.sendStatus(500);
    } else {
      save(repos)
      .then(() => {
        res.sendStatus(201);
      })
      .catch(err => {
        res.sendStatus(500);
      });
    }
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  find()
  .then(repos => {
    res.send(repos);
  })
  .catch(err => {
    console.log(err);
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
