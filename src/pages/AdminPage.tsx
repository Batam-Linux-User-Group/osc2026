import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  LogOut,
  Plus,
  Pencil,
  Trash2,
  Users,
  Trophy,
  X,
  Save,
  ChevronDown,
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface Lomba {
  id: number;
  kategori_lomba: string;
}

interface Peserta {
  id: number;
  nama_lengkap: string;
  asal_sekolah: string | null;
  lomba_id: number | null;
  nilai: number;
  kategori_lomba?: string;
}

type ActiveTab = 'peserta' | 'lomba';

const AdminPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ActiveTab>('peserta');

  // Data
  const [lombaList, setLombaList] = useState<Lomba[]>([]);
  const [pesertaList, setPesertaList] = useState<Peserta[]>([]);

  // Lomba form
  const [showLombaForm, setShowLombaForm] = useState(false);
  const [editingLomba, setEditingLomba] = useState<Lomba | null>(null);
  const [lombaInput, setLombaInput] = useState('');

  // Peserta form
  const [showPesertaForm, setShowPesertaForm] = useState(false);
  const [editingPeserta, setEditingPeserta] = useState<Peserta | null>(null);
  const [pesertaInput, setPesertaInput] = useState({
    nama_lengkap: '',
    asal_sekolah: '',
    lomba_id: '',
    nilai: '0',
  });

  // Filter
  const [filterLomba, setFilterLomba] = useState<string>('');

  // Loading & error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Delete confirmation
  const [deleteConfirm, setDeleteConfirm] = useState<{
    type: 'lomba' | 'peserta';
    id: number;
    name: string;
  } | null>(null);

  const getHeaders = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });

  const handleAuthError = useCallback(
    (err: unknown) => {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('adminUser');
        navigate('/login');
      }
    },
    [navigate]
  );

  // Fetch data
  const fetchLomba = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/api/lomba`);
      setLombaList(res.data);
    } catch (err) {
      handleAuthError(err);
    }
  }, [handleAuthError]);

  const fetchPeserta = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/api/peserta`, getHeaders());
      setPesertaList(res.data);
    } catch (err) {
      handleAuthError(err);
    }
  }, [handleAuthError]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchLomba();
    fetchPeserta();
  }, [navigate, fetchLomba, fetchPeserta]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('adminUser');
    navigate('/login');
  };

  // ==================== LOMBA CRUD ====================
  const openLombaForm = (lomba?: Lomba) => {
    if (lomba) {
      setEditingLomba(lomba);
      setLombaInput(lomba.kategori_lomba);
    } else {
      setEditingLomba(null);
      setLombaInput('');
    }
    setShowLombaForm(true);
    setError('');
  };

  const saveLomba = async () => {
    if (!lombaInput.trim()) {
      setError('Kategori lomba wajib diisi');
      return;
    }
    setLoading(true);
    setError('');
    try {
      if (editingLomba) {
        await axios.put(
          `${API_URL}/api/lomba/${editingLomba.id}`,
          { kategori_lomba: lombaInput },
          getHeaders()
        );
      } else {
        await axios.post(
          `${API_URL}/api/lomba`,
          { kategori_lomba: lombaInput },
          getHeaders()
        );
      }
      setShowLombaForm(false);
      setLombaInput('');
      setEditingLomba(null);
      await fetchLomba();
      await fetchPeserta();
    } catch (err) {
      handleAuthError(err);
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteLomba = async (id: number) => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/api/lomba/${id}`, getHeaders());
      setDeleteConfirm(null);
      await fetchLomba();
      await fetchPeserta();
    } catch (err) {
      handleAuthError(err);
    } finally {
      setLoading(false);
    }
  };

  // ==================== PESERTA CRUD ====================
  const openPesertaForm = (peserta?: Peserta) => {
    if (peserta) {
      setEditingPeserta(peserta);
      setPesertaInput({
        nama_lengkap: peserta.nama_lengkap,
        asal_sekolah: peserta.asal_sekolah || '',
        lomba_id: peserta.lomba_id?.toString() || '',
        nilai: peserta.nilai.toString(),
      });
    } else {
      setEditingPeserta(null);
      setPesertaInput({
        nama_lengkap: '',
        asal_sekolah: '',
        lomba_id: '',
        nilai: '0',
      });
    }
    setShowPesertaForm(true);
    setError('');
  };

  const savePeserta = async () => {
    if (!pesertaInput.nama_lengkap.trim()) {
      setError('Nama lengkap wajib diisi');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const payload = {
        nama_lengkap: pesertaInput.nama_lengkap,
        asal_sekolah: pesertaInput.asal_sekolah || null,
        lomba_id: pesertaInput.lomba_id
          ? parseInt(pesertaInput.lomba_id)
          : null,
        nilai: parseInt(pesertaInput.nilai) || 0,
      };

      if (editingPeserta) {
        await axios.put(
          `${API_URL}/api/peserta/${editingPeserta.id}`,
          payload,
          getHeaders()
        );
      } else {
        await axios.post(`${API_URL}/api/peserta`, payload, getHeaders());
      }
      setShowPesertaForm(false);
      setEditingPeserta(null);
      await fetchPeserta();
    } catch (err) {
      handleAuthError(err);
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const deletePeserta = async (id: number) => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/api/peserta/${id}`, getHeaders());
      setDeleteConfirm(null);
      await fetchPeserta();
    } catch (err) {
      handleAuthError(err);
    } finally {
      setLoading(false);
    }
  };

  // Filter peserta
  const filteredPeserta = filterLomba
    ? pesertaList.filter((p) => p.lomba_id?.toString() === filterLomba)
    : pesertaList;

  const adminUser = localStorage.getItem('adminUser') || 'Admin';

  return (
    <div className="min-h-screen bg-[#0F0E0E] text-white">
      {/* Header */}
      <header className="bg-[#121111] border-b border-gray-800 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">
              OSC 2025 <span className="text-orange-500">Admin</span>
            </h1>
            <p className="text-gray-500 text-xs">
              Selamat datang, {adminUser}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/20 transition text-sm cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-[#121111] border border-gray-800 rounded-xl p-4 flex items-center gap-4">
            <div className="bg-blue-500/10 p-3 rounded-lg">
              <Trophy className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-gray-500 text-xs">Total Lomba</p>
              <p className="text-2xl font-bold">{lombaList.length}</p>
            </div>
          </div>
          <div className="bg-[#121111] border border-gray-800 rounded-xl p-4 flex items-center gap-4">
            <div className="bg-green-500/10 p-3 rounded-lg">
              <Users className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-gray-500 text-xs">Total Peserta</p>
              <p className="text-2xl font-bold">{pesertaList.length}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('peserta')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
              activeTab === 'peserta'
                ? 'bg-orange-500 text-white'
                : 'bg-[#121111] text-gray-400 border border-gray-800 hover:text-white'
            }`}
          >
            Peserta
          </button>
          <button
            onClick={() => setActiveTab('lomba')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
              activeTab === 'lomba'
                ? 'bg-orange-500 text-white'
                : 'bg-[#121111] text-gray-400 border border-gray-800 hover:text-white'
            }`}
          >
            Lomba
          </button>
        </div>

        {/* ==================== LOMBA TAB ==================== */}
        {activeTab === 'lomba' && (
          <div className="bg-[#121111] border border-gray-800 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <h2 className="text-lg font-semibold">Daftar Lomba</h2>
              <button
                onClick={() => openLombaForm()}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500 text-white text-sm rounded-lg hover:bg-orange-600 transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Tambah
              </button>
            </div>

            {lombaList.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Trophy className="w-12 h-12 mx-auto mb-2 opacity-30" />
                <p>Belum ada data lomba</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-800">
                {lombaList.map((lomba) => (
                  <div
                    key={lomba.id}
                    className="flex items-center justify-between px-4 py-3 hover:bg-gray-800/50 transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className="bg-orange-500/10 text-orange-400 text-xs font-bold px-2.5 py-1 rounded-full">
                        #{lomba.id}
                      </span>
                      <span className="font-medium">
                        {lomba.kategori_lomba}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openLombaForm(lomba)}
                        className="p-1.5 text-blue-400 hover:bg-blue-500/10 rounded-lg transition cursor-pointer"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          setDeleteConfirm({
                            type: 'lomba',
                            id: lomba.id,
                            name: lomba.kategori_lomba,
                          })
                        }
                        className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition cursor-pointer"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ==================== PESERTA TAB ==================== */}
        {activeTab === 'peserta' && (
          <div className="bg-[#121111] border border-gray-800 rounded-xl overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 border-b border-gray-800">
              <h2 className="text-lg font-semibold">Daftar Peserta</h2>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                {/* Filter by lomba */}
                <div className="relative flex-1 sm:flex-none">
                  <select
                    value={filterLomba}
                    onChange={(e) => setFilterLomba(e.target.value)}
                    className="bg-[#1a1a1a] border border-gray-700 text-sm rounded-lg px-3 py-1.5 pr-8 text-white appearance-none cursor-pointer w-full sm:w-auto"
                  >
                    <option value="">Semua Lomba</option>
                    {lombaList.map((l) => (
                      <option key={l.id} value={l.id.toString()}>
                        {l.kategori_lomba}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
                <button
                  onClick={() => openPesertaForm()}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500 text-white text-sm rounded-lg hover:bg-orange-600 transition cursor-pointer whitespace-nowrap"
                >
                  <Plus className="w-4 h-4" />
                  Tambah
                </button>
              </div>
            </div>

            {filteredPeserta.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-2 opacity-30" />
                <p>Belum ada data peserta</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-gray-500 text-left border-b border-gray-800">
                      <th className="px-4 py-3 font-medium">#</th>
                      <th className="px-4 py-3 font-medium">Nama Lengkap</th>
                      <th className="px-4 py-3 font-medium">Asal Sekolah</th>
                      <th className="px-4 py-3 font-medium">Lomba</th>
                      <th className="px-4 py-3 font-medium">Nilai</th>
                      <th className="px-4 py-3 font-medium text-right">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {filteredPeserta.map((p, idx) => (
                      <tr
                        key={p.id}
                        className="hover:bg-gray-800/50 transition"
                      >
                        <td className="px-4 py-3 text-gray-500">{idx + 1}</td>
                        <td className="px-4 py-3 font-medium">
                          {p.nama_lengkap}
                        </td>
                        <td className="px-4 py-3 text-gray-400">
                          {p.asal_sekolah || '-'}
                        </td>
                        <td className="px-4 py-3">
                          {p.kategori_lomba ? (
                            <span className="bg-blue-500/10 text-blue-400 text-xs px-2 py-0.5 rounded-full">
                              {p.kategori_lomba}
                            </span>
                          ) : (
                            <span className="text-gray-600">-</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-orange-400 font-bold">
                            {p.nilai}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1 justify-end">
                            <button
                              onClick={() => openPesertaForm(p)}
                              className="p-1.5 text-blue-400 hover:bg-blue-500/10 rounded-lg transition cursor-pointer"
                              title="Edit"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                setDeleteConfirm({
                                  type: 'peserta',
                                  id: p.id,
                                  name: p.nama_lengkap,
                                })
                              }
                              className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition cursor-pointer"
                              title="Hapus"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ==================== LOMBA MODAL ==================== */}
      {showLombaForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#121111] border border-gray-800 rounded-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                {editingLomba ? 'Edit Lomba' : 'Tambah Lomba'}
              </h3>
              <button
                onClick={() => {
                  setShowLombaForm(false);
                  setError('');
                }}
                className="text-gray-500 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-3 py-2 rounded-lg text-sm mb-4">
                {error}
              </div>
            )}

            <div className="mb-4">
              <label className="text-gray-400 text-sm block mb-1">
                Kategori Lomba
              </label>
              <input
                type="text"
                value={lombaInput}
                onChange={(e) => setLombaInput(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-orange-500 transition"
                placeholder="Contoh: Web Design"
                autoFocus
              />
            </div>

            <div className="flex gap-2 justify-end">
              <button
                onClick={() => {
                  setShowLombaForm(false);
                  setError('');
                }}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white transition cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={saveLomba}
                disabled={loading}
                className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 text-white text-sm rounded-lg hover:bg-orange-600 disabled:opacity-50 transition cursor-pointer"
              >
                <Save className="w-4 h-4" />
                {loading ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== PESERTA MODAL ==================== */}
      {showPesertaForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#121111] border border-gray-800 rounded-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                {editingPeserta ? 'Edit Peserta' : 'Tambah Peserta'}
              </h3>
              <button
                onClick={() => {
                  setShowPesertaForm(false);
                  setError('');
                }}
                className="text-gray-500 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-3 py-2 rounded-lg text-sm mb-4">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm block mb-1">
                  Nama Lengkap <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={pesertaInput.nama_lengkap}
                  onChange={(e) =>
                    setPesertaInput({
                      ...pesertaInput,
                      nama_lengkap: e.target.value,
                    })
                  }
                  className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-orange-500 transition"
                  placeholder="Masukkan nama lengkap"
                  autoFocus
                />
              </div>

              <div>
                <label className="text-gray-400 text-sm block mb-1">
                  Asal Sekolah
                </label>
                <input
                  type="text"
                  value={pesertaInput.asal_sekolah}
                  onChange={(e) =>
                    setPesertaInput({
                      ...pesertaInput,
                      asal_sekolah: e.target.value,
                    })
                  }
                  className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-orange-500 transition"
                  placeholder="Contoh: SMKN 1 Batam"
                />
              </div>

              <div>
                <label className="text-gray-400 text-sm block mb-1">
                  Lomba
                </label>
                <div className="relative">
                  <select
                    value={pesertaInput.lomba_id}
                    onChange={(e) =>
                      setPesertaInput({
                        ...pesertaInput,
                        lomba_id: e.target.value,
                      })
                    }
                    className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-2.5 pr-8 text-white text-sm focus:outline-none focus:border-orange-500 transition appearance-none cursor-pointer"
                  >
                    <option value="">-- Pilih Lomba --</option>
                    {lombaList.map((l) => (
                      <option key={l.id} value={l.id.toString()}>
                        {l.kategori_lomba}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-sm block mb-1">
                  Nilai
                </label>
                <input
                  type="number"
                  value={pesertaInput.nilai}
                  onChange={(e) =>
                    setPesertaInput({
                      ...pesertaInput,
                      nilai: e.target.value,
                    })
                  }
                  className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-orange-500 transition"
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end mt-6">
              <button
                onClick={() => {
                  setShowPesertaForm(false);
                  setError('');
                }}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white transition cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={savePeserta}
                disabled={loading}
                className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 text-white text-sm rounded-lg hover:bg-orange-600 disabled:opacity-50 transition cursor-pointer"
              >
                <Save className="w-4 h-4" />
                {loading ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== DELETE CONFIRM MODAL ==================== */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#121111] border border-gray-800 rounded-xl w-full max-w-sm p-6 text-center">
            <div className="bg-red-500/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-7 h-7 text-red-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Konfirmasi Hapus</h3>
            <p className="text-gray-400 text-sm mb-6">
              Yakin ingin menghapus{' '}
              <span className="text-white font-medium">
                {deleteConfirm.name}
              </span>
              ?{' '}
              {deleteConfirm.type === 'lomba' &&
                'Peserta yang terkait akan kehilangan referensi lomba ini.'}
            </p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white border border-gray-700 rounded-lg transition cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() =>
                  deleteConfirm.type === 'lomba'
                    ? deleteLomba(deleteConfirm.id)
                    : deletePeserta(deleteConfirm.id)
                }
                disabled={loading}
                className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 disabled:opacity-50 transition cursor-pointer"
              >
                {loading ? 'Menghapus...' : 'Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
