export default ({
  AuthController,
  UserController,
  QuizController,
  QuestionController,
}) => ({
  unAuthenticated: [
    {route: '/api/signin', method: 'post', callback: AuthController.signIn},
    {route: '/api/signup', method: 'post', callback: UserController.create},
  ],
  authenticated: [
    {route: '/api/me', method: 'get', callback: UserController.me},
    {route: '/api/quiz', method: 'get', callback: QuizController.get},
    {route: '/api/quiz/:quizId', method: 'get', callback: QuizController.getOne},
  ],
  professorOnly: [
    {route: '/api/quiz', method: 'post', callback: QuizController.create},
    {route: '/api/quiz/:quizId', method: 'put', callback: QuizController.update},
    {route: '/api/quiz/:quizId', method: 'delete', callback: QuizController.delete},
    {route: '/api/quiz/:quizId/assign', method: 'post', callback: QuizController.assign},
    {route: '/api/quiz/:quizId/assign-map', method: 'get', callback: QuizController.getAssignationMap},
    {route: '/api/quiz/:quizId/question', method: 'post', callback: QuestionController.create},
    {route: '/api/quiz/:quizId/question/:questionId', method: 'get', callback: QuestionController.get},
    {route: '/api/quiz/:quizId/question/:questionId', method: 'put', callback: QuestionController.update},
  ],
});
