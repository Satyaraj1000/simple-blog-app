import User from "../models/User.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user with the provided email already exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash the password
    const saltRounds = 10; // Number of salt rounds
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    user = await User.create({
      name,
      email,
      password: hashedPassword, // Store hashed password in the database
    });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.status(201).json({
      message: "User registered",
      user,
      token,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        message: "Invalid email",
      });

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword)
      return res.status(400).json({
        message: "Invalid password",
      });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.status(200).json({
      message: `Welcome back ${user.name}`,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.json({ user });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export { registerUser, login, myProfile };
