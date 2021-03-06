'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'questions',
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        quizId: {
          type: Sequelize.UUID,
          field: 'quiz_id',
          references: {model: 'quizzes', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        statement: Sequelize.STRING,
        type: Sequelize.STRING,
        availablePoints: {type: Sequelize.INTEGER, field: 'available_points'},
        version: Sequelize.STRING,
      },
    );
  },
  down: async queryInterface => {
    await queryInterface.dropTable('questions');
  },
};
