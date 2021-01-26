const dotenv = require('dotenv');
const cron = require('node-cron');
const prisma = require('./lib/prisma');
const updateShows = require('./lib/updateShows');
const express = require('express');
const cors = require('cors');
dotenv.config();

const main = async () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.get('/', async (req, res) => {
    let page = parseInt(req.query.page) - 1;
    if (isNaN(page) || page < 0) {
      page = 0;
    }

    const episodes = await prisma.episode.findMany({
      orderBy: [{ number: 'desc' }],
      skip: page * 10,
      take: 10,
    });
    const numberOfEpisodes = await prisma.episode.count();
    console.log(numberOfEpisodes);
    const numberOfPages = Math.ceil(numberOfEpisodes / 10);
    console.log(numberOfPages);

    const nextPage = page + 2 >= numberOfPages ? undefined : page + 2;

    res.json({ episodes, nextPage, numberOfPages });
  });

  app.get('/:episode', async (req, res) => {
    const numberOfEpisodes = await prisma.episode.count();
    let episodeNumber = parseInt(req.params.episode);
    if (
      isNaN(episodeNumber) ||
      episodeNumber < 0 ||
      episodeNumber > numberOfEpisodes
    ) {
      res.status(400).json({
        error: `${req.params.episode} is not a valid episode`,
      });
    } else {
      const episode = await prisma.episode.findFirst({
        where: {
          number: episodeNumber,
        },
      });
      res.json(episode);
    }
  });

  const PORT = process.env.PORT || 8080;
  app.listen(8080, () => console.log(`listening on port ${PORT}`));

  cron.schedule('0 * * * *', updateShows);
};

main()
  .catch(err => console.error(err))
  .finally(() => prisma.$disconnect());
