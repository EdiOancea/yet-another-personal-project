export default ({
  db: {
    User,
    Quiz,
    QuizAssociation,
    sequelize,
    Sequelize,
  },
}) => ({
  create: async ({userId, ...rest}) => Quiz.create(
    {...rest, associations: [{userId, version: -1}]},
    {include: [Quiz.Association]}
  ),
  update: body => Quiz.update(body, {where: {id: body.id}}),
  delete: id => Quiz.destroy({where: {id}}),
  get: (userId, quizId) => Quiz.findOne({
    where: {id: quizId},
    include: [
      {model: User, where: {id: userId}},
      {model: QuizAssociation, where: {quizId, userId}, attributes: ['id']},
    ],
  }).then(({dataValues}) => dataValues),
  getAssociatedQuizzes: (userId, {page, pageSize}) => Quiz.findAndCountAll({
    include: [
      {
        model: QuizAssociation,
        as: 'associations',
        where: {userId},
        attributes: [],
      },
    ],
    offset: page * pageSize,
    limit: pageSize,
  }),
});
