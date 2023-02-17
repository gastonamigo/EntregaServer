import fs from "fs";

class ProductManager {
    #path = "";

    constructor(path) {
        this.#path = path;
    };

    //OBTENGO LA LISTA DE PRODUCTOS
    async getProducts() {
        try {
            const prod = await fs.promises.readFile(this.#path, "utf-8");
            return JSON.parse(prod);

        } catch (e) {
            return [];

        }

    }
    //FILTRA Y OBTIENE EL PRODUCTO POR ID
    async getProductById(prodId) {
        const product = await this.getProducts();
        let prod = product.find((p) => p.id === prodId);
        if (prod) {
            return prod;
        } else {
            throw new Error(`Product ID: ${prodId} Not Found`);
        };
    };
    // AGREGA EL PRODUCTO 
    async addProduct(title, description, price, thumbnail, code, stock) {

        const product = await this.getProducts();

        const newProduct = {
            id: product.length + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };
        //CHECKEANDO SI FALTA INFORMACION
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw new Error("missing information");
        };

        // CHECKEANDO QUE NO SE REPITA EL CODE       
        const checkCode = product.some((p) => p.code === code);

        if (checkCode) {
            throw new Error("product code already exist");
        } else {
            await fs.promises.writeFile(this.#path, JSON.stringify([...product, newProduct]));
        };
    };
    //ACTUALIZA EL PRODUCTO
    async updateProduct(id, update) {
        const product = await this.getProducts();
        let productUpdated = product.find(prod => prod.id === id);

        if (!productUpdated) {
            throw new Error("Product ID not found");//CHECKEA QUE EXISTA EL ID
        };

        if (Object.keys(update).includes('code')) {
            let checkCode = product.some(i => i.code === update.code);
            if (checkCode) {
                throw new Error("Product code modification not allowed");//CHECKEA SI SE ENVIA UN CODIGO PARA MODIFICAR
            };
        };

        productUpdated = { ...productUpdated, ...update };
        let newArray = product.filter(prod => prod.id !== id);

        newArray = [...newArray, productUpdated];

        await fs.promises.writeFile(this.#path, JSON.stringify(newArray));

        console.log('Updated Product');
    };

    //BORRA EL PRODUCTO POR ID   
    async deleteProduct(prodId) {
        const product = await this.getProducts();
        let productId = product.find((p) => p.id === prodId);
        if (!productId) {
            throw new Error(` product id: ${prodId} not found`);

        } else {
            let eraser = product.filter((p) => p.id !== prodId);
            await fs.promises.writeFile(this.#path, JSON.stringify(eraser));
        };
    };
};

export default ProductManager;



// async function main() {
    //   const manager = new ProductManager('../products.json');
//       console.log(await manager.getProducts()); // []
// await manager.addProduct("Ender 3 v2", "Impresora 3d v2", 155000, "../img/ender-3-V2-01.jpg", "E01", 15);
// await manager.addProduct("Ender 2 pro", "Impresora 3d pro", 145000, "../img/ender2pro1.png", "E02", 15);
// await manager.addProduct("Cr10 pro v2", "Impresora 3d cr10 V2", 195000, "../img/creality-cr-10-smart-pro-1.jpg", "E03", 15);
// await manager.addProduct("Cr5 pro", "Impresora 3d cr5 pro", 225000, "../img/cr5pro1.jpg", "E04", 15);
// await manager.addProduct("Photon mono x", "Impresora de resina Mono X 4K", 225000, "../img/MonoX.jpg", "E05", 15);
//       await manager.deleteProduct(1);
//       console.log(await manager.getProducts()); // []
//       console.log(await manager.getProductById(0));
//       console.log(await manager.getProductById(5));
// };
// main();