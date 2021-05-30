'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'question_associations', {
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
        quizAssociationId: {
          type: Sequelize.UUID,
          field: 'quiz_association_id',
          references: {model: 'quiz_associations', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        points: {type: Sequelize.INTEGER},
      });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('question_associations');
  },
};
