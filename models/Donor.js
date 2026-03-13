const db = require('../config/db');

const createDonorTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS donors (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      blood_type VARCHAR(5) NOT NULL,
      location VARCHAR(255) NOT NULL,
      phone VARCHAR(20) NOT NULL
    )
  `;
  await db.query(sql);
};

module.exports = { createDonorTable };
