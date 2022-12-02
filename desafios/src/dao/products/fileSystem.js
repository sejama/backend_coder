//import { ContainerFilesystem } from "../../container/index.js";
const ContainerFilesystem = require("../../container/index.js")
//import { config } from "../../config/index.js";
const config = require('../../config/index.js')

//export class ProductFileSystem extends ContainerFilesystem {
class ProductFileSystem extends ContainerFilesystem {
    constructor(){
        super('products')
    }
}

module.exports = ProductFileSystem