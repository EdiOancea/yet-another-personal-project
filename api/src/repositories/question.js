export default ({
  db: {
    Quiz,
    Question,
    Answer,
    Sequelize,
    sequelize,
  },
}) => ({
  create: body => Question.create(body, {include: [Question.Answers]}),
  get: ({quizId, questionId}) => Question.findOne({
    where: {id: questionId, quizId},
    include: [{model: Answer, as: 'answers'}],
  }),
  update: ({
    id,
    quizId,
    answers,
    answerIdsToKeep,
    ...rest
  }) => sequelize.transaction(
    async transaction => {
      await Question.update(
        rest,
        {
          where: {id},
          include: [{model: Quiz, where: {id: quizId}}],
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
  delete: ({id, quizId}) => Question.destroy({where: {id, quizId}}),
});
