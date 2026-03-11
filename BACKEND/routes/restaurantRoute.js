const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const {checkAuth,restrictRoleTo} = require('../middleware/auth');
const uploadMiddleware = require('../utils/multerConfig');

router.post('/createRestaurant',uploadMiddleware,checkAuth,restrictRoleTo(['HOTEL-MANAGER']),restaurantController.createRestaurant);

// router.patch('/edit/:resId',checkAuth,restrictRoleTo(['HOTEL-MANAGER']),restaurantController.editRestaurantDetails);

// router.delete('/:resId',checkAuth,restrictRoleTo(['HOTEL-MANAGER']),restaurantController.deleteRestaurant);
router.get('/',restaurantController.getAllRestaurant);

router.get('/:userId',checkAuth,restrictRoleTo(['HOTEL-MANAGER']),restaurantController.getRestaurantById);

module.exports = router;