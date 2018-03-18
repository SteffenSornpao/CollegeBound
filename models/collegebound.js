module.exports = function(sequelize, DataTypes) {
    var CollegeBound = sequelize.define("collegebound", {
      schoolid: DataTypes.INTEGER,
      searched: DataTypes.INTEGER
    });
    return CollegeBound;
  };