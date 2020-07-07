'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Word extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //   Word.belongsToMany(models.User, { through: 'UserWord' });
      //   Word.belongsToMany(models.User, { through: 'UserWord' });
      //   models.User.belongsToMany(Word, { through: 'UserWord' });
    }
  }
  Word.init(
    {
      word: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Word',
    }
  );
  return Word;
};
