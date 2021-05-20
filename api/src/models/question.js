module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define(
    'Question',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      description: {type: DataTypes.STRING},
      type: {type: DataTypes.STRING},
    },
    {timestamps: false, underscored: true}
  );

  Question.associate = ({Quiz, Answers}) => {
    Question.belongsTo(Quiz, {foreignKey: 'quizId'});
    Question.hasMany(Answers, {foreignKey: 'questionId'});
  };

  return Question;
};
