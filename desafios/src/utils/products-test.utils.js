const  faker = require("@faker-js/faker");
faker.locale = "es";

createFakeProducts = (qty) => {
    const listProducts = []
    for (let i = 0; i < qty; i++) {
        const product = {
            title: faker.commerce.productName(),
            price: faker.commerce.price(1, 1000, 0), 
            thumbnail: faker.image.abstract(72, 72), 
        }
        listProducts.push(product)
    }
    return listProducts
}

//export { createFakeProducts }
module.exports = createFakeProducts