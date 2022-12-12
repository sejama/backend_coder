import { config } from '../config/index.js'
import { MongoDBService } from '../services/index.js'
import { CartsMongo, CartsFileSystem, CartsMemory } from './carts/index.js'
import { ProductsMongo, ProductsFileSystem, ProductsMemory } from './products/index.js'

const getSelectDao = () => {
    switch (config.SERVER.SELECTED_DATABASE) {
        case 'mongo': {
            MongoDBService.init()
            return {
                ProductDao: new ProductsMongo,
                CartDao: new CartsMongo,
                UserDao: new UsersMongo
            }
        }
        case 'fileSystem': {
            return {
                ProductDao: new ProductsFileSystem,
                CartDao: new CartsFileSystem,
                UserDao: new UsersMongo
            }
        }
        case 'memory': {
            return {
                ProductDao: new ProductsMemory,
                CartDao: new CartsMemory,
                //UserDao: new UsersMongo
            }
        }
    }
}

const { ProductDao, CartDao, UserDao } = getSelectDao()

export { ProductDao, CartDao, UserDao }