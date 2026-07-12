const pool = require('../config/db');

// GET all peserta (with lomba name via JOIN)
exports.getAll = async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT p.id, p.nama_lengkap, p.asal_sekolah, p.lomba_id, p.nilai,
             l.kategori_lomba
      FROM peserta p
      LEFT JOIN lomba l ON p.lomba_id = l.id
      ORDER BY p.id ASC
    `);
    res.json(rows);
  } catch (error) {
    console.error('Get peserta error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET single peserta
exports.getById = async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT p.id, p.nama_lengkap, p.asal_sekolah, p.lomba_id, p.nilai,
             l.kategori_lomba
      FROM peserta p
      LEFT JOIN lomba l ON p.lomba_id = l.id
      WHERE p.id = ?
    `, [req.params.id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Peserta tidak ditemukan' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Get peserta error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// CREATE peserta
exports.create = async (req, res) => {
  try {
    const { nama_lengkap, asal_sekolah, lomba_id, nilai } = req.body;

    if (!nama_lengkap) {
      return res.status(400).json({ message: 'Nama lengkap wajib diisi' });
    }

    const [result] = await pool.execute(
      'INSERT INTO peserta (nama_lengkap, asal_sekolah, lomba_id, nilai) VALUES (?, ?, ?, ?)',
      [nama_lengkap, asal_sekolah || null, lomba_id || null, nilai || 0]
    );

    res.status(201).json({
      id: result.insertId,
      nama_lengkap,
      asal_sekolah,
      lomba_id,
      nilai: nilai || 0,
    });
  } catch (error) {
    console.error('Create peserta error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// UPDATE peserta
exports.update = async (req, res) => {
  try {
    const { nama_lengkap, asal_sekolah, lomba_id, nilai } = req.body;

    if (!nama_lengkap) {
      return res.status(400).json({ message: 'Nama lengkap wajib diisi' });
    }

    const [result] = await pool.execute(
      'UPDATE peserta SET nama_lengkap = ?, asal_sekolah = ?, lomba_id = ?, nilai = ? WHERE id = ?',
      [nama_lengkap, asal_sekolah || null, lomba_id || null, nilai || 0, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Peserta tidak ditemukan' });
    }

    res.json({ id: parseInt(req.params.id), nama_lengkap, asal_sekolah, lomba_id, nilai });
  } catch (error) {
    console.error('Update peserta error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE peserta
exports.remove = async (req, res) => {
  try {
    const [result] = await pool.execute('DELETE FROM peserta WHERE id = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Peserta tidak ditemukan' });
    }

    res.json({ message: 'Peserta berhasil dihapus' });
  } catch (error) {
    console.error('Delete peserta error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET leaderboard (grouped by lomba, sorted by nilai DESC)
exports.getLeaderboard = async (req, res) => {
  try {
    const [lombaList] = await pool.execute('SELECT * FROM lomba ORDER BY id ASC');

    const leaderboard = [];

    for (const lomba of lombaList) {
      const [pesertaList] = await pool.execute(
        'SELECT id, nama_lengkap, asal_sekolah, nilai FROM peserta WHERE lomba_id = ? ORDER BY nilai DESC',
        [lomba.id]
      );

      leaderboard.push({
        id: lomba.id,
        kategori_lomba: lomba.kategori_lomba,
        peserta: pesertaList,
      });
    }

    res.json(leaderboard);
  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
