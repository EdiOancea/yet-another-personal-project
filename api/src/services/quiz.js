import {isPast, isFuture, formatDistanceToNow} from 'date-fns';

export default ({QuizRepository, UserRepository}) => ({
  create: QuizRepository.create,
  assign: QuizRepository.assign,
  get: async (...args) => {
    const {count, rows} = await QuizRepository.get(...args);

    return {count, quizzes: rows};
  },
  getOne: async (userId, quizId, userType) => {
    const quiz = (await QuizRepository.getOne(userId, quizId)).dataValues;
    const startDate = new Date(quiz.startDate);
    const endDate = new Date(quiz.endDate);

    if (userType === 'professor' || isPast(endDate)) {
      return quiz;
    }

    const {questions, ...rest} = quiz;

    return {
      ...rest,
      questions: isFuture(startDate)
        ? []
        : questions
          .map(({dataValues}) => dataValues)
          .map(({answers, ...restQuestion}) => ({
            ...restQuestion,
            answers: answers
              .map(({dataValues}) => dataValues)
              .map(({isCorrect, ...restAnswer}) => restAnswer),
          })),
    };
  },
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
