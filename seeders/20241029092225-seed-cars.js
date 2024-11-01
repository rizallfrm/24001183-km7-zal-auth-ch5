'use strict';

const faker = require("faker");
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const cars = [];
    const userIds = [1, 2, 3]; // Use integer IDs to match the User model's ID type

    for (let i = 0; i < 10; i++) {
      cars.push({
        brand: faker.vehicle.manufacturer(),
        model: faker.vehicle.model(),
        available: faker.datatype.boolean(),
        createdBy: userIds[Math.floor(Math.random() * userIds.length)],
        updatedBy: userIds[Math.floor(Math.random() * userIds.length)],
        deletedBy: userIds[Math.floor(Math.random() * userIds.length)],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("Cars", cars, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Cars", null, {});
  }
};
