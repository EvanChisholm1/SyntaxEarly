const getRepo = require('./getRepo');
const parseShowData = require('./parseShowData');
const octokit = require('./octokit');

const getShows = async () => {
  const repo = await getRepo();
  const showSha = repo.data.tree.find(tree => {
    if (tree.path === 'shows') {
      return true;
    } else {
      return false;
    }
  }).sha;

  console.log(showSha);

  // get the show tree
  const shows = await octokit.git.getTree({
    owner: 'wesbos',
    repo: 'Syntax',
    tree_sha: showSha,
  });

  const parsedEpisodes = [];

  for (const show of shows.data.tree) {
    const blob = await octokit.git.getBlob({
      owner: 'wesbos',
      repo: 'Syntax',
      file_sha: show.sha,
    });

    const fileBuf = Buffer.from(blob.data.content, 'base64');
    const fileData = fileBuf.toString('utf-8');

    const parsedShow = await parseShowData(fileData);
    console.log(parsedShow);
    parsedEpisodes.push(parsedShow);
  }

  return parsedEpisodes;
};

module.exports = getShows;
