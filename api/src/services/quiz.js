import {isPast, isFuture, formatDistanceToNow} from 'date-fns';

export default ({
  QuizRepository,
  QuizAssociationRepository,
  UserRepository,
  GivenAnswerRepository,
}) => {
  const getParsedQuizAssociation = async (userId, quizId) => {
    const quizAssociation = await QuizAssociationRepository.get(userId, quizId);
    const quiz = quizAssociation.quiz.dataValues;
    const startDate = new Date(quiz.startDate);
    const endDate = new Date(quiz.endDate);

    return {quizAssociation, quiz, startDate, endDate};
  };

  return {
    create: QuizRepository.create,
    update: QuizRepository.update,
    delete: QuizRepository.delete,
    assign: QuizAssociationRepository.assign,
    getAssignationMap: async quizId => {
      const allStudents = await UserRepository.getStudentsAssignedToQuiz(quizId);

      return allStudents.map(({assignedQuizzes, version, ...student}) => ({
        ...student,
        version: version || 0,
      }));
    },
    get: async (userId, quizId, userType) => {
      const {quizAssociation, quiz, startDate, endDate} = await getParsedQuizAssociation(userId, quizId);

      if (userType === 'professor') {
        return quiz;
      }

      const questions = quiz.questions
        .map(question => question.dataValues)
        .filter(question => question.version === quizAssociation.version);

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
    submit: async (userId, quizId, body) => {
      const {quizAssociation, quiz, startDate, endDate} = await getParsedQuizAssociation(userId, quizId);

      if (isFuture(startDate) || isPast(endDate)) {
        return 'This is not the time to submit this';
      }

      await GivenAnswerRepository.bulkCreate(
        Object
          .entries(body)
          .map(([questionId, answer]) => {
            const commonAnswer = {questionId, points: 0, quizAssociationId: quizAssociation.id};

            return typeof answer === 'string'
              ? {...commonAnswer, answerId: null, statement: answer}
              : answer.map(answerId => ({...commonAnswer, statement: '', answerId}));
          })
          .flat()
      );

      return 'OK';
    },
  };
};
