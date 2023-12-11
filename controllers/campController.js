const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const Camp = require('../models/campModel');

exports.createCamp = catchAsync(async (req, res) => {
  const {
    _id,
    name,
    duration,
    maxGroupSize,
    campType,
    price,
    priceDiscount,
    summary,
    description,
    imageCover,
    images,
    startDates,
  } = req.body;

  const camp = await Camp.findById(_id);
  if (camp) {
    camp.name = name;
    camp.duration = duration;
    camp.maxGroupSize = maxGroupSize;
    camp.campType = campType;
    camp.price = price;
    camp.priceDiscount = priceDiscount;
    camp.summary = summary;
    camp.description = description;
    camp.imageCover = imageCover;
    camp.images = images;
    camp.startDates = startDates;

    const updatedCamp = await camp.save();
    return res.status(200).json({
      status: 'success',
      message: 'Camp updated successfully',
      updatedCamp
    })
  } else {
    const createdCamp = await Camp.create({
      ...req.body,
      createBy: req.user._id
    });

    return res.status(201).json({
      status: 'success',
      message: 'Camp created successfully',
      createdCamp
    })
  }
})

exports.getAllCamps = catchAsync(async (req, res) => {

})

exports.getCamp = catchAsync(async (req, res) => {

})

exports.deleteCamp = catchAsync(async (req, res) => {

})