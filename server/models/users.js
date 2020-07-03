// const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      //   password: DataTypes.STRING
    },
    {
      /* hooks: {
      afterValidate: (data, options) => {
        let shasum = crypto.createHash('sha2');
        shasum.update(data.password+'A!VocaDo!');
        data.password = shasum.digest('hex')
      },
    }, */
    }
  );
  // users.associate = function(models) {
  // associations can be defined here
  // };
  return users;
};
