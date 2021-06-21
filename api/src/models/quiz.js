module.exports = (sequelize, DataTypes) => {
  const Quiz = sequelize.define(
    'Quiz',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      graded: {type: DataTypes.BOOLEAN, defaultValue: false},
    },
    {timestamps: false, underscored: true}
  );

  Quiz.associate = ({QuizAssociation, Question}) => {
    Quiz.Association = Quiz.hasMany(QuizAssociation, {foreignKey: 'quizId', as: 'associations'});
    Quiz.hasMany(Question, {foreignKey: 'quizId', as: 'questions'});
  };

  return Quiz;
};
