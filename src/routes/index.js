const express = require('express')
const router = express.Router();

const v1apiroute = require('./v1/index');

router.use('/v1', v1apiroute);
router.delete('/v1', v1apiroute);
module.exports = router;