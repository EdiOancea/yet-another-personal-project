export default ({QuizService}) => ({
  create: async (req, res) => {
    const {
      body: {title, description, startDate, endDate},
      loggedUser: {userId},
    } = req;

    res.json(await QuizService.create({title, description, userId, startDate, endDate}));
  },
  assign: async (req, res) => {
    const {
      params: {quizId},
      body: {studentIds},
      loggedUser: {userId: professorId},
    } = req;

    res.json(await QuizService.assign({quizId, studentIds, professorId}));
  },
  update: async (req, res) => {
    const {
      body: {title, description, startDate, endDate},
      params: {quizId},
    } = req;

    res.json(await QuizService.update({title, description, startDate, endDate, id: quizId}));
  },
  delete: async (req, res) => {
    const {params: {quizId}} = req;

    res.json(await QuizService.delete(quizId));
  },
  get: async (req, res) => {
    const {loggedUser: {userId, userType}, params: {quizId}} = req;

    res.json(await QuizService.get(userId, quizId, userType));
  },
  getAssignationMap: async (req, res) => {
    const {params: {quizId}} = req;

    res.json(await QuizService.getAssignationMap(quizId));
  },
  submit: async (req, res) => {
    const {
      loggedUser: {userId},
      params: {quizId},
      body,
    } = req;

    res.json(await QuizService.submit(userId, quizId, body));
  },
  peer: async (req, res) => {
    const {loggedUser: {userId}, params: {quizId}} = req;

    res.json(await QuizService.peer(userId, quizId));
  },
  peerReview: async (req, res) => {
    const {
      loggedUser: {userId},
      params: {quizId},
      body: {comments, grades},
    } = req;

    res.json(await QuizService.peerReview(userId, quizId, comments, grades));
  },
  getGrades: async (req, res) => {
    const {params: {quizId}} = req;

    res.json(await QuizService.getGrades(quizId));
  },
  getGrade: async (req, res) => {
    const {params: {quizId, userId}} = req;

    res.json(await QuizService.getGrade(quizId, userId));
  },
});
