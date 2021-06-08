export default ({
  db: {
    QuizAssociation,
    Quiz,
    Question,
    Answer,
    User,
    GivenAnswer,
    Sequelize,
    sequelize,
  },
}) => ({
  get: (userId, quizId) => QuizAssociation.findOne({
    where: {userId},
    include: [
      {
        model: Quiz,
        as: 'quiz',
        where: {id: quizId},
        include: [
          {
            model: Question,
            as: 'questions',
            include: [{model: Answer, as: 'answers'}],
          },
        ],
      },
    ],
  }),
  assign: ({studentIds, quizId, professorId}) => sequelize.transaction(
    async transaction => {
      await QuizAssociation.destroy(
        {
          where: {
            quizId,
            userId: {[Sequelize.Op.notIn]: [...studentIds, professorId]},
          },
          include: [{model: User, where: {type: 'student'}}],
        },
        {transaction}
      );
      await QuizAssociation.bulkCreate(
        studentIds.map(userId => ({
          quizId,
          userId,
          version: Math.floor(Math.random() * 3 + 1),
        })),
        {updateOnDuplicate: ['quizId', 'userId'], transaction}
      );
    }
  ),
});
