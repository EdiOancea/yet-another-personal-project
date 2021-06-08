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
  get: quizAssociationId => QuizAssociation.findOne({
    where: {id: quizAssociationId},
    include: [
      {
        model: Quiz,
        as: 'quiz',
        include: [
          {
            model: Question,
            as: 'questions',
            include: [{model: Answer, as: 'answers'}],
          },
        ],
      },
      {
        model: GivenAnswer,
        as: 'givenAnswers',
        where: {quizAssociationId},
        required: false,
      },
    ],
  }),
  getQuizAssociationId: (userId, quizId) => QuizAssociation.findOne({
    where: {userId},
    include: [{model: Quiz, as: 'quiz', where: {id: quizId}, attributes: [], required: true}],
    attributes: ['id'],
    raw: true,
  }),
  getList: (userId, {page, pageSize}) => QuizAssociation.findAndCountAll({
    where: {userId},
    include: [{model: Quiz, as: 'quiz'}],
    offset: page * pageSize,
    limit: pageSize,
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

      return 'OK';
    }
  ),
});
