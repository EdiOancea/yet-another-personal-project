export default ({QuestionService}) => ({
  create: async (req, res) => {
    const {
      body: {statement, type, answers},
      params: {quizId},
    } = req;

    res.json(await QuestionService.create({statement, answers, type, quizId}));
  },
  get: async (req, res) => {
    const {params: {quizId, questionId}} = req;

    res.json(await QuestionService.get({quizId, questionId}));
  },
});
