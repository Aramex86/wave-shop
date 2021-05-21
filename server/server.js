const express = require("express");
// const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//Models

const { User } = require("./models/user");
const { Brand } = require("./models/brand");
const { Wood } = require("./models/woods");
const { Product } = require("./models/product");

//Middlawares
const { auth } = require("./mideware/auth");
const { admin } = require("./mideware/admin");

///////////////////////////////////
//             PRODUCTS          //
//////////////////////////////////

//By ARRIVAL
// article/sortBy=createdAt&order=desc&limit=4

//By SELL
// article/sortBy=sold&order=desc&limit=4

app.get("/api/product/articles", (req, res) => {
  const order = req.query.order ? req.query.order : "asc";
  const sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  const limit = req.query.limit ? Number(req.query.limit) : 100;

  Product.find()
    .populate(["brand", "wood"])
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, articles) => {
      if (err) return res.status(400).send(err);
      res.send(articles);
    });
});


//Query String

app.get("/api/product/article_by_id", (req, res) => {
  const type = req.query.type;
  let items = req.query.id;

  if (type === "array") {
    const ids = items.split(",");
    items = [];
    items = ids.map((item) => {
      return mongoose.Types.ObjectId(item);
    });
  }

  Product.find({ _id: { $in: items } })
    .populate(["brand", "wood"])
    .exec((err, doc) => {
      return res.status(200).send(doc);
    });
});
///////////////////////////////////////////////
app.post("/api/product/article", auth, admin, (req, res) => {
  const product = new Product(req.body);

  product.save((err, doc) => {
    if (err) return res.json({ success: false, err });

    res.status(200).json({
      success: true,
      article: doc,
    });
  });
});

/////////////////////////////////
//             WOODS          //
////////////////////////////////

app.post("/api/product/wood", auth, admin, (req, res) => {
  const wood = new Wood(req.body);

  wood.save((err, doc) => {
    if (err) return res.json({ success: false, err });

    res.status(200).json({
      success: true,
      wood: doc,
    });
  });
});

app.get("/api/product/woods", (req, res) => {
  Wood.find({}, (err, woods) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(woods);
  });
});

/////////////////////////////////
//             BRAND          //
////////////////////////////////
app.post("/api/product/brand", auth, admin, (req, res) => {
  const brand = new Brand(req.body);

  brand.save((err, doc) => {
    if (err) return res.json({ success: false, err });

    res.status(200).json({
      success: true,
      brand: doc,
    });
  });
});

app.get("/api/product/brands", (req, res) => {
  Brand.find({}, (err, brands) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(brands);
  });
});
/////////////////////////////////
//             USERS          //
////////////////////////////////

//Routes

////Login

app.post("/api/users/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    //Check if user exist
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Auth fails, email not found",
      });
    //Compare passwords
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "Wrong password" });
    });

    //Logout

    app.get("/api/users/logout", auth, (req, res) => {
      User.findOneAndUpdate(
        { _id: req.user._id },
        { token: "" },
        (err, doc) => {
          if (err) return res.json({ success: false, err });

          return res.status(200).send({ success: true });
        }
      );
    });

    //Auth

    app.get("/api/users/auth", auth, (req, res) => {
      res.status(200).json({
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastName: req.user.lastName,
        role: req.user.role,
        cart: req.user.cart,
        history: req.user.history,
      });
    });

    ////Register Form

    app.post("/api/users/register", (req, res) => {
      const user = new User(req.body);

      user.save((err, doc) => {
        if (err) return res.json({ success: false, err });

        res.status(200).json({ success: true /* userData: doc */ });
      });
    });

    //Generate Token
    user.generateToken((err, user) => {
      if (err) return res.status(400).send(err);
      res.cookie("w_auth", user.token).status(200).json({
        loginSuccess: true,
      });
    });
  });
});

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Server is Running at ${port}`);
});
