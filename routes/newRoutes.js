const express = require('express');
const router = express.Router();

const imagesDataAccess = require("../data-access/dataAccessLayer")

router.get('/', async (req, res) => {
    const allImages = await imagesDataAccess.getAllImages()
    res.send(allImages)
})

module.exports = router;