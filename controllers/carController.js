const { Car } = require("../models");
const { User } = require("../models");

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

module.exports = {getAllCars};
