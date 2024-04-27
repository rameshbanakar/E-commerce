const express = require("express");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const mongoose = require("mongoose");

//mongodb connection with db
const connect = mongoose.connect(
  "mongodb+srv://rameshsb:X7E7MLjR1isxBXiS@cluster0.94i8iri.mongodb.net/"
);
connect.then(() => console.log("db connected"));
connect.catch(() => console.log("somthing error"));

const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

//api creation
app.get("/", (req, res) => {
  res.send("hello world from express app");
});
//image storage
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({ storage: storage });

// creating endpoint for upload image
app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    status: "Success",
    img_url: `http://localhost:4000/images/${req.file.filename}`,
  });
});

const Product = mongoose.model("product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

app.post("/addproduct", async (req, res) => {
  const products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    id = last_product_array[0].id + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  await product.save();
  res.json({
    status: "Success",
    name: req.body.name,
  });
});

app.delete("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("removed success");
  res.json({
    status: "Sucess",
    name: req.body.name,
  });
});

app.get("/allproduct", async (req, res) => {
  const product = await Product.find();
  res.json({
    status: "Sucess",
    data: product,
  });
});
app.get("/newcolletions", async (req, res) => {
  const product = await Product.find();
  const newcollection=product.slice(1).slice(-8)
  res.json({
    status: "Sucess",
    data: newcollection,
  });
});

//schema creation for user model

const Users = mongoose.model("User", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});


app.post("/signup", async (req, res) => {
  console.log(req.body)
  try {
    let check = await Users.findOne({ email: req.body.email });

    if (check) {

      return res.json({
        success: false,
        error: "User already exists with the same email id",
      });
    }

    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }

    let user = new Users({
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
      cartData: cart,
    });

    await user.save();

    const data = { user: { id: user.id } };
    const token = jwt.sign(data, "ecom_secret");

    return res.json({ success: true, token: token });
  } catch (error) {

    console.error("Error during signup:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});
app.post("/login", async (req, res) => {
  try {
    let user = await Users.findOne({ email: req.body.email });
    if (!user) {
      return res.json({
        success: false,
        error: "user doesn't exist",
      });
    }
    
    let passComp = req.body.password.toString() === user.password;
    console.log(passComp);
    if (!passComp) {
      return res.json({
        success: false,
        error: "wrong credentials given",
      });
    }
    let data = {
      user: {
        id: user.id,
      },
    };
    let token = jwt.sign(data, "ecom_secret");
    return res.json({
      success: true,
      token: token,
    });
  } catch (error) {
    return res.send({
      success: false,
      error: error,
    });
  }
  
});
//creating middleware to fetch the user
const fetchUser=(req,res,next)=>{
  // console.log(req.headers["auth-token"]);
  const token = req.headers["auth-token"];
  if(!token){
    return res.status(401).send("please login before adding Item to cart")
  }else{
    try {
      const data = jwt.verify(token, "ecom_secret");
      req.user=data.user
      next()
    } catch (error) {
      return res.status(401).send({error:error})
    }
  }
}
app.post("/addtocart",fetchUser,async(req,res)=>{
   console.log(req.body,req.user.id)
   let userData=await Users.findOne({_id:req.user.id})
   userData.cartData[req.body.id]+=1
  //  await userData.save();
  await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
  return res.send(req.body)

})
app.get("/getcartItems", fetchUser, async (req, res) => {
  console.log(req.body, req.user.id);
  let userData = await Users.findOne({ _id: req.user.id });
  console.log(userData.cartData);
  return res.send(userData.cartData);
});
app.post("/removecartItem", fetchUser, async (req, res) => {
  console.log(req.body, req.user.id);
  let userData = await Users.findOne({ _id: req.user.id });
  if(userData.cartData[req.body.id]>0){
     userData.cartData[req.body.id] -= 1;
     //  await userData.save();
     await Users.findOneAndUpdate(
       { _id: req.user.id },
       { cartData: userData.cartData }
     );
     return res.send(req.body);
    
  }else{
    return res.send("Item not found in the cart")
  }
 
});
app.listen(4000, () => console.log("server has started@4000"));
