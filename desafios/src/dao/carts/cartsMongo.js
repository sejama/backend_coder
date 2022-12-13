import { ContainerMongo } from "../../containers/index.js";
import { CartModel } from "../../models/index.js";

export class CartsMongo extends ContainerMongo {
  constructor() {
    super({
      name: CartModel.CartCollection,
      schema: CartModel.CartSchema,
    });
  }

  async getById(id) {
    return await this.model.findById(id).populate("products") 
  }
}