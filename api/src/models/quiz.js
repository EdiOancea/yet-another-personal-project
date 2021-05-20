module.exports = (sequelize, DataTypes) => {
  const Quiz = sequelize.define(
    'Quiz',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {len: [6, 1024]},
      },
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
    },
    {timestamps: false, underscored: true}
  );

  Quiz.associate = ({UserQuiz, User}) => {
    Quiz.hasMany(UserQuiz, {foreignKey: 'quizId'});
    Quiz.belongsToMany(User, {through: UserQuiz});
  };

  return Quiz;
};
