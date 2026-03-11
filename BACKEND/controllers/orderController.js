const Order = require('../models/orderModel');
const Payment = require('../models/paymentModel');
const { Item } = require('../models/itemModel');
const { mongoose } = require('mongoose');

exports.placeOrder = async (req, res) => {
  try {
    const { items, paymentMethod, totalAmount } = req.body;

    console.log("Items ......");
    console.log(items);

    let itemIds = items.map((ele) => ele._id);
    let quantity = items.map((ele) => ele.quantity);
    console.log("Item IDs ......");
    console.log(itemIds);
    console.log("Quantity ......");
    console.log(quantity);

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items provided in the order" });
    }

    if (itemIds.map((id) => mongoose.isValidObjectId(id)).includes(false)) {
      return res.status(400).json({ message: "Invalid item IDs provided" });
    }

    let selectedItem = await Item.find({ _id: { $in: itemIds } });
    console.log("Selected Items ......");
    console.log(selectedItem);

    const formattedItems = items.map(ele => ({
      itemId: ele._id,   // map _id to itemId
      quantity: ele.quantity
    }));

    console.log("Formatted Items ......");
    console.log(formattedItems);
   

    console.log(totalAmount);

    const newOrder = new Order({
      userId: req.params.userId,
      items: formattedItems,
      totalAmount: totalAmount,
      status: 'Pending',// Default as per requirement
      paymentMethod: paymentMethod
    });

    await newOrder.save();

    res.status(201).json({ message: "Order placed", order: newOrder });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getOrderByUserId = async (req, res) => {
  try {
    const order = await Order.find({
      userId: req.params.userId
    }).populate('items.itemId').populate('agentAssigned');

    if (!order || order.length === 0) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ message : "Order Feteched" , data : order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getAllOrders = async (req, res) => {
  try {
    // Pagination & Sorting logic
    const status = req.query.status || 'All';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const sortBy = req.query.sortBy || 'createdAt';
    const order = req.query.order === 'asc' ? 1 : -1;

    if (status == 'All') {
      const orders = await Order.find()
        .sort({ [sortBy]: order })
        .skip(skip)
        .limit(limit)
        .populate('items.itemId')
        .populate('agentAssigned'); // Reference populate

      console.log("Orders ......");
      console.log(orders);
      const total = await Order.countDocuments();
      res.json({
        success: true,
        count: orders.length,
        pagination: {
          total,
          page,
          pages: Math.ceil(total / limit)
        },
        data: orders
      });
    } 
    else {
      const orders = await Order.find({ status: status })
        .sort({ [sortBy]: order })
        .skip(skip)
        .limit(limit)
        .populate('agentAssigned')
        .populate('items.itemId')
      // Reference populate

      console.log("Orders ......");
      console.log(orders);
      const total = await Order.countDocuments();
      res.json({
        success: true,
        count: orders.length,
        pagination: {
          total,
          page,
          pages: Math.ceil(total / limit)
        },
        data: orders
      });
    }

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.initiatePayment = async (req, res) => {
  try {
    // 1. Find and update the order
    const order = await Order.findById(req.params.OrderID);
    console.log("Order before update ......");
    console.log(order);
    if (!order) return res.status(404).json({ message: "Order not found" });

    const updatedOrder = await Order.findOneAndUpdate(
      { _id: order._id },
      {
        paymentStatus: req.body.status || 'Paid', // Default to 'Paid' if not provided
      },
      { new: true }
    );

    console.log(updatedOrder);

    // 2. Create the Payment record
    const paymentReceipt = new Payment({
      // FIXED: Use 'orderObjectId' to match your model
      orderID: order._id,
      userId: order.userId,
      totalAmount: order.totalAmount,
      transactionId: 'TXN-' + Date.now(),
      // FIXED: Added 'method' because it is required in your schema
      paymentMethod: order.paymentMethod || 'Card',
      paymentStatus: 'completed'
    });

    await paymentReceipt.save();

    res.status(200).json({
      message: "Payment successful",
      paymentReceipt,
      order
    });
  } catch (error) {
    // This will now catch validation errors specifically
    res.status(500).json({ message: error.message });
  }
};


exports.changeDeliveryStatus = async (req, res) => {
  const { status, eta } = req.body;

  let order = await Order.findById(req.params.orderId);
  if (!order) return res.status(404).json({ message: "Order not found" });

  if (status && !eta) {
    const updatedOrder = await Order.findOneAndUpdate(
      { _id: order._id },
      { status },
      { new: true, runValidators: true }
    );
    return res.status(200).json({
      message: "Order status changed successfully...",
      data: updatedOrder
    });
  } else {


    console.log(eta);

    const [hours, minutes] = eta.split("T")[1].split(":").map(Number);
    console.log(typeof hours + " :" + typeof minutes);
    console.log(hours + " :" + minutes);
    const etaDate = new Date();
    etaDate.setHours(hours, minutes, 0, 0);
    console.log("Eta Date or Time");
    console.log(etaDate);
    const updatedOrder = await Order.findOneAndUpdate(
      { _id: order._id },
      { status, etaTime: etaDate },
      { new: true, runValidators: true }
    );

    // //2026-03-07T12:51
    // //2026-03-07T07:21:00.000Z

    const delay = etaDate.getTime() - Date.now();
    console.log(delay);
    if (delay > 0) {
      setTimeout(async () => {
        await Order.findOneAndUpdate(
          { _id: order._id },
          { status: "Delivered" },
          { new: true }
        );
        console.log(`Order ${order._id} marked as Delivered automatically`);
      }, delay);
    }

    return res.status(200).json({
      message: "Order status changed successfully...",
      data: updatedOrder
    });

  }
}

