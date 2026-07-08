const express = require("express");
const router = express.Router();

const { uploadPaymentProof } = require("../controllers/paymentController");
const { uploadPaymentProof: paymentUpload } = require("../middlewares/upload");

router.put(
  "/:booking_id",
  paymentUpload.single("payment_proof"),
  uploadPaymentProof,
);

module.exports = router;
