export default ({QuizAssociationService}) => ({
  get: async (req, res) => {
    const {loggedUser: {userId, userType}, params: {quizAssociationId}} = req;

    res.json(await QuizAssociationService.get(userId, quizAssociationId, userType));
  },
  getList: async (req, res) => {
    const {loggedUser: {userId}, query} = req;

    res.json(await QuizAssociationService.getList(userId, query));
  },
  grade: async (req, res) => {
    const {
      params: {quizAssociationId},
      body,
    } = req;

    res.json(await QuizAssociationService.grade(quizAssociationId, body));
  },
});
