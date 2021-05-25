export default ({db: {Question, Answer}}) => ({
  create: body => Question.create(body, {include: [Question.Answers]}),
  get: ({quizId, questionId}) => Question.findOne({
    where: {id: questionId, quizId},
    include: [{model: Answer, as: 'answers'}],
  }),
});
