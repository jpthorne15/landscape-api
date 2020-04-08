const {MongoClient} = require('mongodb');
const uri = process.env.ATLAS_CONNECTION;

const getConnectedClient = async () => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    return await client.connect()
}

const getAllImages = async () => {
    const client = await getConnectedClient()

    const collection = await client.db("Landscape").collection("ThornePG");

    const data = await collection.find().toArray()

    await client.close();

    return data
}

