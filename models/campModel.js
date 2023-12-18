const mongoose = require('mongoose');

const campSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A camp must have a name.'],
    unique: true,
    trim: true,
    minlength: [3, 'A camp must have more than or equal to 3 characters.'],
    maxlength: [15, 'A camp must have less than or equal to 15 characters.']
  },
  duration: {
    type: Number,
    required: [true, 'A camp must have a duration.'],
    default: 1
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A camp must have a group size.']
  },
  campType: {
    type: 'String',
    enum: ['family', 'couples', 'bachelors', 'girls']
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0'],
    set: val => Math.round(val * 10) / 10
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: [true, 'A camp must have a price.']
  },
  priceDiscount: {
    type: Number,
    validate: {
      validator: function (val) {
        return val < this.price;
      },
      message: 'Discount price should be below the real price.'
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A camp must have a summary.']
    },
    description: {
      type: String,
      trim: true
    },
    imageCover: {
      type: String,
      required: [true, 'A camp must have a cover image.']
    },
    images: [String],
    startDates: Date,
    locations: [{
      type: {
        type: String,
        default: 'Point',
        enum: ['Point']
      },
      coordinates: [Number],
      address: String,
      description: String,
      day: Number
    }],
  },
  isActive: {
    type: Boolean,
    default: true
  }
},
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  })

const Camp = mongoose.model('Camp', campSchema);
module.exports = Camp;