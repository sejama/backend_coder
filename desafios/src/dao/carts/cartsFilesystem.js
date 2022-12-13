import { ContainerFileSystem } from "../../containers/index.js";
import { config } from "../../config/index.js";

export class CartsFileSystem extends ContainerFileSystem {
  constructor() {
    super(config.DATABASES.filesystem.CARTS_FILENAME);
  }
}