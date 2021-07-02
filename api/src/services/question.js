export default ({QuestionRepository}) => ({
  get: QuestionRepository.get,
  delete: QuestionRepository.delete,
  create: ({type, answers, ...rest}) => QuestionRepository.create({
    ...rest,
    type,
    answers: type === 'essay' ? [] : answers,
  }),
  update: ({type, answers, id, ...rest}) => {
    const parsedAnswers = type === 'essay'
      ? []
      : answers.map(answer => ({...answer, questionId: id}));
    const answerIdsToKeep = parsedAnswers.map(answer => answer.id).filter(Boolean);

    return QuestionRepository.update({
      ...rest,
      id,
      type,
      answers: parsedAnswers,
      answerIdsToKeep,
    });
  },
});
