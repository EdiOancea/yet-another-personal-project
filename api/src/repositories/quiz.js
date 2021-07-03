export default ({
  db: {
    Quiz,
    QuizAssociation,
    User,
  },
}) => ({
  getQuizWithAssociatedStudents: quizId => Quiz.findByPk(
    quizId,
    {
      include: {
        model: QuizAssociation,
        as: 'associations',
        include: {
          model: User,
          as: 'user',
          where: {type: 'student'},
        },
      },
    }
  ),
  create: async ({userId, ...rest}) => Quiz.create(
    {...rest, associations: [{userId, version: ''}]},
    {include: [Quiz.Association]}
  ),
  update: body => Quiz.update(body, {where: {id: body.id}}),
  delete: id => Quiz.destroy({where: {id}}),
  markAsGraded: id => Quiz.update({graded: true}, {where: {id}, fields: ['graded']}),
});
