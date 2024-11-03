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
  const { brand, model, available = true } = req.body;
  const { role, id } = req.user;

  if (role !== "admin" && role !== "superadmin") {
    return res.status(403).json({
      status: "Failed",
      isSuccess: false,
      message: "Forbidden: Only admin and superadmin can add cars data!",
    });
  }

  try {
    const cars = await Car.create({
      brand,
      model,
      available,
      createdBy: id,
      updatedBy: id,
    });

    res.status(201).json({
      status: "Success",
      message: "Car created successfully",
      cars,
      isSuccess: true,
      data: { cars },
    });
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({
      status: "Failed",
      message: "Error creating car",
      error,
      isSuccess: false,
      data: null,
    });
  }
};

const { validate: uuidValidate } = require("uuid");

const updateCar = async (req, res) => {
  const { id } = req.params;

  // Validate format ID
  if (!uuidValidate(id)) {
    return res.status(400).json({
      status: "Failed",
      isSuccess: false,
      message: "Invalid car ID format",
    });
  }

  const { brand, model, available } = req.body;
  const { role, id: userId } = req.user;

  if (role !== "admin" && role !== "superadmin") {
    return res.status(403).json({
      status: "Failed",
      isSuccess: false,
      message: "Forbidden: Only admin and superadmin can update cars",
    });
  }

  try {
    const car = await Car.findByPk(id);
    if (!car) {
      return res.status(404).json({
        status: "Failed",
        isSuccess: false,
        message: "Car not found",
      });
    }

    await car.update({
      brand,
      model,
      available: available !== undefined ? available : car.available,
      updatedBy: userId,
    });

    res.json({
      status: "Success",
      message: "Car updated successfully",
      car,
      isSuccess: true,
      data: { car },
    });
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({
      status: "Failed",
      isSuccess: false,
      message: "Error updating car",
      error,
    });
  }
};

const deleteCar = async (req, res) => {
  const { id } = req.params;
  const { role, id: userId } = req.user;

  if (role !== "admin" && role !== "superadmin") {
    return res.status(403).json({
      status: "Failed",
      isSuccess: false,
      message: "Forbidden: Only admin and superadmin can delete cars",
    });
  }

  try {
    const car = await Car.findByPk(id);
    if (!car) {
      return res.status(404).json({
        status: "Failed",
        isSuccess: false,
        message: "Car not found",
      });
    }

    await car.destroy();

    res.json({
      status: "Success",
      isSuccess: true,
      message: "Car deleted successfully",
      data: { carId: id, deletedBy: userId },
    });
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({
      status: "Failed",
      isSuccess: false,
      message: "Error deleting car",
      error,
    });
  }
};

module.exports = { getAllCars, createCars, updateCar, deleteCar };
