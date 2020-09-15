const express = require('express');
let app = express();
const helpers = require('../helpers/github.js');
const parser = require('body-parser');
const { save, find } = require('../database/index.js');
const axios = require('axios');
app.use(parser.json());
app.use(express.static(__dirname + '/../client/dist'));
app.use(parser.urlencoded({ extended: true }));

app.post('/repos', function(req, res) {
  console.log('POST REQUEST RECEIVED');
  let { username } = req.body;
  if (!username) {
    res.sendStatus(400);
    return;
  }
  // get repos by id
  helpers.getReposByUsername(username, (err, repos) => {
    if (err) {
      res.sendStatus(500);
      console.log(err);
    } else {
      console.log('REPOS PRIOR TO STORAGE', repos);
      save(repos)
        .then(() => {
          console.log('REPOS SUCCESSFULLY STORED IN DB')
          res.sendStatus(201);
        })
        .catch(err => {
          console.log('REPOS COULD NOT BE STORED IN DB')
          res.sendStatus(500);
        });
    }
  });
});

app.get('/repos', function(req, res) {
  find()
    .then(repos => {
      console.log('REPOS SUCCESSFULLY FETCHED FROM DB', repos);
      res.status(200).send(repos);
    })
    .catch(err => {
      console.log('COULD NOT GET REPOS FROM DB')
      console.log(err);
    });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
