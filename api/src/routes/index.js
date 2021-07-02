export default ({
  AuthController,
  UserController,
  QuizController,
  QuizAssociationController,
  QuestionController,
}) => ({
  unAuthenticated: [
    {route: '/api/signin', method: 'post', callback: AuthController.signIn},
    {route: '/api/signup', method: 'post', callback: UserController.create},
  ],
  authenticated: [
    {route: '/api/me', method: 'get', callback: UserController.me},
    {route: '/api/quiz-associations', method: 'get', callback: QuizAssociationController.getList},
    {route: '/api/quiz/:quizId', method: 'get', callback: QuizController.get},
    {route: '/api/quiz/:quizId/submit', method: 'post', callback: QuizController.submit},
    {route: '/api/quiz/:quizId/peer', method: 'get', callback: QuizController.peer},
    {route: '/api/quiz/:quizId/peer-review', method: 'post', callback: QuizController.peerReview},
  ],
  professorOnly: [
    {route: '/api/quiz', method: 'post', callback: QuizController.create},
    {route: '/api/quiz/:quizId', method: 'put', callback: QuizController.update},
    {route: '/api/quiz/:quizId', method: 'delete', callback: QuizController.delete},
    {route: '/api/quiz/:quizId/assign', method: 'post', callback: QuizController.assign},
    {route: '/api/quiz/:quizId/assign-map', method: 'get', callback: QuizController.getAssignationMap},
    {route: '/api/quiz/:quizId/grades', method: 'get', callback: QuizController.getGrades},
    {route: '/api/quiz/:quizId/grades/:userId', method: 'get', callback: QuizController.getGrade},
    {route: '/api/quiz/:quizId/question', method: 'post', callback: QuestionController.create},
    {route: '/api/quiz/:quizId/question/:questionId', method: 'get', callback: QuestionController.get},
    {route: '/api/quiz/:quizId/question/:questionId', method: 'put', callback: QuestionController.update},
    {route: '/api/quiz/:quizId/question/:questionId', method: 'delete', callback: QuestionController.delete},
    {route: '/api/quiz-association/:quizAssociationId/grade', method: 'post', callback: QuizAssociationController.grade},
  ],
});
