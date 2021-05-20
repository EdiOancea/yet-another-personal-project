module.exports = (sequelize, DataTypes) => {
  const UserQuiz = sequelize.define(
    'UserQuiz',
    {
      userId: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      quizId: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
    },
    {timestamps: false, underscored: true}
  );

  UserQuiz.associate = ({User, Quiz}) => {
    UserQuiz.belongsTo(Quiz, {foreignKey: 'quizId'});
    UserQuiz.belongsTo(User, {foreignKey: 'userId'});
  };

  return UserQuiz;
};
