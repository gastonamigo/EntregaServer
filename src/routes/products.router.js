import { Router, json } from "express";
import { manager } from "../app.js";


const productRouter = Router();
productRouter.use(json());

productRouter.get("/products", async (req, res) => {

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

productRouter.get("/products/:id", async (req, res) =>{
    const productId = parseInt(req.params.id);
    const prodFinal = await manager.getProductById(productId);
    res.send(prodFinal);
});


export default productRouter;