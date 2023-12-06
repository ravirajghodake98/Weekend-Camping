const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = require('./app');

dotenv.config({ path: './config.env' });

mongoose.connect(process.env.DATABASE)
  .then(() => {
    console.log('Database connected successfully!!!');
  })

const port = process.env.PORT || 2000;
app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
})