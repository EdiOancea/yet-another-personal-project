module.exports = (sequelize, DataTypes) => {
  const GivenAnswer = sequelize.define(
    'GivenAnswer',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      questionId: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      quizAssociationId: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      points: {type: DataTypes.INTEGER},
    },
    {timestamps: false, underscored: true}
  );

  GivenAnswer.associate = ({Question, Answer, QuizAssociation}) => {
    GivenAnswer.belongsTo(Question, {foreignKey: 'question_id'});
    GivenAnswer.belongsTo(QuizAssociation, {foreignKey: 'quiz_association_id'});
    GivenAnswer.belongsTo(Answer, {foreignKey: 'answer_id'});
  };

  return GivenAnswer;
};
