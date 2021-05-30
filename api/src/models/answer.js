module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define(
    'Answer',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      statement: {type: DataTypes.STRING},
      isCorrect: {type: DataTypes.BOOLEAN},
    },
    {timestamps: false, underscored: true}
  );

  Answer.associate = ({Question, GivenAnswer}) => {
    Answer.belongsTo(Question, {foreignKey: 'questionId'});
    Answer.hasMany(GivenAnswer, {foreignKey: 'answer_id', as: 'givenAnswers'});
  };

  return Answer;
};
