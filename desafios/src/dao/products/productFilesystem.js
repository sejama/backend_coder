import { ContainerFileSystem } from "../../containers/index.js";
import { config } from "../../config/index.js";

export class ProductsFileSystem extends ContainerFileSystem {
  constructor() {
    super(config.DATABASES.filesystem.PRODUCTS_FILENAME);
  }
}