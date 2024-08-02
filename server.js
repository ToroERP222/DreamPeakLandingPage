// server.js
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const Grid = require('gridfs-stream');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors'); // Add this line
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const mongoURI = process.env.MONGODB_URI;
const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = conn.model('User', userSchema);

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body)
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();
  res.status(201).send('User registered');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body)
  const user = await User.findOne({ username });
  if (user && await bcrypt.compare(password, user.password) ) {
    console.log(pass)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).send('Invalid token');
      }
      req.userId = decoded.id;
      next();
    });
  } else {
    res.status(403).send('No token provided');
  }
};

const hikingRouteSchema = new mongoose.Schema({
  name: String,
  fecha: Date,
  grado: String,
  images: [{ type: String }], // Store image filenames
});

const HikingRoute = conn.model('HikingRoute', hikingRouteSchema);

// Register route for creating a new hiking route
app.post('/hiking-routes', verifyToken, async (req, res) => {
  const { name, fecha, grado, images } = req.body;
  const newRoute = new HikingRoute({ name, fecha, grado, images });
  await newRoute.save();
  res.status(201).send('Hiking route created');
});

// Route for retrieving all hiking routes
app.get('/hiking-routes', verifyToken, async (req, res) => {
  const routes = await HikingRoute.find();
  res.json(routes);
});

// Modify the image upload route to handle hiking route images
app.post('/upload', verifyToken, upload.array('images', 5), async (req, res) => {
  const files = req.files;
  const fileNames = files.map((file) => file.originalname);
  res.json({ files: fileNames });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
