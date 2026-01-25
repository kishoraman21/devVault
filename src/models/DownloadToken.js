import mongoose from "mongoose";

const DownloadTokenSchema = new mongoose.Schema(
  {
    token: { type: String, required: true, unique: true }, // RAW token
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    index: { type: Number, required: true },
    email: { type: String, required: true },

    usedCount: { type: Number, default: 0 },
    maxDownloads: { type: Number, default: 3 },

    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.DownloadToken ||
  mongoose.model("DownloadToken", DownloadTokenSchema);
