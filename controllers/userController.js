const { User } = require("../models");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({
      status: "Success",
      data: {users}
    });
  } catch (error) {
    res.status(404).json({
      ststus: "Failed",
    });
  }
};


module.exports = {getAllUsers}