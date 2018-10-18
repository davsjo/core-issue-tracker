/* eslint no-console:0 */
const request = require('request');
const configuration = require('./config.js');
const JSON2CSV = require('./JSON_to_CSV_parser.js');
const enginecomm = require('./enginecomm.js');

const options = {
  url: 'https://api.github.com/orgs/qlik-oss/issues?filter=all&state=open&per_page=500',
  headers: {
    'User-Agent': 'request',
    Authorization: `token ${configuration.githubToken}`,
  },
};

let prevJSONBlob = '';

const fetchGithubData = () => {
  console.log(options);
  request(options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      if (!(prevJSONBlob === body)) {
        console.log('New issues - do reload');
        const info = JSON.parse(body);

        // Create json files and parse to CSV
        JSON2CSV.parseRepoIssues(JSON.stringify(info));
        JSON2CSV.writeIssuesToCsv(configuration.filePathRecentIssues);

        // Push new csv file to engine
        enginecomm.sendDataToEngine();

        // Do reload

        prevJSONBlob = body;
      } else {
        console.log('No new issues');
      }
    } else {
      console.log(`Error: ${JSON.stringify(error)}`);
    }
  });
};

fetchGithubData();
// setInterval(featchGithubData, configuration.fetchTime);
