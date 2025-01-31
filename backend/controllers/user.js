import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const optStore = {};

export const register = async (req, res, next) => {
  const { name, email, password, address, contact } = req.body;

  const user = await User.findOne({ email });
  if (user) return res.status(400).send({ message: "User already exist" });

  const saltedPassword = bcrypt.hashSync(password, 10);

  try {
    console.log("Someone is trying to register");
    console.log(req.body);

    const newUser = new User({
      name,
      email,
      password: saltedPassword,
      address,
      contact,
    });

    const otp = generateOTP();
    optStore[email] = {
      otp,
      user: newUser,
      type: "register",
      validTill: Date.now() + 120000,
    };

    req.message = "Registration successfull";
    req.text =
      "Dear " +
      name +
      " Please use " +
      otp +
      " as your verification OTP for registration";
    req.subject = "OTP for registration";
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Internal error", error: error.message });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      const otp = generateOTP();
      optStore[email] = {
        otp,
        user,
        type: "login",
        validTill: Date.now() + 120000,
      };

      req.text =
        "Dear " +
        user.name +
        " Please use " +
        otp +
        " as your verification OTP for login";
      req.subject = "OTP for login";
      next();
    } else {
      return res.status(401).send({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Internal error", error: error.message });
  }
};

export const userProfile = async (req, res) => {
  try {
    var user = await User.findById(req.decodedUser.user).select("name email");

    return res.status(200).send({ message: "Fetched user", user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Internal error", error: error.message });
  }
};

const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
};

export const sendEmail = (req, res) => {
  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
      tls: { ciphers: "SSLv3" },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: req.body.email,
      subject: req.subject,
      text: req.text,
    };
    transport.sendMail(mailOptions, (error, data) => {
      if (error) {
        return res.status(500).send({ message: "Internal Error", error });
      } else {
        return res.status(200).send({ message: "OTP sent successfully" });
      }
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Internal error", error: error.message });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { otp, email } = req.body;

    if (email && otp) {
      const otpData = optStore[email];

      if (otpData && otpData.otp == otp && otpData.validTill >= Date.now()) {
        let token;

        if (otpData.type === "register") {
          const newUser = await otpData.user.save();
          token = jwt.sign({ user: newUser._id }, process.env.SECRET, {
            expiresIn: "1h",
          });
          return res
            .status(201)
            .send({ message: "Registration successfull", token });
        } else {
          const newUser = otpData.user;
          token = jwt.sign({ user: newUser._id }, process.env.SECRET, {
            expiresIn: "1h",
          });
          return res.status(200).send({ message: "Login successfull", token });
        }
      } else {
        return res.status(401).send({ message: "Invalid OTP" });
      }
    } else {
      return res.status(401).send({ message: "Invalid request" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Internal error", error: error.message });
  }
};
