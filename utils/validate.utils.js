const Validator = require("validator");

const isEmpty = (value) =>
  value === undefined ||  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

const autoDataValidator = (data, expectedBodyData, requiredFields) => {
    let errors = {};

    expectedBodyData.forEach(key => {
        data[key] = !isEmpty(data[key]) ? data[key] : "";
    });

    if('name' in data){
        if (!Validator.isLength(data.name, { min: 3, max: 30 })) {
            errors.name = "Name must be betveen 3 and 30 char";
        }
    } 
    if('email' in data){
        if (!Validator.isEmail(data.email)) {
            errors.email = "Email is invalid";
        }
    } 

    if('role' in data){
        if (data.role !== 'admin' && data.role !== 'staff') {
            errors.role = "Bad request with invalid properties";
        }
    } 

    if('phone' in data){
        if (!Validator.isLength(data.phone, { min: 10, max: 15 })) {
            errors.phone = "Phone is invalid";
        }
    }

    requiredFields.forEach(key => {
        if (Validator.isEmpty(data[key])) {
            errors[key] = `${key} field is required`;
        }
    });

    return {
        errors,
        isValid: isEmpty(errors),
    };
}

module.exports = {autoDataValidator}
