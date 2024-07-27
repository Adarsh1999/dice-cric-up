// src/components/Landing.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Teams from './Teams';
import CoinToss from './CoinToss';
import { useStateValue } from '../context/StateProvider';

const Landing: React.FC = () => {
  const [team1Selected, setTeam1Selected] = useState('');
  const [team2Selected, setTeam2Selected] = useState('');
  const [times, setTimes] = useState(1);
  const [isTossed, setIsTossed] = useState(false);
  const [, dispatch] = useStateValue();
  const router = useRouter();

  const handleLogin = () => {
    dispatch({
      type: 'SET_TEAM',
      team1: team1Selected,
      team2: team2Selected,
    });
    router.push('/match');
  };

  const getTeamColor = (team: string) => {
    switch (team) {
      case 'Australia': return 'bg-yellow-500 hover:bg-yellow-600';
      case 'India': return 'bg-orange-500 hover:bg-orange-600';
      case 'England': return 'bg-blue-700 hover:bg-blue-800';
      case 'New_Zealand': return 'bg-black hover:bg-gray-800';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col items-center max-w-5xl p-8 mx-auto shadow-md rounded-lg">
      <h1 className="mt-4 text-3xl font-semibold text-blue-600">Select both teams to play with...</h1>
      
      <Teams
        setTeam1Selected={setTeam1Selected}
        setTeam2Selected={setTeam2Selected}
        setTimes={setTimes}
        team1Selected={team1Selected}
        times={times}
        team2Selected={team2Selected}
      />

      <CoinToss
        setTeam1Selected={setTeam1Selected}
        setTeam2Selected={setTeam2Selected}
        team1Selected={team1Selected}
        team2Selected={team2Selected}
        isTossed={isTossed}
        setIsTossed={setIsTossed}
      />

      <button
        onClick={handleLogin}
        className="mt-10 px-6 py-3 text-lg font-bold text-white bg-blue-500 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:bg-blue-600 hover:-translate-y-1 hover:scale-105"
      >
        Let&apos;s play match
      </button>

      <div className="flex justify-around w-full mt-8 space-x-4">
        <div className="px-4 py-2 text-xl font-semibold border-2 border-rose-600 rounded-md shadow-md hover:border-lime-400 transition-colors duration-300">
          Heads
        </div>
        <div className="px-4 py-2 text-xl font-semibold border-2 border-rose-600 rounded-md shadow-md hover:border-lime-400 transition-colors duration-300">
          Tails
        </div>
      </div>

      <div className="flex justify-around w-full mt-4 space-x-4">
        {team1Selected && (
          <div className={`px-4 py-2 font-semibold text-white rounded-lg shadow-md text-center ${getTeamColor(team1Selected)}`}>
            {team1Selected}
          </div>
        )}
        {team2Selected && (
          <div className={`px-4 py-2 font-semibold text-white rounded-lg shadow-md text-center ${getTeamColor(team2Selected)}`}>
            {team2Selected}
          </div>
        )}
      </div>

      {isTossed && (
        <div className="mt-4 text-xl font-semibold text-blue-600">
          {team1Selected} won the toss and chose to bat
        </div>
      )}

      <Link href="/history">
        <button className="mt-8 px-6 py-3 text-lg font-bold text-white bg-blue-500 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:bg-blue-600 hover:-translate-y-1 hover:scale-105">
          History
        </button>
      </Link>
    </div>
  );
};

export default Landing;