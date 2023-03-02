import { Router, json } from "express";
import { manager } from "../app.js";

const productRouter = Router();
productRouter.use(json());

productRouter.get("/", async (req, res) => {
  const { limit } = req.query;
  try {
    if (!limit) {
      const products = await manager.getProducts();
      res.send({ status: "succes", playload: products });
    } else {
      const products = await manager.getProducts();
      const limited = products.splice(0, limit);
      res.send({ status: "succes", playload: limited });
    }
  } catch (error) {
    res.status(404).send({ status: "error", error: `{$error}` });
  }
});

productRouter.get("/:pid", async (req, res)=>{
    try{
        const {pid} = req.params;
        const product = await manager.getProductById(parseInt(pid));
        res.send({status: "succes", payload: product});
    } catch(error) {
        res.status(404).send({status: "error", error: `${error}`});
    }
});

productRouter.post("/", async(req, res)=>{
    try{
        const {title, description, price, thumbail=[], code, stock, status=true, category} = req.body;
        await manager.addProduct(title, description, parseInt(price), thumbail, code, parseInt(stock), status, category);
        res.send({status: "succes", payload: req.body});
    }catch(error){
        res.status(404).send({status:"error", error: `${error}`});

    }
});

productRouter.put("/:pid", async (req, res)=>{
    try{
        const {pid} = req.params;
        const id = parseInt(pid);
        await manager.updateProduct(id, req.body);
    
        res.send({status: "succes", payload: await manager.getProductById(id)});
    }catch(error){
        res.status(404).send({status: "error", error: `${error}`});
    }
});

productRouter.delete("/:pid", async(req, res)=>{
    try{
        const {pid} = req.params;
        const id = parseInt(pid);
        await manager.deleteProduct(id);

        res.send({status: "succes", payload: "Producto eliminado"});
    } catch(error){
        res.status(404).send({status: "error", error: `${error}`});
    };
});

export default productRouter;
