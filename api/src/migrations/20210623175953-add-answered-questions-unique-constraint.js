'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint(
      'answered_questions',
      {
        fields: ['question_id', 'quiz_association_id'],
        type: 'unique',
        name: 'unique_answered_questions_constraints',
      },
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      'answered_questions',
      'unique_answered_questions_constraints'
    );
  },
};
