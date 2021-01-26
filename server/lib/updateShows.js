const prisma = require('./prisma');
const getShows = require('./getShows');

const updateShows = async () => {
  const currentEpisodes = await getShows();
  for (const episode of currentEpisodes) {
    const cachedEpisode = await prisma.episode.findFirst({
      where: { number: episode.number },
    });
    console.log(cachedEpisode);
    if (cachedEpisode) {
      console.log('episode already exists in db');
    } else {
      await prisma.episode.create({ data: episode });
    }
  }
};

module.exports = updateShows;
