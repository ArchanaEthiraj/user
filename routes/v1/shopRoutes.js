const express = require('express')
const { shopValidate } = require('../../service/shopService')
const { createShop, updateShop, deleteShop, getAllShop, getByIdShop } = require('../../controller/shopController')
const { authenticating, checkShopOwner } = require('../../middleware/userAuthenticate')
const router = express.Router()


router.post('/create', authenticating, checkShopOwner, shopValidate, createShop)
router.put('/update/:id', authenticating, checkShopOwner, shopValidate, updateShop)
router.delete('/delete/:id', authenticating, checkShopOwner, deleteShop)
router.get('/list', authenticating, getAllShop)
router.get('/detail/:id', authenticating, getByIdShop)

module.exports = router