export default ({db: {GivenAnswer}}) => ({
  bulkCreate: answers => GivenAnswer.bulkCreate(answers),
  delete: () => {},
});
