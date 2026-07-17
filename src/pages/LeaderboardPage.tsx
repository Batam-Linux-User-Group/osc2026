import { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../components/LandingPage/Footer';
import Navbar from '../components/LandingPage/Navbar';
import Leaderboard from '../components/LeaderBoard/LeaderBoard';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const COLORS = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#14b8a6', '#f97316'];

interface ApiPeserta {
  id: number;
  nama_lengkap: string;
  asal_sekolah: string | null;
  nilai: number;
}

interface ApiLeaderboard {
  id: number;
  kategori_lomba: string;
  peserta: ApiPeserta[];
}

interface CompetitionData {
  id: string;
  title: string;
  color: string;
  participants: {
    id: string;
    name: string;
    school: string;
    score: number;
  }[];
}

export default function LeaderboardPage() {
  const [competitions, setCompetitions] = useState<CompetitionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = "Peringkat Peserta | OSC 2026";
  }, []);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get<ApiLeaderboard[]>(`${API_URL}/api/peserta/leaderboard`);

        const mapped: CompetitionData[] = res.data.map((lomba, index) => ({
          id: lomba.id.toString(),
          title: lomba.kategori_lomba,
          color: COLORS[index % COLORS.length],
          participants: lomba.peserta.map((p) => ({
            id: p.id.toString(),
            name: p.nama_lengkap,
            school: p.asal_sekolah || '-',
            score: p.nilai,
          })),
        }));

        setCompetitions(mapped);
      } catch {
        setError('Gagal memuat data leaderboard');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-[#423E40] via-gray-800 to-slate-900 flex items-center justify-center">
          <div className="text-white text-lg animate-pulse">Memuat leaderboard...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-[#423E40] via-gray-800 to-slate-900 flex items-center justify-center">
          <div className="text-red-400 text-lg">{error}</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Leaderboard competitions={competitions} />
      <Footer />
    </div>
  );
}
