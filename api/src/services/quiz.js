import {isPast, isFuture, formatDistanceToNow} from 'date-fns';

const computeScore = (question, answer) => {
  const answers = question.answers.map(({dataValues}) => dataValues);
  const correctAnswers = answers.filter(({isCorrect}) => isCorrect).map(({id}) => id);

  switch (question.type) {
    case 'essay': return 0;
    case 'singleOption': {
      const [singleOptionAnswer] = correctAnswers;

      return singleOptionAnswer === answer ? question.availablePoints : 0;
    }
    case 'multipleOptions': {
      const correctCount = correctAnswers.length;
      const incorrectCount = answers.length - correctCount;
      const actualCorrect = answer.split(',').filter(key => correctAnswers.includes(key)).length;
      const actualIncorrect = answer.split(',').filter(key => !correctAnswers.includes(key)).length;
      const correctRatio = actualCorrect / correctCount;
      const incorrectRatio = actualIncorrect / incorrectCount;

      return Math.max(0, Math.ceil(question.availablePoints * (correctRatio - incorrectRatio)));
    }
    default: return 0;
  }
};

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
      quiz: {
        ...quiz,
        answeredQuestions: quizAssociation.answeredQuestions,
      },
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
        .filter(question => question.version.split(',').includes(quizAssociation.version));

      if (isPast(endDate)) {
        const response = {...quiz, questions, finalGrade: quizAssociation.finalGrade};

        if (questions.length === quiz.answeredQuestions.length) {
          return response;
        }

        const answeredQuestions = await AnsweredQuestionRepository.bulkCreate(
          questions
            .filter(({id}) => !quiz.answeredQuestions.find(({questionId}) => questionId === id))
            .map(({id}) => ({
              questionId: id,
              quizAssociationId: quizAssociation.id,
              answer: '',
            }))
        );

        return {...response, answeredQuestions};
      }

      return {
        ...quiz,
        questions: isFuture(startDate)
          ? []
          : questions
            .map(({answers, ...restQuestion}) => ({
              ...restQuestion,
              explanation: isFuture(endDate) ? '' : restQuestion.explanation,
              answers: answers
                .map(({dataValues}) => dataValues)
                .map(({isCorrect, ...restAnswer}) => restAnswer),
            })),
      };
    },
    submit: async (userId, quizId, body) => {
      const {
        quizAssociation,
        quiz: {questions},
        startDate,
        endDate,
      } = await getParsedQuizAssociation(userId, quizId);

      if (isFuture(startDate) || isPast(endDate)) {
        return 'This is not the time to submit this';
      }

      await AnsweredQuestionRepository.bulkUpsert(
        Object
          .entries(body)
          .map(([questionId, answer]) => ({
            questionId,
            quizAssociationId: quizAssociation.id,
            answer,
            points: computeScore(questions.find(({id}) => id === questionId).dataValues, answer),
          }))
      );

      return 'OK';
    },
    peer: async (userId, quizId) => {
      const queryResult = await QuizAssociationRepository.getQuizAssociationByPeer(quizId, userId);
      if (!queryResult) {
        return [];
      }

      return queryResult.dataValues.answeredQuestions.map(({
        answer,
        question,
        id,
        peerComment,
        peerPoints,
      }) => {
        const {statement, id: questionId, availablePoints} = question.dataValues;

        return {answer, statement, availablePoints, questionId, id, peerComment, peerPoints};
      });
    },
    peerReview: (userId, quizId, comments, grades) => AnsweredQuestionRepository.bulkUpdate(
      Object
        .keys(comments)
        .map(id => ({id, peerPoints: grades[id], peerComment: comments[id]})),
      ['peerPoints', 'peerComment']
    ),
    getGrades: QuizRepository.getQuizWithAssociatedStudents,
    getGrade: getParsedQuizAssociation,
    markAsGraded: QuizRepository.markAsGraded,
  };
};
