import { ContainerMongo } from "../../containers/index.js";
import { ProductModel } from "../../models/index.js";

export class ProductsMongo extends ContainerMongo {
  constructor() {
    super({
      name: ProductModel.ProductsCollection,
      schema: ProductModel.ProductSchema,
    });
  }
}