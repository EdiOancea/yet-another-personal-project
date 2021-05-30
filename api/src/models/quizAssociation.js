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
    },
    {timestamps: false, underscored: true}
  );

  QuizAssociation.associate = ({User, Quiz, QuestionAssociation}) => {
    QuizAssociation.belongsTo(Quiz, {foreignKey: 'quizId'});
    QuizAssociation.belongsTo(User, {foreignKey: 'userId'});
    QuizAssociation.hasMany(QuestionAssociation, {foreignKey: 'quiz_association_id', as: 'questionAssociations'});
  };

  return QuizAssociation;
};
