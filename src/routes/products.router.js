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

export default productRouter;
