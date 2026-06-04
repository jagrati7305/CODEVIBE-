// routes/api/authRoutes.js
const express = require("express");
const Router = express.Router();

const register = require("../../controller/Auth/register");
const login = require("../../controller/Auth/login");
const forgotPassword = require("../../controller/Auth/forgotPassword");
const resetPassword = require("../../controller/Auth/resetPassword");
const updateProfile = require("../../controller/Auth/updateProfile");
const verifyToken = require("../../middleware/authMiddleware");
const UserModel = require("../../models/user.models");

Router.post("/register", register);
Router.post("/login", login);
Router.post("/forgot-password", forgotPassword);
Router.post("/ForgotPassword", forgotPassword);
Router.post("/reset-password", resetPassword);
Router.put("/profile", verifyToken, updateProfile);

// Verify JWT and return current user info
Router.get("/me", verifyToken, async (req, res, next) => {
  try {
    const tokenEmail = (req.user?.email || req.user?.Email || "").trim().toLowerCase();
    if (!tokenEmail) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await UserModel.findOne({
      $or: [
        { email: tokenEmail },
        { Email: tokenEmail },
      ],
    }).select("username email Email college year bio avatarUrl joinedAt");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email || user.Email,
        college: user.college,
        year: user.year,
        bio: user.bio || "",
        avatarUrl: user.avatarUrl || "",
        joinedAt:
          user.joinedAt ||
          (user._id && typeof user._id.getTimestamp === "function"
            ? user._id.getTimestamp()
            : null),
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = Router;
