

const express = require("express");
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./config/config');
const path = require('path');

// const cors = require('cors');
require("colors");
const morgan = require("morgan");




dotenv.config()


connectDB()

const app = express()

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});


app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api/vole', require('./routes/vole'));

app.use('/api/users', require('./routes/users'));
app.use('/api/vole', require('./routes/vole'));
app.use('/api/reservation', require('./routes/reservation'));



app.use("/uploads", express.static("uploads"))

app.get('/', (req, res) => {
  res.send("<h1>Bonjour mose je focntinne bien </h1>");
});

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`Server running  on ${process.env.NODE_ENV} mode on ${process.env.PORT} `.bgGreen.white);
});
