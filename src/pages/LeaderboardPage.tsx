import Footer from '../components/LandingPage/Footer';
import Navbar from '../components/LandingPage/Navbar';
import Leaderboard from '../components/LeaderBoard/LeaderBoard';

const sampleData = [
  {
    id: 'web-design',
    title: '💻 Web Design',
    color: '#6366f1',
    participants: [
      {
        id: '1',
        name: 'Rajiv Tajusa David',
        school: 'SMKN 1 Batam',
        score: 192,
      },
      {
        id: '2',
        name: 'Zacky Julyanda Pratama',
        school: 'SMKN 1 Batam',
        score: 190,
      },
      {
        id: '3',
        name: 'Alfredo Alexander Mendez',
        school: 'SMKN 7 Batam',
        score: 185,
      },
      {
        id: '4',
        name: 'Tambah Riski Martinus',
        school: 'SMKN 5 Batam',
        score: 182,
      },
      { id: '5', name: 'Roihan Abiyan', school: 'SMKN 5 Batam', score: 112 },
      {
        id: '6',
        name: 'Muhammad Bayu Adhiyoso Mumu',
        school: 'SMKN 5 Batam',
        score: 88,
      },
      {
        id: '7',
        name: 'Irvani Heldy Fauzan',
        school: 'SMK Multistudi High School',
        score: 56,
      },
      {
        id: '8',
        name: 'Timothy William',
        school: 'SMK Multistudi High School',
        score: 30,
      },
    ],
  },
  {
    id: 'sysadmin',
    title: '🧑‍💻 Linux System Admin',
    color: '#ec4899',
    participants: [
      {
        id: '9',
        name: 'Septian Ramadhani',
        school: 'SMKN 1 Batam',
        score: 154.5,
      },
      {
        id: '10',
        name: 'Muhammad Yanur Fillah',
        school: 'SMKN 1 Batam',
        score: 148.5,
      },
      {
        id: '11',
        name: 'Muhammad Bimo Syaipuddin',
        school: 'SMKN 7 Batam',
        score: 102,
      },
      {
        id: '12',
        name: 'Muhammad Fathurrahman',
        school: 'SMKN 1 Batam',
        score: 78,
      },
      { id: '13', name: 'Brian Deswar', school: 'SMKN 5 Batam', score: 54 },
      {
        id: '14',
        name: 'Enno Nurwansyah Rasyidi',
        school: 'SMKN 7 Batam',
        score: 24,
      },
      { id: '15', name: 'Fauzan Ansori', school: 'SMKN 7 Batam', score: 0 },
    ],
  },
  {
    id: 'netsim',
    title: '🛜 Network Simulation',
    color: '#10b981',
    participants: [
      {
        id: '16',
        name: 'Efraim Tobias Santoso',
        school: 'SMKN 7 Batam',
        score: 68,
      },
      { id: '17', name: 'Calvin Ardyanto', school: 'SMKN 7 Batam', score: 62 },
      { id: '18', name: 'Yusuf Abdulloh', school: 'SMKN 1 Batam', score: 61 },
      {
        id: '19',
        name: 'Muhamad Daffa Nugraha',
        school: 'SMK Multistudi High School',
        score: 57,
      },
      {
        id: '20',
        name: 'Fakhira Shakila Nasution',
        school: 'SMKN 1 Batam',
        score: 56,
      },
      { id: '21', name: 'Abdillah Hidayat', school: 'SMKN 7 Batam', score: 53 },
      {
        id: '22',
        name: 'Nosa Pratama Purba',
        school: 'SMKN 7 Batam',
        score: 52,
      },
      {
        id: '23',
        name: 'Reviana Dwi Anjani',
        school: 'SMKN 1 Batam',
        score: 37,
      },
      {
        id: '24',
        name: 'Kevin Li',
        school: 'SMK Multistudi High School',
        score: 33,
      },
      {
        id: '25',
        name: 'PAULINA NINA FLORENZA',
        school: 'SMKN 5 Batam',
        score: 29,
      },
      {
        id: '26',
        name: 'Wahyu Riandra Tri Saputra',
        school: 'SMK Multistudi High School',
        score: 24,
      },
    ],
  },
  {
    id: 'mascot',
    title: '🎨 Mascot Design',
    color: '#f59e0b',
    participants: [
      {
        id: '27',
        name: 'Jatra Riski Darmawan',
        school: 'SMKN 1 Batam',
        score: 0,
      },
      { id: '28', name: 'Revaldo Sitorus', school: 'SMKN 1 Batam', score: 0 },
      {
        id: '29',
        name: 'Ibnu Hanif Salsabila',
        school: 'UMUM',
        score: 0,
      },
      {
        id: '30',
        name: 'Rizki Syailendra Yopa',
        school: 'SMKN 7 Batam',
        score: 0,
      },
      {
        id: '31',
        name: 'Oktavia Fitri Nurmawati',
        school: 'SMKN 1 Batam',
        score: 0,
      },
      {
        id: '32',
        name: 'Virdodhita Virginia Sirait',
        school: 'SMKN 1 Batam',
        score: 0,
      },
      {
        id: '33',
        name: 'Caylani Zuleika Putri',
        school: 'SMKN 1 Batam',
        score: 0,
      },
      {
        id: '34',
        name: 'Aisah Rizki Wahyuni',
        school: 'SMKN 5 Batam',
        score: 0,
      },
    ],
  },
];

export default function LeaderboardPage() {
  return (
    <div>
      <Navbar />
      <Leaderboard competitions={sampleData} />
      <Footer />
    </div>
  );
}
