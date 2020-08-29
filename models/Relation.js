const Sequelize = require("sequelize");
const sequelize = require("../database");

const Relation = sequelize.define(
  "relation",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    origin: Sequelize.INTEGER,
    destiny: Sequelize.INTEGER,
    lastmessage: Sequelize.INTEGER,
    unseencount: Sequelize.INTEGER,
  },
  {
    timestamps: false,
  }
);

module.exports = Relation;
