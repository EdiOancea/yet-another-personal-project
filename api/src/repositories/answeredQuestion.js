export default ({db: {AnsweredQuestion, sequelize}}) => ({
  bulkCreate: answers => AnsweredQuestion.bulkCreate(
    answers,
    {ignoreDuplicates: true}
  ),
  bulkUpsert: answers => AnsweredQuestion.bulkCreate(
    answers,
    {updateOnDuplicate: ['answer', 'points']}
  ),
  bulkUpdate: (answers, fieldsToUpdate) => sequelize.transaction(
    transaction => answers.map(({id, ...rest}) => AnsweredQuestion.update(
      rest,
      {where: {id}, fields: fieldsToUpdate},
    ))
  ),
});
