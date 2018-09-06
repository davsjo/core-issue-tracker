/*
//Fetch all new (not assigned, no project) Qlik Core issues from qlik-oss. Exclude 
possibiliites (picasso.js..)
//get all issues https://api.github.com/repos/qlik-oss/enigma.js/issues?page=1&per_page=100
//GET /repos/:owner/:repo/issues
//GET /repos/:owner/:repo/issues/:number
//GET /repos/:owner/:repo/issues
//const { URL } = require('url');
//const myURLs = [
//  new URL('https://api.github.com/repos/qlik-oss/enigma.js/issues?page=1&per_page=100'),
//];
//console.log(JSON.stringify(myURLs));
*/
const request = require('request');
const fs = require('fs');
const configuration = require('./config.js')
const options = {
  url: 'https://api.github.com/orgs/qlik-oss/issues?filter=all&state=open&per_page=500',
  headers: {
    'User-Agent': 'request',
    Authorization: `token ${configuration.githubToken}`,
  },
};

request(options, (error, response, body) => {
  if (!error && response.statusCode === 200) {
    const info = JSON.parse(body);
    fs.writeFileSync('./data/repo_info.json', JSON.stringify(info), 'utf8');
  } else {
    console.log(JSON.stringify(error));
  }
});
