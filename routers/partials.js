import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";
import data from "../data.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";

const getRoot = (req, res) => {
  res.send("Server is running");
};

const getProducts = async (req, res) => {
  const Products = await Product.find({});
  if (!Products.length) {
    res.status(404).json({ message: "No products found please add some" });
    return;
  }
  res.status(200).json(Products);
};

const getProductsByID = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    res.status(404).send({ message: "Product Not Found" });
    return;
  }
  res.status(200).json(product);
};

const getInsertData = async (req, res) => {
  const createdProduct = await Product.insertMany(data.products);
  res.status(201).json(createdProduct);
};

//---------------------------------- POST METHODS ------------------------------//
const postSignin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne(email);

  if (!user) {
    res.status(401).json({ message: "No user found with that email" });
    return;
  }

  if (bcrypt.compareSync(password, user.password)) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
    return;
  }

  res.json({ message: "Password is incorrect" });
};

export { getRoot, getProducts, getProductsByID, getInsertData, postSignin };
