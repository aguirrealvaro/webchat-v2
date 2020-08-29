const Sequelize = require("sequelize");
const sequelize = require("../database");

const Message = sequelize.define(
  "message",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    origin: {
      type: Sequelize.INTEGER,
    },
    destiny: {
      type: Sequelize.INTEGER,
    },
    content: Sequelize.TEXT,
    created_at: Sequelize.TIME,
    seen: Sequelize.BOOLEAN,
  },
  {
    timestamps: false,
  }
);

module.exports = Message;
