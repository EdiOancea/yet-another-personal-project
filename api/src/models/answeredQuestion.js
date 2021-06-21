module.exports = (sequelize, DataTypes) => {
  const AnsweredQuestion = sequelize.define(
    'AnsweredQuestion',
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
      answer: DataTypes.STRING,
      points: {type: DataTypes.INTEGER, defaultValue: 0},
      comment: {type: DataTypes.STRING, defaultValue: ''},
      peerPoints: {type: DataTypes.INTEGER, field: 'peer_points', defaultValue: 0},
      peerComment: {type: DataTypes.STRING, field: 'peer_comment', defaultValue: ''},
    },
    {timestamps: false, underscored: true}
  );

  AnsweredQuestion.associate = ({Question, Answer, QuizAssociation}) => {
    AnsweredQuestion.belongsTo(Question, {foreignKey: 'questionId'});
    AnsweredQuestion.belongsTo(QuizAssociation, {foreignKey: 'quizAssociationId'});
  };

  return AnsweredQuestion;
};
