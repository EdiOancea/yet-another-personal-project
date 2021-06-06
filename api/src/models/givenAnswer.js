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
      statement: {type: DataTypes.STRING},
      points: {type: DataTypes.INTEGER},
    },
    {timestamps: false, underscored: true}
  );

  GivenAnswer.associate = ({Question, Answer, QuizAssociation}) => {
    GivenAnswer.belongsTo(Question, {foreignKey: 'questionId'});
    GivenAnswer.belongsTo(QuizAssociation, {foreignKey: 'quizAssociationId'});
    GivenAnswer.belongsTo(Answer, {foreignKey: 'answerId'});
  };

  return GivenAnswer;
};
