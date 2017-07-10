var axios = require('axios');

module.exports = {
  fetchPopularRepos: function (language) { 
    var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+language + '&sort=stars&order=desc&type=Repositories'); 

    return axios.get(encodedURI) //returns a promise, so you can call .then
      .then(function (response) { // when a request to the url happens 
      	return response.data.items;
      });
    }
};
