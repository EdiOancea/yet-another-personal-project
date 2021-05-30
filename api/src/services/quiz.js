export default ({QuizRepository, UserRepository}) => ({
  create: QuizRepository.create,
  assign: QuizRepository.assign,
  get: async (...args) => {
    const {count, rows} = await QuizRepository.get(...args);

    return {count, quizzes: rows};
  },
  getOne: QuizRepository.getOne,
  update: QuizRepository.update,
  delete: QuizRepository.delete,
  getAssignationMap: async quizId => {
    const allStudents = await QuizRepository.getStudentsAssignedToQuiz(quizId);

    return allStudents.map(({assignedQuizzes, ...student}) => ({
      ...student,
      version: assignedQuizzes.version || 0,
    }));
  },
});
