'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'answers',
      {
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
        statement: {type: Sequelize.STRING},
        isCorrect: {
          type: Sequelize.BOOLEAN,
          field: 'is_correct',
        },
      }
    );
  },
  down: async queryInterface => {
    await queryInterface.dropTable('answers');
  },
};
