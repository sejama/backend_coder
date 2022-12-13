import mongoose from 'mongoose'

const init = async () => {
    try {
        mongoose.connect(congig.DATABASES.mongo.url, {
            dbName:congig.DATABASES.mongo.dbName
        })
        console.log('Connection with MongoDB established')
    } catch (error) {
        console.log(error)        
    }
}

export const MongoDBService = { init }