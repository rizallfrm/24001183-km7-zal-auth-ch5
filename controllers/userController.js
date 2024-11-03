const { create } = require("domain");
const { User } = require("../models");
const { error } = require("console");

const getAllUsers = async (req, res) => {
  try {
    console.log("masuk?");
    const users = await User.findAll();
    res.status(200).json({
      status: "Success",
      isSuccess: true,
      message: "Success get all users",
      data: { users },
    });
  } catch (error) {
    res.status(404).json({
      status: "Failed",
      isSuccess: false,
      message: "Failed get users data",
      error,
    });
  }
};

const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({ username, email, password });
    res.status(201).json({
      status: "Success",
      isSuccess: true,
      message: "User created successfully",
      data: { user },
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      isSuccess: false,
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
        isSuccess: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      status: "Success",
      isSuccess: true,
      message: "Success get users by id",
      data: { user },
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      isSuccess: false,
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
        isSuccess: false,
        message: "User not found",
      });
    }

    await user.update({ username, email, password });
    res.status(200).json({
      status: "Success",
      isSuccess: true,
      message: "User updated successfully",
      data: { user },
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      isSuccess: false,
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
        isSuccess: false,
        message: "User not found",
      });
    }

    await user.destroy();
    res.status(200).json({
      status: "Success",
      isSuccess: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      isSuccess: false,
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
