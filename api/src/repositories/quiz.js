export default ({db: {Quiz, QuizAssociation}}) => ({
  create: async ({userId, ...rest}) => Quiz.create(
    {...rest, associations: [{userId, version: -1}]},
    {include: [Quiz.Association]}
  ),
  update: body => Quiz.update(body, {where: {id: body.id}}),
  delete: id => Quiz.destroy({where: {id}}),
  getList: (userId, {page, pageSize}) => Quiz.findAndCountAll({
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
