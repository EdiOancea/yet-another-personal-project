export default ({
  db: {
    User,
    Quiz,
    Question,
    Answer,
    QuizAssociation,
    sequelize,
    Sequelize,
  },
}) => ({
  create: async ({userId, ...rest}) => {
    const {dataValues} = await sequelize.transaction(
      async transaction => {
        const quiz = await Quiz.create(rest, {transaction});
        await QuizAssociation.create(
          {quizId: quiz.id, userId, version: -1},
          {transaction}
        );

        return quiz;
      }
    );

    return dataValues;
  },
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
  get: (userId, {page, pageSize}) => Quiz.findAndCountAll({
    include: [
      {
        model: QuizAssociation,
        where: {userId},
        attributes: [],
      },
    ],
    offset: page * pageSize,
    limit: pageSize,
  }),
  getOne: (userId, quizId) => Quiz.findOne({
    include: [
      {
        model: QuizAssociation,
        where: {userId, quizId},
        attributes: [],
      },
      {
        model: Question,
        as: 'questions',
        include: [{model: Answer, as: 'answers'}],
      },
    ],
  }),
  update: body => {
    const {id} = body;

    return Quiz.update(body, {where: {id}});
  },
  delete: id => Quiz.destroy({where: {id}}),
  getStudentsAssignedToQuiz: quizId => User.findAll({
    where: {type: 'student'},
    include: [
      {
        model: QuizAssociation,
        as: 'assignedQuizzes',
        where: {quizId},
        required: false,
      },
    ],
    raw: true,
    nest: true,
  }),
});
