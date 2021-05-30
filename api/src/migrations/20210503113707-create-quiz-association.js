'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.createTable(
        'quiz_associations',
        {
          id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
          },
          userId: {
            type: Sequelize.UUID,
            field: 'user_id',
            references: {model: 'users', key: 'id'},
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          quizId: {
            type: Sequelize.UUID,
            field: 'quiz_id',
            references: {model: 'quizzes', key: 'id'},
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          version: {type: Sequelize.INTEGER},
        },
        {transaction}
      );
      await queryInterface.addConstraint(
        'quiz_associations',
        {
          fields: ['user_id', 'quiz_id'],
          type: 'unique',
          name: 'unique_associations_constraints',
          transaction,
        },
      );
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('quiz_associations');
  },
};
