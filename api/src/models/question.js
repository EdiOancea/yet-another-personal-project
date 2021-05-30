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
    },
    {timestamps: false, underscored: true}
  );

  Question.associate = ({Quiz, Answer, QuestionAssociation}) => {
    Question.belongsTo(Quiz, {foreignKey: 'quizId'});
    Question.Answers = Question.hasMany(Answer, {foreignKey: 'questionId', as: 'answers'});
    Question.hasMany(QuestionAssociation, {foreignKey: 'question_id', as: 'questionAssociations'});
  };

  return Question;
};
