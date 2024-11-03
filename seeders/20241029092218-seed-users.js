"use strict";

const faker = require("faker");
const bcrypt = require('bcrypt')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [];

    // add superadmin
    users.push({
      username: "superadmin", 
      email: faker.internet.email(),
      password: await bcrypt.hash("superadminpassword", 10), 
      role: "superadmin",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

 
    for (let i = 0; i < 19; i++) {
      users.push({
        username: faker.name.findName(),
        email: faker.internet.email(),
        password: await bcrypt.hash(faker.internet.password(), 10), // Hash password
        role: faker.random.arrayElement(["admin", "member"]),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    
    await queryInterface.bulkInsert("Users", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
