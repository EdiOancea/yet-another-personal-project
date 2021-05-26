export default ({
  db: {
    Quiz,
    Question,
    Answer,
    Sequelize,
    sequelize,
  },
}) => ({
  create: body => Question.create(
    body,
    {include: [Question.Answers]}
  ),
  get: ({quizId, questionId}) => Question.findOne({
    where: {id: questionId, quizId},
    include: [{model: Answer, as: 'answers'}],
  }),
  update: ({
    id,
    quizId,
    statement,
    type,
    answers,
    answerIdsToKeep,
  }) => sequelize.transaction(
    async transaction => {
      await Question.update(
        {statement, type},
        {
          where: {id},
          include: [{model: Quiz, where: {id: quizId}, attributes: []}],
          transaction,
        }
      );
      await Answer.destroy(
        {where: {questionId: id, id: {[Sequelize.Op.notIn]: answerIdsToKeep}}},
        {transaction}
      );
      await Answer.bulkCreate(
        answers.map(answer => ({questionId: id, ...answer})),
        {updateOnDuplicate: ['id'], transaction}
      );

      return 'OK';
    }
  ),
});
