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

  Answer.associate = ({Question}) => {
    Answer.belongsTo(Question, {foreignKey: 'questionId'});
  };

  return Answer;
};
