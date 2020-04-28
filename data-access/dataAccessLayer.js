const { MongoClient,ObjectId } = require('mongodb');
const uri = process.env.ATLAS_CONNECTION;

const getConnectedClient = async () => {
	const client = new MongoClient(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});
	return await client.connect();
};

const getImagesCollection = async (client) => {
	const collection = await client.db('Landscape').collection('ThornePG');
	return collection;
};
const getAllImages = async () => {
	const client = await getConnectedClient();

	try {
		const collection = await getImagesCollection(client);
		return await collection.find().toArray();
	} finally {
		client.close();
	}
};

const createImage = async (image) => {
	const client = await getConnectedClient();

	try {
		const collection = await getImagesCollection(client);
		await collection.insertOne(image);
	} finally {
		client.close();
	}
};

const updateImage = async (image) => {
	const client = await getConnectedClient();
	const { _id, ...imageToSave } = image;

	try {
		const collection = await getImagesCollection(client);
		await collection.updateOne(
			{ _id: ObjectId(_id) },
			{
				$set: imageToSave
			}
		);
	} finally {
		client.close();
	}
};

const deleteImage = async (imageId) => {
	const client = await getConnectedClient();

	try {
		const collection = await getImagesCollection(client);
		await collection.deleteOne({ _id: ObjectId(imageId) });
	} finally {
		client.close();
	}
};

module.exports = {
	getAllImages,
	createImage,
	updateImage,
	deleteImage
};
