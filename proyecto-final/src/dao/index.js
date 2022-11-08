import { ContainerFilesystem } from "../containers/index.js";
//import { config } from "../config/index.js";

const PRODUCTS_FILENAME = "products"
const CARTS_FILENAME = "carts" //config.DATABASES.filesystem.CARTS_FILENAME

const ProductDao = new ContainerFilesystem(PRODUCTS_FILENAME);
const CartDao = new ContainerFilesystem(CARTS_FILENAME);

export { ProductDao, CartDao };