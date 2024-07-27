// src/pages/history/[id].tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from '../../lib/axios'; // Make sure to configure axios in src/lib
import Header from '../components/Header';
import Link from 'next/link';

type Match = {
  _id: string;
  team1: string;
  team2: string;
  result: string;
};

const MatchHistory: React.FC = () => {
  const [matches, setMatches] = useState<Match[] | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const getMatches = async () => {
      try {
        const { data } = await axios.get('/history/all');
        setMatches(data);
      } catch (error) {
        console.error(error);
      }
    };
    getMatches();
  }, []);

  return (
    <div>
      <Header />
      <h2 className="mt-4 mb-6 text-center text-2xl font-bold">All matches ever played</h2>
      <div>
        {matches ? (
          matches.map((score) => (
            <Link key={score._id} href={`/history/${score._id}`}>
              <div className="flex flex-col items-center">
                <div className="bg-blue-300 w-3/4 m-4 font-semibold text-center shadow-md p-4 rounded-lg">
                  {score.team1} vs {score.team2}
                  <br />
                  {score.result}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <h1 className="text-center text-xl">Loading...</h1>
        )}
      </div>
    </div>
  );
};

export default MatchHistory;
