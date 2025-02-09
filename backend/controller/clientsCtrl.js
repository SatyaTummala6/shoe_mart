const Clients = require('../models/clientsModel');
const Categories = require('../models/categoriesModel');
const { generateToken } = require('../config/jwtToken');
const sendEmail = require('./emailCtrl');
const crypto = require("crypto");

// Register a new user
registerClient = async (req, res) => {
  try {
    const { email, mobile } = req.body;

    const existingUser = await Clients.findOne({ $or: [{ email }, { mobile }] });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = await Clients.create(req.body);
    res.status(201).json({ message: 'User registered successfully', data: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

const getCategories = async (req, res) => {
  try {
    // Fetch all categories

    const categories = await Categories.find({ status: true });
    res.status(200).json(categories); // Send the categories as JSON response
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const loginClient = async (req, res) => {
  try {

    const { mobile, password } = req.body;

    // Find teuser by mobile and populate category_id
    const existingUser = await Clients.findOne(
      { mobile, status: true }
    ).populate("category_id");  // Populating the `category_id` field, not `categories`


    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify the password (assuming passwords are hashed)
    // const isPasswordValid = await bcrypt.compare(password, existingUser.password); // bcrypt for password comparison

    // if (!isPasswordValid) {
    //   return res.status(401).json({ message: 'Invalid credentials' });
    // }

    if (existingUser.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a token (e.g., JWT)
    const token = generateToken(existingUser._id, existingUser.category_id.name);

    res.status(200).json({
      message: 'Login successful',
      data: { id: existingUser._id, email: existingUser.email, token },
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

const getUserData = (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(404).send("User not found");
  }
  res.json(user);
};

const getClients = async (req, res) => {
  try {

    const clients = await Clients.find().select('-password').populate('category_id');
    res.status(200).json(clients); // Send the categories as JSON response
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}

const getEmployees = async (req, res) => {
  try {

    const clients = await Clients.find()
      .select('-password')
      .populate({
        path: 'category_id',
        match: { name: 'employee' }, // Correct syntax to match by category name
      });

    const filteredClients = clients.filter(client => client.category_id);
    res.status(200).json(filteredClients); // Send the categories as JSON response
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}

const forgotPasswordToken = async (req, res) => {
  const { email, role } = req.body;

  // Find user based on email and role
  const user = await Clients.findOne({ email: email })
    .select('-password')
    .populate({
      path: 'category_id',
      match: { name: role },
    });

  if (user.category_id === null) {
    return res.status(404).json({ error: "User not found" });
  }

  try {
    // Generate password reset token
    const token = await user.createPasswordResetToken();

    // Set host URL based on role
    let hosturl = '';
    if (role === 'retailer') {
      hosturl = 5173;
    } else if (role === 'employee') {
      hosturl = 5174;
    } else if (role === 'supplier') {
      hosturl = 5175;
    }

    // Save the user (if needed to store token)
    await user.save();

    // Create the reset URL
    const resetURL = `Hi, Please follow this link to reset your password. This link is valid for 10 mins. <a href="http://localhost:${hosturl}/${role}/reset-password/${token}">Click here</a>`;

    // Email data
    const data = {
      to: email,
      text: "Hey User",
      subject: "Forgot Password Link",
      html: resetURL
    };

    // Send email with the reset link
    await sendEmail(data);

    // Respond with the token
    res.json({ token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const resetPassword = async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash('sha256').update(token).digest("hex");
  const user = await Clients.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error("Token Expired, Please try again");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json(user);
}

const changePassword = async (req, res) => {
const user = req.user;
  const {password} = req.body;

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Validate password
  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }

    user.password = password;
    await user.save();
    res.json(user);
  
}

module.exports = { changePassword,registerClient, getCategories, loginClient, getUserData, getClients, getEmployees, forgotPasswordToken, resetPassword }
