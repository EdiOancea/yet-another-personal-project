import {isPast, isFuture, formatDistanceToNow} from 'date-fns';

export default ({
  QuizRepository,
  QuizAssociationRepository,
  UserRepository,
  AnsweredQuestionRepository,
}) => {
  const getParsedQuizAssociation = async (userId, quizId) => {
    const quizAssociationId = (await QuizAssociationRepository.getQuizAssociationId(userId, quizId)).id;
    const quizAssociation = (await QuizAssociationRepository.get(quizAssociationId)).dataValues;
    const quiz = quizAssociation.quiz.dataValues;
    const startDate = new Date(quiz.startDate);
    const endDate = new Date(quiz.endDate);

    return {
      quizAssociation,
      quiz: {...quiz, answeredQuestions: quizAssociation.answeredQuestions},
      startDate,
      endDate,
    };
  };

  return {
    create: QuizRepository.create,
    update: QuizRepository.update,
    delete: QuizRepository.delete,
    assign: ({studentIds, quizId, professorId}) => {
      const associations = [];
      const versions = ['a', 'b', 'c'];

      for (let i = 0; i < studentIds.length; i++) {
        associations.push({
          version: versions[(i + 1) % 3],
          userId: studentIds[i],
          peerId: studentIds[(i + 1) % studentIds.length],
          quizId,
        });
      }

      return QuizAssociationRepository.assign(quizId, professorId, associations);
    },
    getAssignationMap: async quizId => {
      const allStudents = await UserRepository.getStudentsAssignedToQuiz(quizId);

      return allStudents
        .map(student => student.dataValues)
        .map(({assignedQuizzes: [assignedQuiz], ...student}) => ({
          ...student,
          version: assignedQuiz ? assignedQuiz.dataValues.version : '',
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

      await AnsweredQuestionRepository.bulkCreate(
        Object
          .entries(body)
          .map(([questionId, answer]) => ({questionId, quizAssociationId: quizAssociation.id, answer}))
      );

      return 'OK';
    },
  };
};
