'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'users',
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        email: {type: Sequelize.STRING, unique: true},
        firstName: {type: Sequelize.STRING, field: 'first_name'},
        lastName: {type: Sequelize.STRING, field: 'last_name'},
        password: {type: Sequelize.STRING},
        type: {type: Sequelize.STRING},
        active: {type: Sequelize.BOOLEAN},
      }
    );
  },
  down: async queryInterface => {
    await queryInterface.dropTable('users');
  },
};
