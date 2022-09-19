const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Load Input validation
const autoDataValidator = require("../utils/validate.utils");

const getAll = async (req, res, next) => {
  res.status(200).json({message: 'Everything is working perfectly'})
} 

module.exports = {
  getAll,
};