const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  owner: String,
  url: {type: String, unique: true},
  name: String,
  stars: Number,
  watchers: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = repos => {
  return Promise.all(
    repos.map(repo => {
      return Repo.findOneAndUpdate(
        {url: repo.html_url},
        {
          owner: repo.owner.login,
          url: repo.html_url,
          name: repo.name,
          stars: repo.stargazers_count,
          watchers: repo.watchers
        },
        {upsert: true}
      );
    })
  );
};

let find = () => {
  return Repo.find({})
  .lean()
  .sort({stars: -1, watchers: -1})
  .limit(25)
  .exec(function(err, docs) {
    console.log('RETRIEVED DOCS', docs); //docs contains list of repo objects
  });
}



module.exports.save = save;
module.exports.find = find;
