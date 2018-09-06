/* eslint no-console:0 */
/*
  Heavily based on Mattias Wennmo's (https://github.com/wennmo) github statistics script
*/
const fs = require('fs');
const json2csv = require('json2csv').parse;
const currentWeekNumber = require('current-week-number');

const filePathRecentIssues = './data/repo_recent_issues.csv';

const objects = JSON.parse(fs.readFileSync('./data/repo_info.json', 'utf8'));

const stats = {
  total: {
    week: currentWeekNumber(),
    totalNbrIssues: 0,
    totalNbrPRs: 0,
    totalNbrStars: 0,
  },
  repos: {},
};

let issues = [];

const ignoreRepos = ['picasso.js', 'server-side-extension', 'http-metrics-middleware', 'leonardo-ui', 'open-source', 'sse-r-plugin', 'qlik-sense-visualization-extension-testing', 'nprinting-adsync'];

const parseRepoIssues = () => {
  objects.forEach((element) => {
    const repo = element.repository.name;
      if (!element.hasOwnProperty('pull_request')) {
        if (!element.hasOwnProperty(''))
        issues.push({ 
          date: element.created_at, 
          repo, 
          title: element.title, 
          submitter: element.user.login, 
          usertype: element.author_association,
          assignee: element.assignee,
         });
      }
    }
  );
};
  
const writeIssuesToCsv = (fileName) => {
  try {
    // Sort the issues on created date
    issues = issues.sort((a, b) => new Date(b.date) - new Date(a.date));
    const csv = json2csv(issues);
    fs.writeFileSync(fileName, csv, 'utf8');
  } catch (err) {
    console.error(err);
  }
};

//parseRepoIssues();
//writeIssuesToCsv(filePathRecentIssues);

 module.exports = {parseRepoIssues, writeIssuesToCsv};
 