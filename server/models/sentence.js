'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sentence extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Sentence.hasMany(models.UserSentence, {
        onDelete: 'cascade',
      });
      Sentence.belongsTo(models.Word, {
        onDelete: 'cascade',
      });
    }
  }
  Sentence.init(
    {
      sentence: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Sentence',
    }
  );
  return Sentence;
};
