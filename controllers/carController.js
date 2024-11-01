const { Car } = require("../models");

const getAllCars = async (req, res) => {
  try {
    const cars = await Car.findAll();
    res.status(200).json({
      status: "Success",
      message: "Success get cars data",
      isSuccess: true,
      data: { cars },
    });
  } catch (error) {
    res.status(404).json({
      status: "Failed",
      message: "Failed get cars data",
      isSuccess: false,
      data: null,
    });
  }
};

const createCars = async (req, res) => {
  try {
    console.log('masuk')
    const { brand,model,available=true } = req.body;
    const cars = await Car.create({
      brand,
      model,
      available,
      createdBy: req.user.id,
      updateBy: req.user.id,
    });
    res.status(201).json({
      status: "Success",
      message: "Car created successfully",
      cars,
      isSuccess: true,
      data: { cars },
    });
  } catch (error) {
    console.error("Error details:", error); // Add this line for detailed logging
    console.log("In createCars, req.user:", req.user); // Check req.user here

    res.status(500).json({
      status: "Failed",
      message: "Error creating car",
      error,
      isSuccess: false,
      data: null,
    });
  }
};

module.exports = { getAllCars, createCars };
