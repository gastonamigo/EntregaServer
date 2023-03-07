import express, { json } from "express";
import ProductManager from "./ProductManager.js";
import CartManager from "./CartManager.js";
import productRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import { engine } from "express-handlebars";



const manager = new ProductManager("./products.json");
const cartManager = new CartManager("./carrito.json")
const app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.get("/", async(req, res)=>{
    const product = await manager.getProducts();
    res.render("home", {layout: "main", product});
});

app.use(json());
app.use(express.static("./public"));
app.use("/api/products", productRouter);
app.use("/api/carts", cartsRouter);




app.listen(8080, () => {
    console.log("Server listening on port 8080");
});
export {manager,cartManager};