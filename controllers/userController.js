const { create } = require("domain");
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

const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({ username, email, password });
    res.status(201).json({
      status: "Success",
      message: "User created successfully",
      data: { user },
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Error creating user",
      error,
    });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        status: "Failed",
        message: "User not found",
      });
    }
    res.status(200).json({
      status: "Success",
      data: { user },
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Error fetching user",
      error,
    });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        status: "Failed",
        message: "User not found",
      });
    }

    await user.update({ username, email, password });
    res.status(200).json({
      status: "Success",
      message: "User updated successfully",
      data: { user },
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Error updating user",
      error,
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        status: "Failed",
        message: "User not found",
      });
    }

    await user.destroy();
    res.status(200).json({
      status: "Success",
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Error deleting user",
      error,
    });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
