const express = require('express');
const router = express.Router();
const userController = require("../controllers/userControllers");
const {checkAuth,restrictRoleTo} = require('../middleware/auth');

router.get("/",checkAuth,restrictRoleTo(['ADMIN']),userController.getAllUsers)

router.get("/profile/:id",checkAuth, userController.getUserById)

router.patch("/edit/:id",checkAuth, userController.editSpecificDetails);


// router.put("/:id",checkAuth, userController.editUserDetails)

// router.delete("/:id",checkAuth,restrictRoleTo(['ADMIN']),userController.deleteUser);


module.exports = router;