export default ({db: {Quiz, QuizAssociation}}) => ({
  create: async ({userId, ...rest}) => Quiz.create(
    {...rest, associations: [{userId, version: ''}]},
    {include: [Quiz.Association]}
  ),
  update: body => Quiz.update(body, {where: {id: body.id}}),
  delete: id => Quiz.destroy({where: {id}}),
});
