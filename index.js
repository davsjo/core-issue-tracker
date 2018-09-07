const request = require('request');
const fs = require('fs');
const configuration = require('./config.js')
const JSON2CSV = require('./JSON_to_CSV_parser.js');
//const enginecomm = require('./enginecomm.js');

const options = {
  url: 'https://api.github.com/orgs/qlik-oss/issues?filter=all&state=open&per_page=500',
  headers: {
    'User-Agent': 'request',
    Authorization: `token ${configuration.githubToken}`,
  },
};

let prevJSONBlob = '';

const featchGithubData = () => {
  console.log(options);
  request(options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      if(!(prevJSONBlob === body)){
        console.log('New issues - do reload');
        const info = JSON.parse(body);

        // Create json files and parse to CSV
        fs.writeFileSync('./data/repo_info.json', JSON.stringify(info), 'utf8');
        JSON2CSV.parseRepoIssues();
        JSON2CSV.writeIssuesToCsv(configuration.filePathRecentIssues);

        // Push new csv file to engine

        // Do reload

        prevJSONBlob = body;
      } else {
        console.log("No new issues");
      }
    } else {
      console.log(JSON.stringify(error));
    }
  });
}

featchGithubData();
//setInterval(featchGithubData, configuration.fetchTime);