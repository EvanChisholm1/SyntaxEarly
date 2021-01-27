import { Player } from '../components/player';
import { API_URL } from '../constants';

export const getServerSideProps = async () => {
  const req = await fetch(`${API_URL}/`);
  const apiRes = await req.json();
  return {
    props: apiRes,
  };
};

export default function Home({ episodes }) {
  return (
    <div>
      {episodes.map(episode => (
        <Player key={episode.number} {...episode} />
      ))}
      <Player
        number={322}
        title="The Deno Show"
        date="1611756000813"
        url="https://traffic.libsyn.com/syntax/Syntax322.mp3"
      />
    </div>
  );
}
