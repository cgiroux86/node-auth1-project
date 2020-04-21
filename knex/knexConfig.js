const knex = require("knex");
const knexFile = require("./knexfile");
const enviornment = process.env.NODE_ENV || "development";
const db = knex(knexFile[enviornment]);

module.exports = db;
