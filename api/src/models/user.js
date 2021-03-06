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
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      password: DataTypes.STRING,
      type: {
        type: DataTypes.STRING,
        validate: {isIn: [['student', 'professor', 'admin']]},
      },
      active: DataTypes.BOOLEAN,
    }, {
      timestamps: false,
      underscored: true,
      defaultScope: {attributes: {exclude: ['password']}},
    }
  );

  User.associate = ({QuizAssociation}) => {
    User.hasMany(QuizAssociation, {foreignKey: 'userId', as: 'assignedQuizzes'});
  };

  User.beforeCreate(user => {
    user.password = bcrypt.hashSync(user.password, 10);
    user.email = user.email.toLowerCase();
  });

  return User;
};
