"use strict";

const faker = require("faker");
const bcrypt = require("bcrypt"); // Import bcrypt

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [];

    // Menambahkan satu superadmin
    users.push({
      username: "superadmin", // Anda bisa mengganti ini dengan nama yang diinginkan
      email: faker.internet.email(),
      password: await bcrypt.hash("superadminpassword", 10), // Ganti password dengan yang aman
      role: "superadmin",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Menambahkan 19 pengguna lainnya
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
