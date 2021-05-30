module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define(
    'Question',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      statement: {type: DataTypes.STRING},
      type: {type: DataTypes.STRING},
      availablePoints: {type: DataTypes.INTEGER},
      version: {type: DataTypes.INTEGER},
    },
    {timestamps: false, underscored: true}
  );

  Question.associate = ({Quiz, Answer, GivenAnswer}) => {
    Question.belongsTo(Quiz, {foreignKey: 'quizId'});
    Question.Answers = Question.hasMany(Answer, {foreignKey: 'questionId', as: 'answers'});
    Question.hasMany(GivenAnswer, {foreignKey: 'question_id', as: 'givenAnswers'});
  };

  return Question;
};
