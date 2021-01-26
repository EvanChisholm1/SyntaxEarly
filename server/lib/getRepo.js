const octokit = require('./octokit');

const getRepo = async () => {
  const master = await octokit.repos.getBranch({
    owner: 'wesbos',
    repo: 'Syntax',
    branch: 'master',
  });
  const { sha: rootsha } = master.data.commit;
  const repo = await octokit.git.getTree({
    owner: 'wesbos',
    repo: 'Syntax',
    tree_sha: rootsha,
  });

  return repo;
};

module.exports = getRepo;
