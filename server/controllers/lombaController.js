const pool = require('../config/db');

// GET all lomba
exports.getAll = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM lomba ORDER BY id ASC');
    res.json(rows);
  } catch (error) {
    console.error('Get lomba error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET single lomba
exports.getById = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM lomba WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Lomba tidak ditemukan' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Get lomba error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// CREATE lomba
exports.create = async (req, res) => {
  try {
    const { kategori_lomba } = req.body;
    if (!kategori_lomba) {
      return res.status(400).json({ message: 'Kategori lomba wajib diisi' });
    }

    const [result] = await pool.execute(
      'INSERT INTO lomba (kategori_lomba) VALUES (?)',
      [kategori_lomba]
    );

    res.status(201).json({ id: result.insertId, kategori_lomba });
  } catch (error) {
    console.error('Create lomba error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// UPDATE lomba
exports.update = async (req, res) => {
  try {
    const { kategori_lomba } = req.body;
    if (!kategori_lomba) {
      return res.status(400).json({ message: 'Kategori lomba wajib diisi' });
    }

    const [result] = await pool.execute(
      'UPDATE lomba SET kategori_lomba = ? WHERE id = ?',
      [kategori_lomba, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Lomba tidak ditemukan' });
    }

    res.json({ id: parseInt(req.params.id), kategori_lomba });
  } catch (error) {
    console.error('Update lomba error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE lomba
exports.remove = async (req, res) => {
  try {
    const [result] = await pool.execute('DELETE FROM lomba WHERE id = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Lomba tidak ditemukan' });
    }

    res.json({ message: 'Lomba berhasil dihapus' });
  } catch (error) {
    console.error('Delete lomba error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
