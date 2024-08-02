const axios = require('axios');

// Function to add a user to the registration route
const registerUser = async (username, password) => {
  try {
    const response = await axios.post('http://localhost:5000/register', {
      username,
      password,
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error registering user:', error.response.data);
  }
};

// Parse command-line arguments
const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Usage: node feedUsers.js <username> <password>');
  process.exit(1);
}

// Extract username and password from command-line arguments
const username = args[0];
const password = args[1];

// Register the user
registerUser(username, password);
