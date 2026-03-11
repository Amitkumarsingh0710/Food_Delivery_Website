const Restaurant = require('../models/restaurantModel');
const {User} = require('../models/userModel');

exports.createRestaurant = async(req,res)=>{
     const { 
  restaurantName, 
  landmark, 
  district, 
  state, 
  contactNumber, 
  openTime, 
  closeTime, 
  isOperating 
} = req.body;
     const user = await User.findById(req.user.id);
     console.log(user);
      let imagePath = null;
    console.log(req.file.path);
    if (req.file) {
      imagePath = req.file.path.replace(/\\/g, "/");
    }
     const newRes = await Restaurant.create({
  restaurantName,
  contactNumber,
  isOperating: isOperating === 'true', // Convert string "true" to Boolean
  address: {
    landmark,
    district,
    state
  },
  openingHours: {
    open: openTime,
    close: closeTime
  },
  managedBy: user._id, // Assuming 'user' is available from your auth middleware
  restaurantImage: imagePath // The file path/URL from your multer/storage upload
});
     return res.status(201).json({message:"Restaurant created Successfullly...",data:newRes});
}

exports.getAllRestaurant = async(req,res)=>{
   let restaurantList = await Restaurant.find({});
   return res.status(200).json({message:"Menu List...",data:restaurantList});
}

exports.getRestaurantById = async(req,res)=>{
     console.log("User Id...");
     console.log(req.params.userId);
     let restaurant = await Restaurant.find({managedBy:req.params.userId}).populate('menus');
     if(!restaurant || restaurant.length === 0){
        return res.status(404).json({message:"Restaurant with given restaurant-Id does not exists"});
     }
     
     return res.status(200).json({message:"Restaurant List...",data:restaurant});
}