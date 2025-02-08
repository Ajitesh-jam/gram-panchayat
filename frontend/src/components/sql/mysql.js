import { Pool } from 'pg';

const pool = new Pool({
  user: '22CS10004',
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
  console.log("get citizen called ",aadhar);
  const query = `SELECT * FROM citizen WHERE aadhar = $1;`;
  const res = await pool.query(query, [aadhar]);
  //console.log("res ", res.rows);
  return res.rows[0];
};

export const getAllCitizen = async ()=>{
  const query = `SELECT * FROM citizen;`;
  const res = await pool.query(query);
  //console.log("res ", res.rows);
  return res.rows;
}


//employees
import bcrypt from "bcrypt";

// 🟢 Get employee details (with citizen info) if credentials are correct
export const getEmployee = async (employee_id,password) => {
  console.log("Fetching employee:", employee_id);

  
  const query = `
  SELECT e.*, c.* 
  FROM panchayat_employee e 
  JOIN citizen c ON e.citizen_id = c.citizen_id 
  WHERE e.employee_id = $1 ;
  `;
  
  const values = [employee_id];
  const res = await pool.query(query, values);
  //console.log("res ", res.rows);
  //console.log("password ", res.rows[0]['password']);
  const isMatch = await bcrypt.compare(password, res.rows[0]['password']);

  if (!isMatch) {
    return [{ error: "Invalid credentials" }, { status: 401 }];
  }
  return res.rows[0] || null;
};

// 🟡 Update employee or citizen details if password is correct
export const updateEmployee = async (employee_id, password, updates) => {
  console.log("Updating employee:", employee_id);

  // Validate password
  const employee = await getEmployee(employee_id, password);
  if (!employee) {
    throw new Error("Invalid credentials");
  }

  const { role, citizenUpdates } = updates;

  // Update employee table
  if (role) {
    await pool.query(`UPDATE panchayat_employee SET role = $1 WHERE employee_id = $2;`, [role, employee_id]);
  }

  // Update citizen table if any updates provided
  if (citizenUpdates) {
    const setClause = Object.keys(citizenUpdates)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(", ");
    
    const values = [employee.citizen_id, ...Object.values(citizenUpdates)];
    await pool.query(`UPDATE citizen SET ${setClause} WHERE citizen_id = $1;`, values);
  }

  return getEmployee(employee_id, password); // Return updated record
};

// 🔴 Delete employee record
export const deleteEmployee = async (employee_id, password) => {
  console.log("Deleting employee:", employee_id);

  // Validate password
  const employee = await getEmployee(employee_id, password);
  if (!employee) {
    throw new Error("Invalid credentials");
  }

  // Delete employee entry
  const query = `DELETE FROM panchayat_employee WHERE employee_id = $1 RETURNING *;`;
  const res = await pool.query(query, [employee_id]);

  return res.rows[0] || null;
};

// 🟢 Create a new employee
export const createEmployee = async (employee) => {
  const { employee_id, password, citizen_id, role } = employee;

  const query = `
    INSERT INTO panchayat_employee (employee_id, password, citizen_id, role) 
    VALUES ($1, $2, $3, $4) 
    RETURNING *;
  `;

  const values = [employee_id, password, citizen_id, role];
  const res = await pool.query(query, values);

  return res.rows[0];
};
