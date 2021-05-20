'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_quizzes', {
      userId: {
        type: Sequelize.UUID,
        field: 'user_id',
        primaryKey: true,
        references: {model: 'users', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      quizId: {
        type: Sequelize.UUID,
        field: 'quiz_id',
        primaryKey: true,
        references: {model: 'quizzes', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('user_quizzes');
  }
};
