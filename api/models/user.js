'use strict';
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A first name is required'
        }, 
        notEmpty: {
          msg: 'Please provide a first name'
        }
      }
    },
    lastName: {
      type:  DataTypes.STRING,
      allowNull: false, 
      validate: {
        notNull: {
          msg: 'A last name is required'
        }, 
        notEmpty: {
          msg: 'Please provide a last name'
        }
      }
  },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,  validate: {
        notNull: {
          msg: 'An email address is required'
        }, 
        isEmail: {
          msg: 'Please provide an email address'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        notNull: {
          msg: 'A password is required'
        }, 
        notEmpty: {
          msg: 'Please provide a password'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  User.associate = (models) => {
    User.hasMany(models.Course, {
      //alias
       as: 'courses',
       foreignKey: {
        fieldName: 'userId', 
        allowNull: false,
      },
    });
  };
  return User;
};