import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    };
    this.search = this.search.bind(this);
    this.getRepos = this.getRepos.bind(this);


  }
  componentDidMount() {
    this.getRepos();
  }

  getRepos() {
    return axios.get('/repos').then(({ data }) => {
      this.setState({
        repos: data
      });
    });
  }

  search(term) {
    console.log(`${term} was searched`);
    $.post('/repos', {username: term})
    .done((data) => {
      //console.log('POST REQUEST MADE TO SERVER');
      //if post request goes through, then make get request
      $.get('/repos')
      .done((data) => { //data doesnt contain anything atm
        //console.log('DATA WAS SUCCESSFULLY FETCHED FROM SERVER', data);
        this.setState({
          repos: data
        });
      })
      .catch((err) => {
        //console.log('THERE WAS AN ERROR GETTING DATA FROM SERVER :(');
      });
    })
    .fail((error) => {
      console.log('ERROR: ', error);
    });
  }



  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
