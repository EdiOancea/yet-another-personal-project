'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'given_answers', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        questionId: {
          type: Sequelize.UUID,
          field: 'question_id',
          references: {model: 'questions', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        answerId: {
          type: Sequelize.UUID,
          field: 'answer_id',
          references: {model: 'answers', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        quizAssociationId: {
          type: Sequelize.UUID,
          field: 'quiz_association_id',
          references: {model: 'quiz_associations', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        statement: {type: Sequelize.STRING},
        points: {type: Sequelize.INTEGER},
      });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('given_answers');
  },
};
