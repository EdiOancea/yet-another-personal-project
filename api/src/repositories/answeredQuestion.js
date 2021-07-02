export default ({db: {AnsweredQuestion, sequelize}}) => {
  const updatePeer = (id, answeredQuestion) => AnsweredQuestion.update(
    answeredQuestion,
    {where: {id}, fields: ['peerPoints', 'peerComment']},
  );
  const gradeQuestion = (id, grade) => AnsweredQuestion.update(
    grade,
    {where: {id}, fields: ['points', 'comment']},
  );

  return {
    bulkCreate: answers => AnsweredQuestion.bulkCreate(
      answers,
      {ignoreDuplicates: true}
    ),
    bulkUpsert: answers => AnsweredQuestion.bulkCreate(
      answers,
      {updateOnDuplicate: ['answer', 'points']}
    ),
    peerReview: reviews => sequelize.transaction(
      transaction => Promise.all(reviews.map(({id, ...rest}) => updatePeer(id, rest)))
    ),
    gradeQuestion: grades => sequelize.transaction(
      transaction => Promise.all(grades.map(({id, ...rest}) => gradeQuestion(id, rest)))
    ),
  };
};
