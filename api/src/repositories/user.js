export default ({db: {User, QuizAssociation}}) => ({
  create: body => User.create({...body, active: false}),
  getByEmail: email => User.findOne({
    where: {email},
    attributes: {include: 'password'},
  }),
  get: id => User.findByPk(id),
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
