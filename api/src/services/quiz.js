import {isPast, isFuture, formatDistanceToNow} from 'date-fns';

export default ({
  QuizRepository,
  QuizAssociationRepository,
  UserRepository,
  GivenAnswerRepository,
}) => ({
  create: QuizRepository.create,
  update: QuizRepository.update,
  delete: QuizRepository.delete,
  assign: QuizAssociationRepository.setQuizAssociations,
  getAssociatedQuizzes: async (userId, query) => {
    const {count, rows} = await QuizRepository.getAssociatedQuizzes(userId, query);

    return {count, quizzes: rows};
  },
  get: async (userId, quizId, userType) => {
    const quizAssociation = await QuizAssociationRepository.get(userId, quizId);
    const quiz = quizAssociation.quiz.dataValues;
    const questions = quiz.questions
      .map(({dataValues}) => dataValues)
      .filter(({version}) => version === quizAssociation.version);
    const startDate = new Date(quiz.startDate);
    const endDate = new Date(quiz.endDate);

    if (userType === 'professor') {
      return quiz;
    }

    if (isPast(endDate)) {
      return {...quiz, questions};
    }

    return {
      ...quiz,
      questions: isFuture(startDate)
        ? []
        : questions
          .map(({answers, ...restQuestion}) => ({
            ...restQuestion,
            answers: answers
              .map(({dataValues}) => dataValues)
              .map(({isCorrect, ...restAnswer}) => restAnswer),
          })),
    };
  },
  getAssignationMap: async quizId => {
    const allStudents = await UserRepository.getStudentsAssignedToQuiz(quizId);

    return allStudents.map(({assignedQuizzes, ...student}) => ({
      ...student,
      version: assignedQuizzes.version || 0,
    }));
  },
  submit: async (userId, quizId, body) => {
    const quiz = await QuizRepository.get(userId, quizId);
    const quizAssociationId = quiz.QuizAssociations[0].id;
    const startDate = new Date(quiz.startDate);
    const endDate = new Date(quiz.endDate);
    const answers = Object
      .entries(body)
      .map(([questionId, answer]) => {
        const commonAnswer = {questionId, points: 0, quizAssociationId};

        return typeof answer === 'string'
          ? {...commonAnswer, answerId: null, statement: answer}
          : answer.map(answerId => ({...commonAnswer, statement: '', answerId}));
      })
      .flat();

    if (isFuture(startDate) || isPast(endDate)) {
      return null;
    }

    return GivenAnswerRepository.bulkCreate(answers);
  },
});
