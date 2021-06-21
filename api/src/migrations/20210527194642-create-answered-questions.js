'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'answered_questions', {
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
        answer: Sequelize.STRING,
        points: Sequelize.INTEGER,
        comment: Sequelize.STRING,
        peerPoints: {type: Sequelize.INTEGER, field: 'peer_points'},
        peerComment: {type: Sequelize.STRING, field: 'peer_comment'},
      });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('answered_questions');
  },
};
