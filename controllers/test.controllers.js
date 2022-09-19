const express = require("express");
var pool = require("../config/database.config");
const { v4: uuidv4 } = require("uuid");

// Load Input validation
const { autoDataValidator } = require("../utils/validate.utils");

const addNewEmployee = async (req, res, next) => {
  try {
    expectedBodyData = ["name", "phone", "email", "address", "department"];
    requiredFields = ["name", "email", "department"];

    const { errors, isValid } = autoDataValidator(
      req.body,
      expectedBodyData,
      requiredFields
    );
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { name, phone, email, address, department } = req.body;
    if (!(await validateDepartment(department))) {
      res.json({
        error:
          "Department name does not exists. Please provide a valid department name.",
      });
    }

    const newEmployee = await pool.query(
      "INSERT INTO employee(id, name, phone, email, address, department, createdat) VALUES($1, $2, $3, $4, $5, $6, NOW()) RETURNING *",
      [uuidv4(), name, phone, email, address, department]
    );
    // Update Department
    await pool.query(
      "UPDATE department SET totalemployees = totalemployees + 1 WHERE name = $1",
      [department]
    );
    res.json({ employee: newEmployee.rows[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const addNewDepartment = async (req, res, next) => {
  try {
    expectedBodyData = ["name", "description", "location"];
    requiredFields = ["name"];

    const { errors, isValid } = autoDataValidator(
      req.body,
      expectedBodyData,
      requiredFields
    );
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { name, description, location } = req.body;
    if (await validateDepartment(name)) {
      res.json({
        error:
          "Department name already exists. Please provide a unique department name.",
      });
    }
    const newEmployee = await pool.query(
      "INSERT INTO department(name, description, location, createdat) VALUES($1, $2, $3, NOW()) RETURNING *",
      [name, description, location]
    );

    res.json({ department: newEmployee.rows[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const validateDepartment = async (dep_name) => {
  let result = await pool.query("SELECT * FROM department WHERE name = $1", [
    dep_name,
  ]);
  if (result.rowCount === 1) {
    // Department with given name exists
    return true;
  } else {
    return false;
  }
};

const getAllEmployees = async (req, res, next) => {
  try {
    let employees = await pool.query("SELECT * FROM employee");
    console.log(employees.rows);
    res.json({ employees: employees.rows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getAllDepartments = async (req, res, next) => {
  try {
    let department = await pool.query("SELECT * FROM department");
    res.json({ department: department.rows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getSingleEmployee = async (req, res, next) => {
  try {
    let eID = req.params.id;
    if (!(await validUser(eID))) {
      res.send({ error: "Invalid user ID was provided" });
    }
    let emp = await pool.query(
      "SELECT employee.*, department.location FROM employee INNER JOIN department ON employee.department = department.name WHERE id = $1",
      [eID]
    );
    res.json({ employee: emp.rows[0] });
    return true;
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const validUser = async (id) => {
  try {
    let foundEmployee = await pool.query(
      "SELECT * FROM employee WHERE id = $1",
      [id]
    );
    if (foundEmployee.rowCount === 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const subSetProblem = (req, res, next) => {
  let subset = req.params.set;
  let k = req.params.k;
  let length = subset.length;

  let f = new Array(k);
  for (let i = 0; i < k; i++) {
    f[i] = 0;
  }

  for (let i = 0; i < length; i++) f[subset[i] % k]++;
  if (k % 2 == 0) f[k / 2] = Math.min(f[k / 2], 1);
  let result = Math.min(f[0], 1);
  for (let i = 1; i <= k / 2; i++) result += Math.max(f[i], f[k - i]);
  console.log(result);
  res.json({ result });
};

module.exports = {
  validateDepartment,
  addNewEmployee,
  addNewDepartment,
  getAllEmployees,
  getAllDepartments,
  getSingleEmployee,
  subSetProblem,
};
