const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
})

const app = require('./app');

dotenv.config({ path: './config.env' });

mongoose.connect(process.env.DATABASE)
  .then(() => {
    console.log('Database connected successfully!!!');
  })

const port = process.env.PORT || 2000;
const server = app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
})

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  })
})

process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully.');
  server.close(() => {
    console.log('Process terminated.')
  })
})