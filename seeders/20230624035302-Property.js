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
    return queryInterface.bulkInsert('Properties', [{
      id: "5592d311d7c6770300911b65",
      user_id: "5592d311d7c6770300911b65",
      street: "505 South Market St",
      city: "San Jose",
      state: "CA",
      zip: "95008",
      rent: 95008,
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
    return queryInterface.bulkDelete('Property', null, {})
  }
};
