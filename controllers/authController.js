const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { where } = require("sequelize");

const register = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({ username, password: hashedPassword });
    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: JWT_LIMIT,
    });
    res.json({ message: "Login successful", token });
  } catch (error) {
    console.log("Error during login:", error);
    res.status(500).json({ message: "Error logging in", error });
  }
};

// only for superadmin
const superadminLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (
      !user ||
      !(await bcrypt.compare(password, user.password)) ||
      user.role !== "superadmin"
    ) {
      return res
        .status(401)
        .json({ message: "Invalid credentials or not a superadmin" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_LIMIT }
    );
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

// Endpoint To Add Admin (Superadmin Only)
const addAdmin = async (req, res) => {
  const { username, password, email } = req.body;
  const { role } = req.user;

  if (role !== "superadmin") {
    return res
      .status(403)
      .json({ message: "Forbidden: Only superadmin can add admin" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newAdmin = await User.create({
      username,
      password: hashedPassword,
      role: "admin",
      email,
    });
    res.status(201).json({
      status: "Success",
      isSuccess: true,
      message: "Admin added successfully",
      data: { newAdmin },
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      isSuccess: false,
      message: "Error adding admin",
      error,
      data: null,
    });
  }
};

// for Member Registration
const registerMember = async (req, res) => {
  const { username, password, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({
      username,
      password: hashedPassword,
      role: "member",
      email,
    });
    res.status(201).json({
      status: "Success",
      isSuccess: true,
      message: "Member registered successfully",
      data: { user },
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      isSuccess: false,
      message: "Error registering user",
      error,
      data: null,
    });
  }
};

module.exports = { login, register, superadminLogin, addAdmin, registerMember };
