const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
require('dotenv').config();

async function initDatabase() {
  // Connect without database first to create it
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  console.log('Connected to MySQL server.');

  // Create database
  await connection.execute(
    `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``
  );
  console.log(`Database "${process.env.DB_NAME}" ensured.`);

  await connection.changeUser({ database: process.env.DB_NAME });

  // Create admin table
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS admin (
      id INT PRIMARY KEY AUTO_INCREMENT,
      username VARCHAR(50) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    )
  `);
  console.log('Table "admin" created.');

  // Create lomba table
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS lomba (
      id INT PRIMARY KEY AUTO_INCREMENT,
      kategori_lomba VARCHAR(100) NOT NULL
    )
  `);
  console.log('Table "lomba" created.');

  // Create peserta table
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS peserta (
      id INT PRIMARY KEY AUTO_INCREMENT,
      nama_lengkap VARCHAR(100) NOT NULL,
      asal_sekolah VARCHAR(100),
      lomba_id INT,
      nilai INT DEFAULT 0,
      FOREIGN KEY (lomba_id) REFERENCES lomba(id) ON DELETE SET NULL
    )
  `);
  console.log('Table "peserta" created.');

  // Seed default admin (username: admin, password: admin123)
  const [existingAdmin] = await connection.execute(
    'SELECT id FROM admin WHERE username = ?',
    ['admin']
  );

  if (existingAdmin.length === 0) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await connection.execute(
      'INSERT INTO admin (username, password) VALUES (?, ?)',
      ['admin', hashedPassword]
    );
    console.log('Default admin created -> username: admin, password: admin123');
  } else {
    console.log('Admin user already exists, skipping seed.');
  }

  await connection.end();
  console.log('\nDatabase initialization complete!');
}

initDatabase().catch((err) => {
  console.error('Database init failed:', err);
  process.exit(1);
});
