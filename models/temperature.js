"use strict";
module.exports = (sequelize, DataTypes) => {
  const Temperature = sequelize.define(
    "Temperature",
    {
      kind: DataTypes.STRING,
      source: DataTypes.STRING,
      degreesf: DataTypes.INTEGER,
      outside: DataTypes.BOOLEAN,
      mode: DataTypes.STRING,
      modesetting: DataTypes.STRING,
    },
    {}
  );
  Temperature.associate = function (models) {
    // associations can be defined here
  };
  return Temperature;
};
