import  express  from "express";
import ProductManager from "./ProductManager.js";
console.log(ProductManager);

const manager = new ProductManager();


const app = express();
