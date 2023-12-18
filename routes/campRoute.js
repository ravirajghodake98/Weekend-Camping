const express = require('express');
const campController = require('../controllers/campController');

const router = express.Router();

router
  .route('/')
  .get(campController.getAllCamps)
  .post(campController.createCamp)

router
  .route('/:campId')
  .get(campController.getCamp)
  .patch(campController.deleteCamp)

module.exports = router;