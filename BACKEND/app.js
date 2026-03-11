require('dotenv').config();
const express = require('express');
const app = express();
// Http Server 
// const http = require('http'); // Needed for socket.io
// const { Server } = require('socket.io');

// const server = http.createServer(app); // Wrap express in HTTP server
// // Attach Socket.IO
// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:4200', // Angular frontend
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
//     credentials: true
//   }
// });



const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoute');
const menuRouter = require('./routes/menuRoute');
const restaurantRouter = require('./routes/restaurantRoute');
const orderRouter = require('./routes/orderRoutes');
const adminRouter = require('./routes/adminRoute');

const errorHandler = require('./middleware/errorhandler');

const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const connectDb = require('./db/dbConnection');

const path = require('path');
const cors = require('cors');

// Configure CORS: allow frontend origin from env or default to Angular dev server
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:4200';
app.use(cors({
  origin: FRONTEND_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// MiddleWares (To Parse the data send from the Frontend) =======>  
app.use(express.json());

// Serve static files from uploads folder
app.use('/uploads', express.static('uploads'));

// DB CONNECTION ==========>
connectDb();


app.use(cookieParser());

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/menu', menuRouter);
app.use('/restaurant',restaurantRouter);
app.use('/order',orderRouter);
app.use('/admin',adminRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`)
});


