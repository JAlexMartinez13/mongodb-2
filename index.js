const mongodb = require('mongodb');
const dotenv = require('dotenv');
const express = require('express');

dotenv.config();

const app = express();
app.use(express.json())

const client = new mongodb.MongoClient(process.env.MONGO_URL)

const connectClient = async () => { 
    await client.connect(); 
    console.log('Client Connected!') 
};
                                                                    
                                 
const getUserCollection = () => { 
    const db = client.db('alex-db');
    const col = db.collection('users');

    return col; 
};

const getProductCollection = () => { 
    const db = client.db('brians3-db');
    const col = db.collection('product');

    return col; 
};

const getOrderCollection = () => {
    const db = client.db('brians3-db');
    const col = db.collection('orders')

    return col;
}


const insertUser = async (user) => {  
    const col = getUserCollection();
    await col.insertOne({user})
    console.log('User Inserted!')
}

const insertProduct = async (product) => { 
    const col = getProductCollection();
    await col.insertOne({product})
    console.log('Product Inserted!')
}

const insertOrder = async (order) => {
    const col = getOrderCollection();
    await col.insertOne({order})
    console.log('Order Inserted!')
}

const getUsers = async () => { 
    const col =  getUserCollection(); 
    const users = await col.find({}).toArray();

    return users;
}
const getProducts = async () => { 
    const col =  getProductCollection(); 
    const products = await col.find({}).toArray();

    return products;
}
const getOrders = async () => { 
    const col =  getOrderCollection(); 
    const orders = await col.find({}).toArray();

    return orders;
}


app.get('/user', async (request, response) => {
    console.log("calling getUsers")
    const users = await getUsers() 
    
    response.send(users)
  })
app.get('/product', async (request, response) => {
    console.log("calling getProducts")
    const products = await getProducts() 
    
    response.send(products)
  })
app.get('/order', async (request, response) => {
    console.log("calling getOrders")
    const orders = await getOrders() 
    
    response.send(orders)
  })
  
  
app.post('/user', async (request,response) => {
    const user = request.body
    await insertUser(user)
    response.send("user created")
})
app.post('/product', async (request,response) => {
    const product = request.body
    await insertProduct(product)
    response.send("product created")
})
app.post('/order', async (request,response) => {
    const order = request.body
    await insertOrder(order)
    response.send("order created")
})

  
  app.listen(3000, () => {
    console.log('API listening on port 3000')
  })

  connectClient().then()