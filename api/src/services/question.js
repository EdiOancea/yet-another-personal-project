export default ({QuestionRepository}) => ({
  create: ({type, answers, ...rest}) => QuestionRepository.create({
    ...rest,
    type,
    answers: type === 'essay' ? [] : answers,
  }),
  get: QuestionRepository.get,
  update: ({type, answers, id, ...rest}) => {
    const parsedAnswers = type === 'essay'
      ? []
      : answers.map(answer => ({...answer, questionId: id}));
    const answerIdsToKeep = answers
      .filter(answer => answer.id)
      .map(answer => answer.id);

    return QuestionRepository.update({
      ...rest,
      id,
      type,
      answers: parsedAnswers,
      answerIdsToKeep,
    });
  },
  delete: QuestionRepository.delete,
});
