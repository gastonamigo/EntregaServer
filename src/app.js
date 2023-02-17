import express from "express";
import ProductManager from "./ProductManager.js";
console.log(ProductManager);

const manager = new ProductManager("../products.json");


const app = express();

app.get("/products", async (req, res) => {

    const { limit } = req.query;

    if (!limit) {
        const products = await manager.getProducts();
        res.send(products);
    } else {
        const products = await manager.getProducts();
        const limited = products.splice(0, limit);
        res.send(limited);
    };
});

app.get("/products/:id", async (req, res) =>{
    const productId = parseInt(req.params.id);
    const prodFinal = await manager.getProductById(productId);
    res.send(prodFinal);
});




app.listen(8080, () => {
    console.log("Server listening on port 8080");
});