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

const updateCar = async (req, res) => {
  const { id } = req.params;
  const { name, brand } = req.body;
  const { role } = req.user;

  if (role !== 'admin' && role !== 'superadmin') {
    return res.status(403).json({ message: "Forbidden: Only admin and superadmin can update cars" });
  }

  try {
    const car = await Car.findByPk(id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    await car.update({ name, brand });
    res.json({ message: "Car updated successfully", car });
  } catch (error) {
    res.status(500).json({ message: "Error updating car", error });
  }
};

const deleteCar = async (req, res) => {
  const { id } = req.params;
  const { role } = req.user;

  if (role !== 'admin' && role !== 'superadmin') {
    return res.status(403).json({ message: "Forbidden: Only admin and superadmin can delete cars" });
  }

  try {
    const car = await Car.findByPk(id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    await car.destroy();
    res.json({ message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting car", error });
  }
};


module.exports = { getAllCars, createCars, updateCar, deleteCar };
