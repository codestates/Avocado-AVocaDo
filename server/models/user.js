'use strict';
const { Model } = require('sequelize');
const crypto = require('crypto');
const usersentence = require('./usersentence');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Word, {
        through: 'UserWord',
      });
      models.Word.belongsToMany(User, {
        through: 'UserWord',
      });
      User.belongsToMany(models.Sentence, {
        through: 'UserSentence',
      });
      models.Sentence.belongsToMany(User, {
        through: 'UserSentence',
      });
    }
  }
  User.init(
    {
      loginType: DataTypes.STRING,
      socialId: DataTypes.STRING,
      userName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    // {
    //   hooks: {
    //     afterValidate: (data, options) => {
    //       let shasum = crypto.createHash('sha2');
    //       shasum.update(data.password + 'A!VocaDo!');
    //       data.password = shasum.digest('hex');
    //     },
    //   },
    // },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};

// module.exports = (sequelize, DataTypes) => {
//   const users = sequelize.define(
//     'users',
//     {
//       email: DataTypes.STRING,
//       username: DataTypes.STRING,
//       //   password: DataTypes.STRING
//     },
//     {
//       /* hooks: {
//       afterValidate: (data, options) => {
//         let shasum = crypto.createHash('sha2');
//         shasum.update(data.password+'A!VocaDo!');
//         data.password = shasum.digest('hex')
//       },
//     }, */
//     }
//   );
//   // users.associate = function(models) {
//   // associations can be defined here
//   // };
//   return users;
// };
