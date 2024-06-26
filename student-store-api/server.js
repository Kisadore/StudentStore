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




// app.get("/products", (req, res) => {
//     const {name, category, sort} = req.query;
//     filteredProducts = products;

//     if(name){
//         filteredProducts = filteredProducts.filter(product => product.name === name)
//     }
//     if(category){
//         filteredProducts = filteredProducts.filter(product => product.category === category);
//     }
//     // Not entirely sure, need to look more into this part below
//     if (sort === 'price') {
//         filteredProducts.sort((a, b) => a.price - b.price);
//     } else if (sort === 'name') {
//         filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
//     }

//     res.json(filteredProducts);
// });

// app.get("/products/:productsId", (req, res) => {
//     const productId = parseInt(req.params.productsId);
//     const product = products.find(product => product.id === productId);

//     if(product){
//         res.json(product);
//     }
//     else{
//         res.status(404).json("Product Not Found");
//     }
// });

// app.post("/products", (req, res) => {
//     const { name, description, price, image_url, category } = req.body;
//     const newProduct = {
//         id: products.length + 1,
//         name, 
//         description,
//         price,
//         image_url,
//         catergory
//     }
//     res.push(newProduct);
//     res.status(202).json(newProduct);
// ;})

// app.put("/products/:productId", (req, res) => {
//     const {productId} = req.params;
//     const productIndex = products.findIndex(product => parseInt(productId) === products.id);

//     if(productIndex != 1){
//         const updatedProductInfo = req.body;
//         products[productIndex] = {...products[productIndex], ...updatedProductInfo};
//         res.json(product[productIndex]);
//     }
//     else{
//         res.status(404).json("Product Not found");
//     }
// });

// app.delete("/products/:productId", (req, res) => {
//     const {productId} = req.params;
//     const initialLength = products.length;
//     products = products.filter(products => products.id != parseInt(productId));

//     if(products.length < initialLength){
//         res.status(202).json()
//     }
//     else{
//         res.status(404).send("Product not found");
//     }
// });

// // ORDERS

// // order_id, 
// // customer_id, 
// // total_price, 
// // status,
// // created_at

// app.get("orders", (req, res) => {
//     res.json(orders);
// });

// app.get("/orders/:orderId", (req, res) => {
//     const orderId = parseInt(req.params.orderId);
//     const orders = orders.find(order => orderId === orders.id);

//     if(orders){
//         res.json(orders);
//     }
//     else{
//         res.status(404).json("Order Not Found");
//     }
// })

// app.post("/orders", (req, res) => {
//     const { customer_id, total_price, status, created_at} = req.body;
//     const newOrder = {
//         order_id: orders.length + 1,
//         customer_id, 
//         total_price,
//         status,
//         created_at,
//     }
//     res.push(newOrder);
//     res.status(202).json(newOrder);
// ;})

// app.put("/orders/:orderId", (req, res) => {
//     const {orderId} = req.params;
//     const orderIndex = orders.findIndex(order => parseInt(orderId) === orders.order_id);

//     if(orderIndex != 1){
//         const updatedOrderInfo = req.body;
//         orders[orderIndex] = {...orders[orderIndex], ...updatedOrderInfo};
//         res.json(orders[orderIndex]);
//     }
//     else{
//         res.status(404).json("Order Not found");
//     }
// });

// app.delete("orders/:orderId", (req, res) => {
//     const {orderId} = req.params;
//     const initialLength = orders.length;
//     orders = orders.filter(order => order.id != parseInt(orderId));

//     if(orders.length < initialLength){
//         res.status(202).json()
//     }
//     else{
//         res.status(404).send("Order not found");
//     }
// })
