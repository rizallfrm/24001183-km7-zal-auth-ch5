const { User } = require("../models");

const getAllUsers = async (req, res) => {
  try {
    console.log("masuk?");
    const users = await User.findAll();
    res.status(200).json({
      status: "Success",
      data: { users },
    });
  } catch (error) {
    res.status(404).json({
      status: "Failed",
    });
  }
};

module.exports = { getAllUsers };
