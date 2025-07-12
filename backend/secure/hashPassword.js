const bcryptjs = require("bcryptjs");

const hashPassword = async (password) => {
  return await bcryptjs.hash(password, 12);
};
const comparePassword = async (password, hashedPassword) => {
  return await bcryptjs.compare(password, hashedPassword);
};

module.exports = { hashPassword, comparePassword };