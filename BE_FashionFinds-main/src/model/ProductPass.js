import mongoose from "mongoose";

const ProductPassSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
      minlength: 3,
    },
    product_price: {
      type: Number,
      min: 0,
    },
    product_images: {
        type: Object,
        require: true,
      },
    product_description: {
      type: String,
    },
    categoryId: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("ProductPass", ProductPassSchema);
