const bcrypt = require('bcrypt')

async function hashPassword (user, options) {
  const SALT_FACTOR = 8

  if (!user.changed('password')) return

  const hash = await bcrypt.hash(user.password, SALT_FACTOR)
  user.setDataValue('password', hash)
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipcode: DataTypes.STRING,
    country: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeSave: hashPassword
    }
  })

  User.prototype.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
  }

  User.associate = function (models) {
  }

  return User
}