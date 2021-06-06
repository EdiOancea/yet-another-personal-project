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

  Quiz.associate = ({QuizAssociation, User, Question}) => {
    Quiz.Association = Quiz.hasMany(QuizAssociation, {foreignKey: 'quizId', as: 'associations'});
    Quiz.belongsToMany(User, {through: QuizAssociation, foreignKey: 'quizId'});
    Quiz.hasMany(Question, {foreignKey: 'quizId', as: 'questions'});
  };

  return Quiz;
};
