const express = require("express");
const connectMongoDb = require("./db");
const cors = require("cors");
const path = require("path")

const env = require('dotenv')
env.config()


connectMongoDb();
const app = express();
app.use(express.json());
app.use(cors());


//customer
app.use("/api/customer", require("./routes/customerRoutes"));
app.use("/api/uploads/customer", express.static("./uploads/customer"));
app.use("/api/uploads/customer/getImage", express.static("./uploads/admin"));

//admin
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/uploads/admin", express.static("./uploads/admin"));


//vercel
app.use(express.static(path.join(__dirname, "./client/build")))

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err)
      }
    }
  )
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
