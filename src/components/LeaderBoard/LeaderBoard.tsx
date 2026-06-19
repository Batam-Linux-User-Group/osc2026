import type React from 'react';

interface Participant {
  id: string;
  name: string;
  score: number;
  avatar?: string;
  school?: string;
}

interface CompetitionSection {
  id: string;
  title: string;
  participants: Participant[];
  color: string;
}

interface LeaderboardProps {
  competitions: CompetitionSection[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ competitions }) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return '🏆';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `#${rank}`;
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
      case 3:
        return 'bg-gradient-to-r from-orange-400 to-orange-600 text-white';
      default:
        return 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#423E40] via-gray-800 to-slate-900 px-4 md:px-8 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            🎯 OSC 2024 Leaderboard
          </h1>
          <p className="text-gray-300 text-lg md:text-xl">
            Berikut adalah recap dari kompetisi yang telah diadakan tahun 2024
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {competitions.map((competition) => (
            <div
              key={competition.id}
              className="bg-gray-800 rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 border border-gray-700"
              style={{
                boxShadow: `0 20px 40px ${competition.color}20`,
              }}
            >
              <div className="p-6 text-white text-center relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600">
                <h2 className="text-2xl md:text-3xl font-bold relative z-10 mb-2">
                  {competition.title}
                </h2>
                <div className="text-white/80 relative z-10">
                  {competition.participants.length} Peserta
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-3">
                  {competition.participants.map((participant, index) => {
                    const rank = index + 1;
                    return (
                      <div
                        key={participant.id}
                        className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 transition-all duration-200 border border-gray-600 hover:border-gray-500"
                      >
                        <div
                          className={`flex items-center justify-center w-12 h-12 rounded-full font-bold text-sm ${getRankStyle(
                            rank
                          )} shadow-lg`}
                        >
                          {getRankIcon(rank)}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-white truncate text-sm md:text-base">
                                {participant.name}
                              </h3>
                              <p className="text-xs text-gray-400 font-semibold tracking-wider">
                                {participant.school}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div
                            className="text-2xl md:text-3xl font-bold"
                            style={{ color: competition.color }}
                          >
                            {participant.score > 0
                              ? participant.score.toLocaleString()
                              : '-'}
                          </div>
                          <div className="text-xs text-gray-400">points</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {competition.participants.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🎯</div>
                    <p className="text-gray-300 text-lg">No participants yet</p>
                    <p className="text-gray-500">Be the first to join!</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
