const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  axios.get('https://api.github.com/users/' + username + '/repos', {
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  })
  .then(function (response) {
    console.log('repos were fetched from github');
    callback(null, response.data)
  })
  .catch(function(err) {
    callback(err);
  });
};



module.exports.getReposByUsername = getReposByUsername;
