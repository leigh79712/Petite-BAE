const Product = require("../models/products");
const mongoose = require("mongoose");
const { products, descriptors } = require("./seedhelper");

mongoose
  .connect("mongodb://localhost:27017/petit-bae")
  .then(() => {
    console.log("Connection open");
  })
  .catch((err) => {
    console.log("Oh no error!");
    console.log(err);
  });

const nameProducts = (arr) => arr[Math.floor(Math.random() * arr.length)];

const addData = async () => {
  await Product.deleteMany({});
  for (let i = 0; i <= 50; i++) {
    const price = Math.floor(Math.random() * 20 + 5);
    const newProduct = new Product({
      products: `${nameProducts(descriptors)} ${nameProducts(products)}`,
      price: price,
      size: ["_XS", "_S", "_M", "_L"],
      color: ["_Black", "_White"],
      images: [
        {
          url: "https://res.cloudinary.com/leigh79712/image/upload/v1639932928/ShoppingApp/zukrrfetxsjnrj1gst2v.webp",
          filename: "ShoppingApp/zukrrfetxsjnrj1gst2v",
        },
        {
          url: "https://res.cloudinary.com/leigh79712/image/upload/v1639932928/ShoppingApp/w7x27g5cyhc9nodiexrg.png",
          filename: "ShoppingApp/w7x27g5cyhc9nodiexrg",
        },
      ],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure fugiat odio dicta distinctio cumque quaerat consequuntur eveniet nulla soluta. Voluptate saepe quo nobis fugit rerum dolores eveniet expedita quae id?",
      category: ["New arrival", "In Stock"],
    });
    await newProduct.save();
  }
};

addData().then(() => {
  mongoose.connection.close();
});
