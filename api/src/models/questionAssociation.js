module.exports = (sequelize, DataTypes) => {
  const QuestionAssociation = sequelize.define(
    'QuestionAssociation',
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

  QuestionAssociation.associate = ({Question, QuizAssociation}) => {
    QuestionAssociation.belongsTo(Question, {foreignKey: 'question_id'});
    QuestionAssociation.belongsTo(QuizAssociation, {foreignKey: 'quiz_association_id'});
  };

  return QuestionAssociation;
};
