"use strict";

const { v4: uuidv4 } = require("uuid");
const faker = require("faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const cars = [];
    const userIds = [1, 2, 3];

    for (let i = 0; i < 10; i++) {
      cars.push({
        id: uuidv4(),  // Generate a UUID for the id field
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
  },
};
