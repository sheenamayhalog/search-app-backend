'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   return queryInterface.bulkInsert('Users', [{
    id: "5592d311d7c6770300911b65",
    firstName: "John",
    lastName: "Smith",
    createdAt: new Date(),
    updatedAt: new Date()
   }, {
    id: "5592d311d7c6770300911b66",
    firstName: "John",
    lastName: "Doe",
    createdAt: new Date(),
    updatedAt: new Date()
   }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('User', null, {})
  }
};
