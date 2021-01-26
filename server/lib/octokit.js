const { Octokit } = require('@octokit/rest');
const { config } = require('dotenv');
config();

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

module.exports = octokit;
