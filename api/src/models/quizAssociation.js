module.exports = (sequelize, DataTypes) => {
  const QuizAssociation = sequelize.define(
    'QuizAssociation',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {type: DataTypes.UUID},
      quizId: {type: DataTypes.UUID},
      version: {type: DataTypes.INTEGER},
    },
    {timestamps: false, underscored: true}
  );

  QuizAssociation.associate = ({User, Quiz, GivenAnswer}) => {
    QuizAssociation.belongsTo(Quiz, {foreignKey: 'quizId'});
    QuizAssociation.belongsTo(User, {foreignKey: 'userId'});
    QuizAssociation.hasMany(GivenAnswer, {foreignKey: 'quiz_association_id', as: 'givenAnswers'});
  };

  return QuizAssociation;
};
