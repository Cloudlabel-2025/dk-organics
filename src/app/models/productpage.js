import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, default: 0 },
    image: { type: String, required: true },
    category: { type: String, required: true },
    inStock: { type: Boolean, default: true },
    organic: { type: Boolean, default: true },
    benefits: [String],
    origin: String,
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);