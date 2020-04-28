const express = require('express');
const imagesDataAccess = require('../data-access/dataAccessLayer');
const router = express.Router();

router.get('/', async (req, res) => {
	const image = req.body;
	const allImages = await imagesDataAccess.getAllImages();
	console.log (allImages)
	res.send(allImages);
});

router.post('/', async (req, res) => {
	const image = req.body;
	await imagesDataAccess.createImage(image);
	res.send(image);
});

router.put('/', async (req, res) => {
	const image = req.body;
	await imagesDataAccess.updateImage(image);
	res.send(image);
});

router.delete('/:id', async (req, res) => {
	const imageId = req.params.id;
	await imagesDataAccess.deleteImage(imageId);
	res.send(imageId);
});

module.exports = router;
