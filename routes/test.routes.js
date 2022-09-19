const express = require("express");
const testControllers = require("../controllers/test.controllers");
const router = express.Router();

router.post("/employee", testControllers.addNewEmployee);
router.get("/employee", testControllers.getAllEmployees);
router.get("/employee/:id", testControllers.getSingleEmployee);

router.post("/department", testControllers.addNewDepartment);
router.get("/department", testControllers.getAllDepartments);

router.get("/subset/:set/:k", testControllers.subSetProblem);

module.exports = router;
