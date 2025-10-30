import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
    },
    status: { type: String, enum: ["pending", "completed", "failed"] },
    transactionId: String,
    paidAt: Date,
})

export const Payment = new mongoose.model("Payment", paymentSchema);