const { nextTick } = require('node:process');
const { User} = require('../models/userModel');
const { Addresses } = require('../models/addressModel');
const ApiError = require('../utils/apiError');

exports.getAllUsers = async (req, res) => {
    let UserList = await User.find();
    res.json({ "message": "Welcome to my platform", "data": UserList });
}

exports.getUserById = async (req, res) => {
    try {
        if (req.user.id !== req.params.id) {
            return res.status(403).json({ message: "Unauthorized to Access" })
        }

        let user = await User.find({ _id: req.params.id }).populate('address');
        if (user.length > 0) {
            return res.status(200).json({ "msg": "User found...", "data": user })
        }
        return res.status(404).json({ "msg": "User not Found" })
    }
    catch (err) {
        return res.status(500).json({ message: "Fail", data: err.message });
    }

}


exports.editSpecificDetails = async (req, res,next) => {
    console.log("Inside the editSpecificDetails controller...");    
    console.log("Request Body:", req.body);
    console.log("User ID from Request Params:", req.params.id);
    console.log("Authenticated User ID:", req.user.id);
    try{
        let { email, address, status } = req.body;
    let user = await User.findById(req.params.id);
    console.log("User fetched from DB:", user);
    if (req.user.id !== req.params.id) {
        return res.status(403).json({ message: "Unauthorized to Access" })
    }
   if (user.address) {
    console.log("User has an address. Attempting to delete the existing address...");   
    console.log("Existing Address ID:", user.address._id);
     let deletedAddress = await Addresses.findByIdAndDelete(user.address._id,{new:true});
     console.log("Deleted Address:", deletedAddress);
    };


    if (!email && !address && status) {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: { status: status } }, { new: true, runValidators: true });
        return res.status(200).json({ message: "User status updated Successfully...", updatedData: updatedUser });
    }
    else {
        let updatedAddress = await Addresses.create(address);
        if (!email) return res.status(400).json("Email is missing");
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: { username: req.body.username, phoneNumber:req.body.phoneNumber, email: email,address: updatedAddress._id } }, { new: true, runValidators: true });
        console.log("Updated User:", updatedUser);
        return res.status(200).json({ message: "User email-id and address updated Successfully...", updatedData: updatedUser });
    }

    }
    catch(err){
        return  new ApiError("Error Ocurred during User Profile Update",null,500,[err.message],err.stack);
        next(err);
    }
}



