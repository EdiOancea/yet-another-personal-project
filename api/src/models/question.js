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
    },
    {timestamps: false, underscored: true}
  );

  Question.associate = ({Quiz, Answer}) => {
    Question.belongsTo(Quiz, {foreignKey: 'quizId'});
    Question.Answers = Question.hasMany(Answer, {foreignKey: 'questionId', as: 'answers'});
  };

  return Question;
};
