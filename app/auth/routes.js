const express = require("express");
const router = express.Router();
const {
  sendVerificationEmail,
  verificationCode,
  signUp,
  logIn,
} = require("./controllers");
const { validateSignUp } = require("../auth/middlewear");
const { upload } = require("./utils");

router.post("/api/auth/sendmail", sendVerificationEmail);
router.post("/api/auth/verifycode", verificationCode);
router.post(
  "/api/auth/signUp",
  upload.single("company_logo"),
  validateSignUp,
  signUp
);
router.post("/api/auth/login", logIn);

router.get("/api", (req, res) => {
  res.json({
    message: "Hello from backend",
  });
});

module.exports = router;
