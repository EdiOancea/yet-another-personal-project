export default ({db: {User, Quiz, UserQuiz, sequelize, Sequelize}}) => ({
  create: async ({userId, ...rest}) => {
    const {dataValues} = await sequelize.transaction(
      async transaction => {
        const quiz = await Quiz.create(rest, {transaction});
        await UserQuiz.create(
          {quizId: quiz.id, userId},
          {transaction}
        );

        return quiz;
      }
    );

    return dataValues;
  },
  assign: ({studentIds, quizId, professorId}) => sequelize.transaction(
    async transaction => {
      await UserQuiz.destroy(
        {
          where: {
            quizId,
            userId: {[Sequelize.Op.notIn]: [...studentIds, professorId]},
          },
          include: [{model: User, where: {type: 'student'}}],
        },
        {transaction}
      );
      await UserQuiz.bulkCreate(
        studentIds.map(userId => ({quizId, userId})),
        {updateOnDuplicate: ['userId'], transaction}
      );
    }
  ),
  get: (userId, {page, pageSize}) => Quiz.findAndCountAll({
    include: [
      {
        model: UserQuiz,
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
        model: UserQuiz,
        where: {userId, quizId},
        attributes: [],
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
        model: UserQuiz,
        where: {quizId},
        required: false,
      },
    ],
  }),
});
