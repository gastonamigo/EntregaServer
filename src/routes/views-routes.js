import { json, Router } from "express";
import { manager } from "../app.js";

const viewsRouter = Router();
viewsRouter.use(json());

viewsRouter.get("/", async(req, res)=>{
    const product = await manager.getProducts();
    res.render("home", {layout: "main", product});
});

viewsRouter.get("/real-time-products", async(req, res)=>{
    const product = await manager.getProducts();
    res.render("home", {layout: "main", product});
});            
 


export default viewsRouter
