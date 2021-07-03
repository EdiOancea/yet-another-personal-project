export default ({QuizAssociationRepository, AnsweredQuestionRepository}) => ({
  get: QuizAssociationRepository.get,
  getList: QuizAssociationRepository.getList,
  grade: (quizAssociationId, {finalGrade, comment, grades, comments}) => Promise.all([
    QuizAssociationRepository.updateFinalGrade(quizAssociationId, {finalGrade, comment}),
    AnsweredQuestionRepository.bulkUpdate(
      Object
        .keys(comments)
        .map(id => ({id, points: grades[id], comment: comments[id]})),
      ['points', 'comment']
    ),
  ]),
});
