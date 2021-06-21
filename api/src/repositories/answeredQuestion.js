export default ({db: {AnsweredQuestion}}) => ({
  bulkCreate: answers => AnsweredQuestion.bulkCreate(
    answers,
    {updateOnDuplicate: ['questionId', 'quizAssociationId']}
  ),
});
