module.exports = function(sequelize, DataTypes) {
    var College = sequelize.define("college", {
      schoolid: DataTypes.INTEGER,
      schoolname: DataTypes.STRING,
      searchCount: DataTypes.INTEGER
    });
    return college;
  };