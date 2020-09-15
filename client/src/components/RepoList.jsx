import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    {props.repos.map((repo, key) => {
      return <li>Repo: <a href={repo.url}>{repo.name}</a> | Owner: {repo.owner} | Star Count: {repo.stars} | Watchers: {repo.watchers}</li>
    })}
  </div>
)

export default RepoList;
