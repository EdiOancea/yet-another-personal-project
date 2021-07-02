export default ({
  db: {
    QuizAssociation,
    Quiz,
    Question,
    Answer,
    AnsweredQuestion,
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
      {model: AnsweredQuestion, as: 'answeredQuestions', required: false},
    ],
  }),
  getQuizAssociationId: (userId, quizId) => QuizAssociation.findOne({
    where: {userId},
    include: [{model: Quiz, as: 'quiz', where: {id: quizId}, attributes: [], required: true}],
    attributes: ['id'],
    raw: true,
  }),
  getQuizAssociationByPeer: (quizId, peerId) => QuizAssociation.findOne({
    where: {quizId, peerId},
    include: {
      model: AnsweredQuestion,
      as: 'answeredQuestions',
      include: {
        model: Question,
        as: 'question',
        where: {type: 'essay'},
      },
    },
  }),
  getList: (userId, {page, pageSize}) => QuizAssociation.findAndCountAll({
    where: {userId},
    include: [{model: Quiz, as: 'quiz'}],
    offset: page * pageSize,
    limit: pageSize,
  }),
  assign: (quizId, professorId, associations) => sequelize.transaction(
    async transaction => {
      await QuizAssociation.destroy(
        {where: {quizId, userId: {[Sequelize.Op.ne]: professorId}}},
        {transaction}
      );
      await QuizAssociation.bulkCreate(associations, {transaction});

      return 'OK';
    }
  ),
  updateFinalGrade: (quizAssociationId, body) => QuizAssociation.update(
    body,
    {where: {id: quizAssociationId}, fields: ['finalGrade', 'comment']},
  ),
});
