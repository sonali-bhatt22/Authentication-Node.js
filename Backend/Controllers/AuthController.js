const UserModel = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.status(404).json({
        message: "user already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const user = await UserModel.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    res.status(201).json({
      message: "Signup successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
      success: false,
    });
  }
};
const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(403).json({
          message: "email or password is wrong",
          success: false,
        });
      }
  
      const passwordMatched = await bcrypt.compare(password, user.password);
      if (!passwordMatched) {
        return res.status(403).json({
          message: "incorrect credential",
          success: false,
        });
      }
  
      const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
  
      return res.status(200).json({
        message: "Login successfully",
        success: true,
        jwtToken: token,
        email,
        name: user.name,
      });
  
    } catch (error) {
      console.error(error); // helpful for debugging
      return res.status(500).json({
        message: "internal server error",
        success: false,
      });
    }
  };
  
module.exports = {
  signup,
  login,
};
