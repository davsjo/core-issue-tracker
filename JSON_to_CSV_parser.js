/* eslint no-console:0 */
/*
  Heavily based on Mattias Wennmo's (https://github.com/wennmo) github statistics script
*/
const fs = require('fs');
const json2csv = require('json2csv').parse;

const objects = JSON.parse(fs.readFileSync('./data/repo_info.json', 'utf8'));
let issues = [];

const parseRepoIssues = () => {
  objects.forEach((element) => {
    //console.log(element.assignee);
    const repo = element.repository.name;
    if (!Object.prototype.hasOwnProperty.call(element, 'pull_request')) {
      if (!Object.prototype.hasOwnProperty.call(element, '')) {
        issues.push({
          date: element.created_at,
          repo,
          title: element.title,
          submitter: element.user.login,
          usertype: element.author_association,
          assignee: element.assignee ? element.assignee.login : null,
          has_projects: element.has_projects,
          //language: element.language,
        });
      }
    }
  });
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

module.exports = { parseRepoIssues, writeIssuesToCsv };
