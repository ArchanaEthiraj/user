const express = require('express')
const { shopValidate } = require('../service/shopService')
const { createShop, updateShop, deleteShop, getAllShop, getByIdShop } = require('../controller/shopController')
const { authenticating, checkShopOwner } = require('../middleware/userAuthenticate')
const router = express.Router()


router.post('/shop/create', authenticating, checkShopOwner, shopValidate, createShop)
router.put('/shop/update', authenticating, checkShopOwner, shopValidate, updateShop)
router.delete('/shop/delete', authenticating, checkShopOwner, deleteShop)
router.get('/shop/list', authenticating, getAllShop)
router.get('/shop/detail', authenticating, getByIdShop)

module.exports = router