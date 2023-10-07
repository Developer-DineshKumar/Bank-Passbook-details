const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

//schema
const schemaData = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    mobileNumber: Number,
    bankname: String,
    accountNumber: Number,
    address1: String,
    address2: String,
    city: String,
    state: String,
    zip: String,
    country: String,
  },
  {
    timestamps: true,
    strictQuery: true,
  }
);

const userModel = mongoose.model("user", schemaData);

//Read
app.get("/", async (req, res) => {
  const data = await userModel.find({});
  res.json({ success: true, data: data });
});

//create data
app.post("/create", async (req, res) => {
  console.log(req.body);
  const data = new userModel(req.body);
  await data.save();
  res.send({ success: true, message: "data save successfully", data: data });
});

//update data
app.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  console.log(req.body);
  const { _id, ...rest } = req.body;
  console.log(rest);

  const data = await userModel.updateOne({ _id: id }, rest);
  res.send({ success: true, message: "data update successfully", data: data });
});

//update data (this code is error related code )
// app.put("/update/:id", async (req, res) => {
//   const id = req.params.id;
//   const { _id, ...rest } = req.body;

//   try {
//     const data = await userModel.findByIdAndUpdate(id, rest);
//     if (!data) {
//       return res.status(404).json({ success: false, message: "Data not found" });
//     }

//     res.json({ success: true, message: "Data updated successfully", data: data });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

//Delete
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const data = await userModel.deleteOne({ _id: id });
  res.send({ success: true, message: "data delete successfully", data: data });
});

mongoose
  .connect("mongodb://127.0.0.1:27017/bank-passbooks")
  .then(() => {
    console.log("connected to mongodb");
    app.listen(PORT, () => console.log("server is running"));
  })
  .catch((err) => console.log(err));
