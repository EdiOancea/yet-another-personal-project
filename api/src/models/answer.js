module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define(
    'Answer',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      statement: DataTypes.STRING,
      isCorrect: DataTypes.BOOLEAN,
    },
    {timestamps: false, underscored: true}
  );

  Answer.associate = ({Question}) => {
    Answer.belongsTo(Question, {foreignKey: 'questionId'});
  };

  return Answer;
};
