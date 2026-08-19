const express = require("express");

const router = express.Router();

const {
   submitResult,
   getAllResults,
   getMyResults
  } = require("../controllers/resultController");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/submit",
  authMiddleware,
  submitResult
);


router.get(
  "/",
  authMiddleware,
  getAllResults
);


router.get(
  "/my-results",
  authMiddleware,
  getMyResults
);

module.exports = router;