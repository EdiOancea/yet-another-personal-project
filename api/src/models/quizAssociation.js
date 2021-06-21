module.exports = (sequelize, DataTypes) => {
  const QuizAssociation = sequelize.define(
    'QuizAssociation',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: DataTypes.UUID,
      quizId: DataTypes.UUID,
      peerId: DataTypes.UUID,
      version: {type: DataTypes.STRING, defaultValue: ''},
      finalGrade: {type: DataTypes.INTEGER, defaultValue: 0},
      comment: {type: DataTypes.STRING, defaultValue: ''},
    },
    {timestamps: false, underscored: true}
  );

  QuizAssociation.associate = ({User, Quiz, AnsweredQuestion}) => {
    QuizAssociation.belongsTo(Quiz, {foreignKey: 'quizId', as: 'quiz'});
    QuizAssociation.belongsTo(User, {foreignKey: 'userId'});
    QuizAssociation.belongsTo(User, {foreignKey: 'peerId'});
    QuizAssociation.hasMany(AnsweredQuestion, {foreignKey: 'quizAssociationId', as: 'answeredQuestions'});
  };

  return QuizAssociation;
};
