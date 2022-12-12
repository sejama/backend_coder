import { MongoDBContainer } from './../../containers.index.js'
import { userModel } from '../../models/index.js'

export class UsersMongo extends MongoDBContainer {
    constructor(){
        super({
            name: userModel.UserCollection,
            schema: userModel.UserSchema
        })
    }
}