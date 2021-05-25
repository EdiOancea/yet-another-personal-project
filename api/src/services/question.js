export default ({QuestionRepository}) => ({
  create: body => {
    const {type, answers, ...rest} = body;

    return QuestionRepository.create({...body, answers: type === 'essay' ? [] : answers});
  },
  get: QuestionRepository.get,
});
