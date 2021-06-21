module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define(
    'Question',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      statement: DataTypes.STRING,
      type: DataTypes.STRING,
      availablePoints: DataTypes.INTEGER,
      version: {type: DataTypes.STRING, defaultValue: ''},
    },
    {timestamps: false, underscored: true}
  );

  Question.associate = ({Quiz, Answer, AnsweredQuestion}) => {
    Question.belongsTo(Quiz, {foreignKey: 'quizId'});
    Question.Answers = Question.hasMany(Answer, {foreignKey: 'questionId', as: 'answers'});
    Question.hasMany(AnsweredQuestion, {foreignKey: 'questionId', as: 'answeredQuestions'});
  };

  return Question;
};
