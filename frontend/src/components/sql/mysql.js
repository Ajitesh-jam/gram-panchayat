import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: '10.5.18.69',
  database: '22CS10004',
  password: '22CS10004',
  port: 5432, // Default PostgreSQL port
});

export const createCitizen = async (citizen) => {
  const { citizen_id, aadhar, gender, name, email, image, household_id, dob } = citizen;
  const query = `
    INSERT INTO citizen (citizen_id, aadhar, gender, name, email, image, household_id, dob) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
  `;
  const values = [citizen_id, aadhar, gender, name, email, image, household_id, dob];
  
  const res = await pool.query(query, values);
  return res.rows[0];
};

export const updateCitizen = async (aadhar, updates) => {
  const setClause = Object.keys(updates)
    .map((key, index) => `${key} = $${index + 2}`)
    .join(', ');
  
  const values = [aadhar, ...Object.values(updates)];
  const query = `UPDATE citizen SET ${setClause} WHERE aadhar = $1 RETURNING *;`;

  const res = await pool.query(query, values);
  return res.rows[0];
};

export const deleteCitizen = async (aadhar) => {
  const query = `DELETE FROM citizen WHERE aadhar = $1 RETURNING *;`;
  const res = await pool.query(query, [aadhar]);
  return res.rows[0];
};

export const getCitizenByAadhar = async (aadhar) => {
  const query = `SELECT * FROM citizen WHERE aadhar = $1;`;
  const res = await pool.query(query, [aadhar]);
  return res.rows[0];
};
