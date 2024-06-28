const express = require("express");
const port = 3000;
const cors = require("cors");
const morgan = require("morgan");;

const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const orderitemRoutes = require("./routes/orderitemRoutes");



const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Testing StudentScore back-end");
})

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/orderitems", orderitemRoutes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}!`);
});



