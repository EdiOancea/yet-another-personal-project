export default ({QuizService}) => ({
  create: async (req, res) => {
    const {
      body: {description, startDate, endDate},
      loggedUser: {userId},
    } = req;

    res.json(await QuizService.create({description, userId, startDate, endDate}));
  },
  assign: async (req, res) => {
    const {
      params: {quizId},
      body: {studentIds},
      loggedUser: {userId: professorId},
    } = req;

    res.json(await QuizService.assign({quizId, studentIds, professorId}));
  },
  get: async (req, res) => {
    const {loggedUser: {userId}, query} = req;

    res.json(await QuizService.get(userId, query));
  },
  update: async (req, res) => {
    const {
      body: {description, startDate, endDate},
      params: {quizId},
    } = req;

    res.json(await QuizService.update({description, startDate, endDate, id: quizId}));
  },
  delete: async (req, res) => {
    const {params: {quizId}} = req;

    res.json(await QuizService.delete(quizId));
  },
  getOne: async (req, res) => {
    const {loggedUser: {userId, userType}, params: {quizId}} = req;

    res.json(await QuizService.getOne(userId, quizId, userType));
  },
  getAssignationMap: async (req, res) => {
    const {params: {quizId}} = req;

    res.json(await QuizService.getAssignationMap(quizId));
  },
});
