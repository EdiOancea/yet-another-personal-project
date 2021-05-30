import bcrypt from 'bcrypt';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {isEmail: true},
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {len: [3, 70]},
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {len: [3, 70]},
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {len: [6, 70]},
      },
      type: {
        type: DataTypes.STRING,
        validate: {isIn: [['student', 'professor']]},
      },
      active: {type: DataTypes.BOOLEAN},
    }, {
      timestamps: false,
      underscored: true,
      defaultScope: {attributes: {exclude: ['password']}},
    }
  );

  User.associate = ({QuizAssociation, Quiz}) => {
    User.hasMany(QuizAssociation, {foreignKey: 'userId'});
    User.belongsToMany(Quiz, {through: QuizAssociation});
  };

  User.beforeCreate(user => {
    user.password = bcrypt.hashSync(user.password, 10);
    user.email = user.email.toLowerCase();
  });

  return User;
};
