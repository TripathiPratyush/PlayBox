const express = require('express');
const mysql = require('mysql2'); // Use the mysql2 package
const bodyParser = require('body-parser');
const cors = require('cors'); // Optional: use if you have cross-origin requests

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Database configuration
const dbConfig = {
  host: 'localhost',
  port: 3306,  // Optional if using the default port
  user: 'root',
  password: 'MRIKAL1409',
  database: 'playbox'
};

// Function to connect to the database
const connectDB = async () => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Connected to the database');
    return connection;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1); // Exit process if unable to connect
  }
};

// API endpoint to store login details in the database
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // Log received email and password for debugging (avoid logging passwords in production)
  console.log('Received email:', email); 
  console.log('Received password:', password); 

  // Validate input
  if (!email || !password) {
    return res.status(400).send({ message: 'Email and password are required' });
  }

  // Establish a connection to the database
  const connection = await connectDB();

  try {
    // Insert user details into the 'user' table
    console.log('Email:', email);
console.log('Password:', password);
const sql = 'INSERT INTO user (email, password) VALUES (?, ?)';
try {
  const [result] = await connection.execute(sql, [email, password]); // Use execute for prepared statements
  console.log('User   data stored successfully:', result);
} catch (err) {
  console.error('Error inserting data into database:', err.message);
  res.status(500).send({ message: 'Error storing data' });
}
  } finally {
    await connection.end(); // Ensure the connection is closed
  }
});

// Start the server
const port = 5501; // Change to your desired port
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
